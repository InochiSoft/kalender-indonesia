import Islam from './core/Islam';
import { intVal } from './core/Helper';

const islam = new Islam();

export const ToHijri = (date: string): string => {
  const arrDate = date.split('-');
  if (arrDate.length > 2) {
    const year = intVal(arrDate[0]);
    const month = intVal(arrDate[1]);
    const day = intVal(arrDate[2]);
    return islam.MasehiToHijri(year, month, day);
  }
  return '';
};
