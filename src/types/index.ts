/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CalendarType = 'ETHIOPIAN' | 'GREGORIAN';

export type FiscalYearStatus = 'ACTIVE' | 'INACTIVE';

export interface FiscalYear {
  id: string;
  name: string;
  calendarType: CalendarType;
  startDate: string; // ISO Gregorian string (YYYY-MM-DD)
  endDate: string;   // ISO Gregorian string (YYYY-MM-DD)
  status: FiscalYearStatus;
  description?: string;
  
  // Ethiopian formatted fields for display (optional/metadata)
  startDateEth?: string; // e.g. "01 Hamle 2018"
  endDateEth?: string;   // e.g. "30 Sene 2019"
}

export interface FiscalYearFilters {
  search: string;
  status: FiscalYearStatus | 'ALL';
  calendarType: CalendarType | 'ALL';
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
}
