'use client';

import { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useHRStatsStore } from '@/shared/store/hrStatsStore';

import {
  fetchEmployees,
  deleteEmployee as apiDeleteEmployee,
} from '../api/hrApi';

import { useHRFilterStore } from '../store/hrFilterStore';
import { useHRSelectionStore } from '../store/selectionStore';

export function useHR() {
  const queryClient = useQueryClient();

  // LOCAL STATE
  const [search, setSearch] = useState('');

  // GLOBAL STATE
  const selectedDepartment = useHRFilterStore(s => s.selectedDepartment);

  const selectedIds = useHRSelectionStore(s => s.selectedIds);

  const setSelectedIds = useHRSelectionStore(s => s.setSelectedIds);

  const setEmployeesOnLeave = useHRStatsStore(s => s.setEmployeesOnLeave);

  // ── FETCH EMPLOYEES ─────────────────────────────
  const {
    data: employees = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const data = await fetchEmployees();

      // update global leave count
      const leaveCount = data.filter(e => e.onLeave).length;
      setEmployeesOnLeave(leaveCount);

      return data;
    },
  });

  // ── DELETE MUTATION ─────────────────────────────
  const deleteMutation = useMutation({
    mutationFn: apiDeleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['employees'],
      });
    },
  });

  // ── FILTERING ─────────────────────────────
  const filtered = employees
    .filter(emp => emp.name.toLowerCase().includes(search.toLowerCase()))
    .filter(emp =>
      selectedDepartment ? emp.department === selectedDepartment : true,
    );

  // ── BULK DELETE ─────────────────────────────
  const deleteSelected = async () => {
    await Promise.all(selectedIds.map(id => apiDeleteEmployee(id)));

    setSelectedIds([]);

    queryClient.invalidateQueries({
      queryKey: ['employees'],
    });
  };

  return {
    employees: filtered,

    isLoading,
    isError,

    search,
    setSearch,

    selectedIds,
    setSelectedIds,

    deleteEmployee: deleteMutation.mutate,
    deleteSelected,
  };
}
