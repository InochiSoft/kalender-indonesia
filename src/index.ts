import {intVal} from './core/Helper';
import Calendar from "./core/Calendar";
import {CalendarOptions} from "./opt";

let calendar = new Calendar();
export const Options = (opt: CalendarOptions) => {
  calendar = new Calendar(opt);
}

export const MasehiKeHijriyah = (date: string): string => {
  const arrDate = date.split('-');
  if (arrDate.length > 2) {
    const year = intVal(arrDate[0]);
    const month = intVal(arrDate[1]);
    const day = intVal(arrDate[2]);
    return calendar.MasehiKeHijriyah(year, month, day);
  }
  return '';
};

export const HijriyahKeMasehi = (date: string): string => {
  const arrDate = date.split('-');
  if (arrDate.length > 2) {
    const year = intVal(arrDate[0]);
    const month = intVal(arrDate[1]);
    const day = intVal(arrDate[2]);
    return calendar.HijriyahKeMasehi(year, month, day);
  }
  return '';
};

export const Imsakiyah = (date: string, shubuh: number = 20, thulu: number = 1, dhuha: number = 4.5, ihtiyat: number = 1, dhuhur: number = 4, ashar: number = 1, isya: number = 18, imsak: number = 10): any => {
  const arrDate = date.split('-');
  if (arrDate.length > 2) {
    const year = intVal(arrDate[0]);
    const month = intVal(arrDate[1]);
    const day = intVal(arrDate[2]);
    return calendar.Imsakiyah(year, month, day, shubuh, thulu, dhuha, ihtiyat, dhuhur, ashar, isya, imsak);
  }
  return {};
};

export const Waisak = (year: number): string => {
  return calendar.Waisak(year);
};

export const TahunBuddha = (year: number): number => {
  return calendar.TahunBuddha(year);
};

export const Nyepi = (year: number): string => {
  return calendar.Nyepi(year);
};

export const TahunWaisak = (year: number): number => {
  return calendar.TahunWaisak(year);
};

export const Imlek = (year: number): string => {
  return calendar.Imlek(year);
};

export const TahunImlek = (year: number): number => {
  return calendar.TahunImlek(year);
};

export const ShioImlek = (year: number): number => {
  return calendar.ShioImlek(year);
};

export const ElementImlek = (year: number): number => {
  return calendar.ElementImlek(year);
};

export const TahunBaru = (year: number): string => {
  return calendar.TahunBaru(year);
};

export const Kemerdekaan = (year: number): string => {
  return calendar.Kemerdekaan(year);
};

export const Buruh = (year: number): string => {
  return calendar.Buruh(year);
};

export const Pancasila = (year: number): string => {
  return calendar.Pancasila(year);
};

export const Paskah = (year: number): string => {
  return calendar.Paskah(year);
};

export const WafatIsa = (year: number): string => {
  return calendar.WafatIsa(year);
};

export const KenaikanIsa = (year: number): string => {
  return calendar.KenaikanIsa(year);
};

export const Natal = (year: number): string => {
  return calendar.Natal(year);
};

export const KalenderMasehi = (year: number, month: number, day: number): any => {
  return calendar.KalenderMasehi(year, month, day);
};

export const LiburMasehi = (year: number, month: number, day: number): any => {
  return calendar.LiburMasehi(year, month, day);
};

export const KalenderHijriyah = (year: number, month: number, day: number): any => {
  return calendar.KalenderHijriyah(year, month, day);
};
