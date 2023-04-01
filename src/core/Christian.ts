import { dateAdd, formatReadDate, mod } from './Helper';
class Christian {
  private static _calcGlobal(year: number) {
    const intA = mod(year, 19);
    const intB = mod(year, 4);
    const intC = mod(year, 7);

    const intH = year >= 1900 && year <= 2099 ? 5 : 0;
    const intI = year >= 2100 && year <= 2199 ? 6 : 0;
    const intJ = year >= 2200 && year <= 2299 ? 0 : 0;
    const intK = intH + intI + intJ;
    const intL = year >= 1900 && year <= 2099 ? 24 : 0;
    const intM = year >= 2100 && year <= 2199 ? 24 : 0;
    const intN = year >= 2200 && year <= 2299 ? 25 : 0;
    const intO = intL + intM + intN;

    const intD = mod(19 * intA + intO, 30);
    const intE = mod(2 * intB + 4 * intC + 6 * intD + intK, 7);
    const intF = intD + intE < 10 ? 3 : 4;
    const intG = intD + intE < 10 ? intD + intE + 22 : intD + intE - 9;

    return {
      month: intF,
      day: intG,
    };
  }
  public Paskah(year: number) {
    const calc = Christian._calcGlobal(year);
    return formatReadDate(year, calc.month, calc.day);
  }
  public Kenaikan(year: number) {
    const calc = Christian._calcGlobal(year);
    return dateAdd('d', 39, year, calc.month, calc.day);
  }
  public Wafat(year: number) {
    const calc = Christian._calcGlobal(year);
    return dateAdd('d', -2, year, calc.month, calc.day);
  }
  public Maundy(year: number) {
    const calc = Christian._calcGlobal(year);
    return dateAdd('d', -3, year, calc.month, calc.day);
  }
  public Holly(year: number) {
    const calc = Christian._calcGlobal(year);
    return dateAdd('d', -1, year, calc.month, calc.day);
  }
  public Natal(year: number) {
    return formatReadDate(year, 12, 25);
  }
}
export default Christian;
