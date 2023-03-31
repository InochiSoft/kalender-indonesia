import { intVal } from './core/Helper';
import Islam from './core/Islam';
import Buddha from "./core/Buddha";
import Hindu from "./core/Hindu";
import China from "./core/China";

const islam = new Islam();
const buddha = new Buddha();
const hindu = new Hindu();
const china = new China();

export const MasehiKeHijriyah = (date: string): string => {
  const arrDate = date.split('-');
  if (arrDate.length > 2) {
    const year = intVal(arrDate[0]);
    const month = intVal(arrDate[1]);
    const day = intVal(arrDate[2]);
    return islam.MasehiToHijri(year, month, day);
  }
  return '';
};

export const HijriyahKeMasehi = (date: string): string => {
  const arrDate = date.split('-');
  if (arrDate.length > 2) {
    const year = intVal(arrDate[0]);
    const month = intVal(arrDate[1]);
    const day = intVal(arrDate[2]);
    return islam.HijriToMasehi(year, month, day);
  }
  return '';
};

export const Imsakiyah = (
  date: string,
  latitude: number = -6.9128,
  longitude = 107.6206,
  timezone: number = 7,
  tinggi: number = 10,
  shubuh: number = 20,
  thulu: number = 1,
  dhuha: number = 4.5,
  ihtiyat: number = 1,
  dhuhur: number = 4,
  ashar: number = 1,
  isya: number = 18,
  imsak: number = 10,
): any => {
  const arrDate = date.split('-');
  if (arrDate.length > 2) {
    const year = intVal(arrDate[0]);
    const month = intVal(arrDate[1]);
    const day = intVal(arrDate[2]);
    return islam.Imsakiyah(
      year,
      month,
      day,
      latitude,
      longitude,
      timezone,
      tinggi,
      shubuh,
      thulu,
      dhuha,
      ihtiyat,
      dhuhur,
      ashar,
      isya,
      imsak,
    );
  }
  return '';
};

export const Waisak = (year: number): string => {
  return buddha.Waisak(year);
};

export const TahunBuddha = (year: number): number => {
  return buddha.Tahun(year);
};

export const Nyepi = (year: number): string => {
  return hindu.Nyepi(year);
};

export const TahunWaisak = (year: number): number => {
  return hindu.Tahun(year);
};

export const Imlek = (year: number): string => {
  return china.Imlek(year);
};

export const TahunImlek = (year: number): number => {
  return china.Tahun(year);
};

export const ShioImlek = (year: number): number => {
  return china.Shio(year);
};

export const ElementImlek = (year: number): number => {
  return china.Elemen(year);
};
