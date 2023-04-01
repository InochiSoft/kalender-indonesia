export enum CalendarType {
  MASEHI,
  HIJRIYAH,
  JAWA,
  CANDRA,
  SURYA,
}

export enum HolidayType {
  ORIGINAL,
  ADDITIONAL,
  CORRECTION
}

export interface Holiday {
  date: string;
  name?: string;
  type?: HolidayType;
  description?: string;
}

export interface Include {
  calendarTypes?: CalendarType[];
  showHoliday?: boolean;
  showLeave?: boolean;
  showImsakiyah?: boolean;
  addHolidays?: Holiday[];
  addLeaves?: Holiday[];
  remHolidays?: Holiday[];
  remLeaves?: Holiday[];
}

export interface CalendarOptions {
  timezone?: number;
  latitude?: number;
  longitude?: number;
  altitude?: number;
  weeklyFormat?: boolean;
  include?: Include;
}

export interface HisabResult {
  index: number;
  last_hijri_year: number;
  last_hijri_month: number;
  add_month: number;
  hijri_year: number;
  hijri_month: number;
  hijri_day: number;
  hijri_date: string;
  masehi_year: number;
  masehi_month: number;
  masehi_day: number;
  masehi_date: string;
  days_count: number;
}

export interface ImsakiyahResult {
  date: string;
  imsak: string;
  shubuh: string;
  syuruq: string;
  dhuha: string;
  dhuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

export const DefaultCalendarOption: CalendarOptions = {
  timezone: 7,
  latitude: -6.9128,
  longitude: 107.6206,
  altitude: 10,
  weeklyFormat: true,
  include: {
    calendarTypes: [
      CalendarType.MASEHI,
      CalendarType.HIJRIYAH,
    ],
    addHolidays: [],
    addLeaves: [],
    remHolidays: [],
    remLeaves: [],
    showHoliday: true,
    showLeave: true,
    showImsakiyah: false
  }
}
