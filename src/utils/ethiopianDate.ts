/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EtDatetime } from 'abushakir';

export const ETHIOPIAN_MONTHS = [
  { id: 1, name: 'Meskerem', geez: 'መስከረም' },
  { id: 2, name: 'Tikimt', geez: 'ጥቅምት' },
  { id: 3, name: 'Hidar', geez: 'ኅዳር' },
  { id: 4, name: 'Tahsas', geez: 'ታኅሣሥ' },
  { id: 5, name: 'Tir', geez: 'ጥር' },
  { id: 6, name: 'Yakatit', geez: 'የካቲት' },
  { id: 7, name: 'Megabit', geez: 'መጋቢት' },
  { id: 8, name: 'Miyazia', geez: 'ሚያዝያ' },
  { id: 9, name: 'Ginbot', geez: 'ግንቦት' },
  { id: 10, name: 'Sene', geez: 'ሰኔ' },
  { id: 11, name: 'Hamle', geez: 'ሐምሌ' },
  { id: 12, name: 'Nehase', geez: 'ነሐሴ' },
  { id: 13, name: 'Pagume', geez: 'ጷጉሜን' },
];

/**
 * Convert a Gregorian Date (or string/timestamp) to Ethiopian calendar values.
 */
export function convertGregorianToEthiopian(dateInput: Date | string | number) {
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid Gregorian date');
    }
    
    // Create EtDatetime from Gregorian epoch millisecond
    const etDate = new EtDatetime(date.getTime());
    
    const monthObj = ETHIOPIAN_MONTHS.find(m => m.id === etDate.month);
    const monthName = monthObj ? monthObj.name : '';
    const monthGeez = monthObj ? monthObj.geez : '';
    
    // Formatting as DD MonthName YYYY
    const formatted = `${String(etDate.day).padStart(2, '0')} ${monthName} ${etDate.year}`;
    const formattedGeez = `${monthGeez} ${etDate.day}, ${etDate.year}`;

    return {
      year: etDate.year,
      month: etDate.month,
      day: etDate.day,
      monthName,
      monthGeez,
      formatted,
      formattedGeez,
    };
  } catch (error) {
    console.error('Error converting Gregorian to Ethiopian:', error);
    return {
      year: 2000,
      month: 1,
      day: 1,
      monthName: 'Meskerem',
      monthGeez: 'መስከረም',
      formatted: '01 Meskerem 2000',
      formattedGeez: 'መስከረም 1, 2000',
    };
  }
}

/**
 * Convert Ethiopian calendar values (Year, Month, Day) to a standard Gregorian Date.
 */
export function convertEthiopianToGregorian(year: number, month: number, day: number): Date {
  try {
    // We MUST pass hour, minute, second, millisecond as 0 to avoid NaNs in JS port of abushakir
    const etDate = new EtDatetime(year, month, day, 0, 0, 0, 0);
    const ts = etDate.getTime();
    if (isNaN(ts)) {
      throw new Error('Abushakir returned invalid timestamp');
    }
    return new Date(ts);
  } catch (error) {
    console.error('Error converting Ethiopian to Gregorian:', error);
    return new Date();
  }
}

/**
 * Validates whether the given Ethiopian date is valid.
 */
export function isValidEthiopianDate(year: number, month: number, day: number): { isValid: boolean; message?: string } {
  if (isNaN(year) || year < 1000 || year > 3000) {
    return { isValid: false, message: 'Year must be between 1000 and 3000' };
  }
  if (isNaN(month) || month < 1 || month > 13) {
    return { isValid: false, message: 'Month must be between 1 and 13' };
  }
  if (isNaN(day) || day < 1) {
    return { isValid: false, message: 'Day must be at least 1' };
  }

  // Months 1-12 have exactly 30 days
  if (month >= 1 && month <= 12) {
    if (day > 30) {
      return { isValid: false, message: `${ETHIOPIAN_MONTHS[month - 1].name} has exactly 30 days` };
    }
  }

  // Month 13 (Pagume) validation
  if (month === 13) {
    // Check leap year in Ethiopian calendar
    // In Ethiopian calendar, leap year is when (year + 1) % 4 === 0 (or year % 4 === 3)
    const isLeap = (year % 4 === 3);
    const maxPagumeDays = isLeap ? 6 : 5;
    if (day > maxPagumeDays) {
      return { 
        isValid: false, 
        message: `Pagume in year ${year} has exactly ${maxPagumeDays} days (Leap Year: ${isLeap ? 'Yes' : 'No'})` 
      };
    }
  }

  return { isValid: true };
}

/**
 * Generate default suggested Fiscal Year dates according to Ethiopian accounting standards.
 * Start Date: Hamle 1 of the current Ethiopian year.
 * End Date: Sene 30 of the next Ethiopian year.
 */
export function getEthiopianFiscalYearSuggestions(currentEthYear?: number) {
  let targetYear = currentEthYear;
  if (!targetYear) {
    const todayEth = convertGregorianToEthiopian(new Date());
    targetYear = todayEth.year;
  }

  const startYear = targetYear;
  const endYear = targetYear + 1;

  const startGreg = convertEthiopianToGregorian(startYear, 11, 1); // Hamle 1
  const endGreg = convertEthiopianToGregorian(endYear, 10, 30);  // Sene 30

  return {
    suggestedName: `EFY ${startYear}/${endYear}`,
    start: {
      eth: { year: startYear, month: 11, day: 1, formatted: `01 Hamle ${startYear}` },
      gregISO: startGreg.toISOString().split('T')[0],
    },
    end: {
      eth: { year: endYear, month: 10, day: 30, formatted: `30 Sene ${endYear}` },
      gregISO: endGreg.toISOString().split('T')[0],
    },
  };
}

/**
 * Formats a Gregorian date string as YYYY-MM-DD to a beautiful Gregorian display string.
 */
export function formatGregorianDisplay(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}
