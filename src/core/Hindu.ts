import {dateAdd, formatReadDate, intVal, mod} from './Helper';

class Hindu {
  constructor() {}
  public Nyepi(year: number) {
    const cTanggal = 28;
    const cBulan = 3;
    const TA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    TA[1] = 0;
    TA[2] = 30;
    TA[3] = 60;
    TA[4] = 89;
    TA[5] = 119;
    TA[6] = 148;
    TA[7] = 178;
    TA[8] = 207;
    TA[9] = 237;
    TA[10] = 266;
    TA[11] = 296;
    TA[12] = 325;
    TA[13] = 355;
    TA[14] = 384;
    TA[15] = 414;
    TA[16] = 443;
    TA[17] = 473;
    TA[18] = 502;
    TA[19] = 532;
    TA[20] = 562;
    TA[21] = 591;
    TA[22] = 621;
    TA[23] = 650;
    TA[24] = 680;
    TA[25] = 709;
    TA[26] = 739;
    TA[27] = 768;
    TA[28] = 798;
    TA[29] = 827;
    TA[30] = 857;
    TA[31] = 886;
    TA[32] = 916;
    TA[33] = 945;

    let intBulan: number;
    let intTahun: number;

    if (cBulan < 3) {
      intBulan = cBulan + 12;
    } else {
      intBulan = cBulan;
    }

    if (intBulan < 3) {
      intTahun = year - 1;
    } else {
      intTahun = year;
    }

    let newYear = intTahun;
    let addYear = 0;
    let addMultiply = 0;

    if (intTahun >= 2038) {
      addMultiply = intVal((intTahun - 1982) / 56);
      addYear = addMultiply * 56;
      newYear = intTahun - addYear;
    }

    let intAM1 = intVal(365.25 * intTahun) + intVal(30.60001 * (intBulan + 1)) + cTanggal - 428;
    let intKoreksiGr: number;

    if (intAM1 < 577748) {
      intKoreksiGr = 0;
    } else {
      intKoreksiGr = 2 - intVal(intTahun / 100) + intVal(intVal(intTahun / 100) / 4);
    }

    let intH = intVal(365.25 * intTahun) + intVal(30.60001 * (intBulan + 1)) + cTanggal + intKoreksiGr - 428;

    let intN = mod(intH, 945);
    let intI: number;

    if (intN < 351) {
      intI = (intN + 945) - 351;
    } else {
      intI = intN - 351;
    }

    let Ya = 0;
    let Yb = 0;

    for (let x = 1; x <= 33; x++) {
      if (TA[x] >= intI) {
        Ya = TA[x];
        Yb = TA[x - 1];
        break;
      }
    }

    let datA1 = new Date(newYear, 2, 31);
    let datA2 = new Date(newYear, 2, 2);

    let Ma = Ya - intI + 1;
    let Mb = intI - Yb - 1;
    let MbMin = Mb + 1;
    let datMa = dateAdd('d', Ma - 1, newYear, intBulan, cTanggal);
    let datMb = dateAdd('d', -MbMin, newYear, intBulan, cTanggal);

    let pdatMa1 = datMa.split('-');
    let datMa1 = new Date(intVal(pdatMa1[0]), intVal(pdatMa1[1]) - 1, intVal(pdatMa1[2]));

    let pdatMb1 = datMb.split('-');
    let datMb1 = new Date(intVal(pdatMb1[0]), intVal(pdatMb1[1]) - 1, intVal(pdatMb1[2]));

    let lngMa = (datMa1.getTime() >= datA1.getTime()) ? 0 : datMa1.getTime();
    let lngMb = (datMb1.getTime() >= datA2.getTime()) ? datMb1.getTime() : 0;

    let intResult = lngMa + lngMb;
    let datResult = new Date(intResult);

    let datNyepi = formatReadDate(datResult.getFullYear(), datResult.getMonth() + 1, datResult.getDate());
    let arrNyepi = datNyepi.split('-');

    if (intVal(arrNyepi[1]) == 1) {
      intResult = datMa1.getTime();
    }

    if (intVal(arrNyepi[1]) == 3) {
      switch (intVal(arrNyepi[2])) {
        case 2:
          intResult = datMa1.getTime();
          break;
        case 6:
          intResult = datMa1.getTime();
          break;
      }
    }
    datResult = new Date(intResult);
    datNyepi = formatReadDate(datResult.getFullYear(), datResult.getMonth() + 1, datResult.getDate());
    let arrDate = datNyepi.split('-');
    // saka = iTahun - 78
    return formatReadDate(year, intVal(arrDate[1]), intVal(arrDate[2]));
  }
  public Tahun(year: number) {
    return year - 78;
  }
}

export default Hindu;
