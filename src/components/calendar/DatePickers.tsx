/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, HelpCircle } from 'lucide-react';
import { 
  ETHIOPIAN_MONTHS, 
  convertEthiopianToGregorian, 
  convertGregorianToEthiopian, 
  isValidEthiopianDate, 
  formatGregorianDisplay 
} from '../../utils/ethiopianDate';

// -------------------------------------------------------------
// ETHIOPIAN DATE PICKER COMPONENT
// -------------------------------------------------------------
interface EthDatePickerProps {
  label: string;
  value: string; // YYYY-MM-DD (Gregorian ISO format under-the-hood)
  onChange: (gregorianISO: string) => void;
  error?: string;
}

export const EthDatePicker: React.FC<EthDatePickerProps> = ({
  label,
  value,
  onChange,
  error,
}) => {
  // Translate incoming Gregorian date to Ethiopian representation
  const initialEth = value ? convertGregorianToEthiopian(value) : convertGregorianToEthiopian(new Date());

  const [ethYear, setEthYear] = useState<number>(initialEth.year);
  const [ethMonth, setEthMonth] = useState<number>(initialEth.month);
  const [ethDay, setEthDay] = useState<number>(initialEth.day);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Years option range (e.g., current year +/- 10 years)
  const currentEthYear = convertGregorianToEthiopian(new Date()).year;
  const yearsRange = Array.from({ length: 21 }, (_, i) => currentEthYear - 10 + i);

  // Dynamically calculate days range based on selected month & year
  const isLeap = ethYear % 4 === 3;
  const daysInMonth = ethMonth === 13 ? (isLeap ? 6 : 5) : 30;
  const daysRange = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Sync state with incoming value changes
  useEffect(() => {
    if (value) {
      const parsed = convertGregorianToEthiopian(value);
      setEthYear(parsed.year);
      setEthMonth(parsed.month);
      setEthDay(Math.min(parsed.day, parsed.month === 13 ? (parsed.year % 4 === 3 ? 6 : 5) : 30));
    }
  }, [value]);

  // Handle changes and bubble up the converted Gregorian ISO string
  const handleDatePartChange = (year: number, month: number, day: number) => {
    // Validate first
    const checkedDay = Math.min(day, month === 13 ? (year % 4 === 3 ? 6 : 5) : 30);
    const check = isValidEthiopianDate(year, month, checkedDay);
    
    if (check.isValid) {
      setValidationError(null);
      setEthYear(year);
      setEthMonth(month);
      setEthDay(checkedDay);
      
      const gregDate = convertEthiopianToGregorian(year, month, checkedDay);
      const isoStr = gregDate.toISOString().split('T')[0];
      onChange(isoStr);
    } else {
      setValidationError(check.message || 'Invalid Date');
    }
  };

  // Convert current state to Gregorian representation for real-time transparency
  const correspondingGreg = convertEthiopianToGregorian(ethYear, ethMonth, ethDay);
  const gregFormatted = formatGregorianDisplay(correspondingGreg.toISOString().split('T')[0]);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1">
        <Calendar className="w-3.5 h-3.5 text-slate-500" />
        {label} <span className="text-red-500">*</span>
      </label>

      {/* Date fields row */}
      <div className="grid grid-cols-3 gap-2">
        {/* Day Select */}
        <div>
          <select
            value={ethDay}
            onChange={(e) => handleDatePartChange(ethYear, ethMonth, parseInt(e.target.value))}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 cursor-pointer shadow-sm transition-all font-medium"
          >
            {daysRange.map((d) => (
              <option key={d} value={d}>
                Day {d}
              </option>
            ))}
          </select>
        </div>

        {/* Month Select */}
        <div>
          <select
            value={ethMonth}
            onChange={(e) => handleDatePartChange(ethYear, parseInt(e.target.value), ethDay)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2 py-2.5 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 cursor-pointer shadow-sm transition-all font-medium"
          >
            {ETHIOPIAN_MONTHS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.id} - {m.name} ({m.geez})
              </option>
            ))}
          </select>
        </div>

        {/* Year Select */}
        <div>
          <select
            value={ethYear}
            onChange={(e) => handleDatePartChange(parseInt(e.target.value), ethMonth, ethDay)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 cursor-pointer shadow-sm transition-all font-medium"
          >
            {yearsRange.map((y) => (
              <option key={y} value={y}>
                Year {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dual calendar transparency text */}
      <div className="flex justify-between items-center px-1 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
        <span>Gregorian counterpart:</span>
        <span className="font-semibold text-sky-600 dark:text-sky-400">{gregFormatted}</span>
      </div>

      {/* Error messages */}
      {(error || validationError) && (
        <span className="text-[11px] font-semibold text-red-600 dark:text-red-400 mt-0.5">
          {error || validationError}
        </span>
      )}
    </div>
  );
};


// -------------------------------------------------------------
// GREGORIAN DATE PICKER COMPONENT
// -------------------------------------------------------------
interface GregorianDatePickerProps {
  label: string;
  value: string; // YYYY-MM-DD
  onChange: (dateStr: string) => void;
  error?: string;
}

export const GregorianDatePicker: React.FC<GregorianDatePickerProps> = ({
  label,
  value,
  onChange,
  error,
}) => {
  // Convert current value to Ethiopian for dual-calendar feedback
  const ethCounterpart = value ? convertGregorianToEthiopian(value) : null;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1">
        <Calendar className="w-3.5 h-3.5 text-slate-500" />
        {label} <span className="text-red-500">*</span>
      </label>

      {/* Date input */}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-sm transition-all font-medium"
      />

      {/* Dual calendar transparency text */}
      {ethCounterpart && (
        <div className="flex justify-between items-center px-1 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
          <span>Ethiopian counterpart:</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            {ethCounterpart.formatted} ({ethCounterpart.monthGeez})
          </span>
        </div>
      )}

      {error && (
        <span className="text-[11px] font-semibold text-red-600 dark:text-red-400 mt-0.5">
          {error}
        </span>
      )}
    </div>
  );
};
