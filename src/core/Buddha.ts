import {dateAdd, formatReadDate, intVal, mod, trunc} from './Helper';

class Buddha {
  public Waisak(year: number) {
    const PI = 3.141592654;
    let newYear = year;
    /*
    if (year >= 2038) {
      const addMultiply = intVal((year - 1982) / 56);
      const addYear = addMultiply * 56;
      newYear = year - addYear;
    }
    */
    const intIJST1: number = 0;
    const intTanggal1 = 5;
    const intBulan1 = 5;
    const intArrTahun1 = year;

    const datFull1 = new Date(newYear, intBulan1 - 1, intTanggal1);

    const intTa11 = intArrTahun1 % 4 === 0 ? 1 : 0;
    const intTa21 = intArrTahun1 % 100 === 0 ? 1 : 0;
    const intTa31 = intTa11 + intTa21;

    const dblKB1 = intTa31 > 0 ? 1 : 2;

    const dblK11 = trunc((275 * intBulan1) / 9);
    const dblK21 = trunc((intBulan1 + 9) / 12) * dblKB1;
    const dblK31 = dblK11 - dblK21 + intTanggal1 - 30;
    const dblK41 = dblK31 / 365.25 + (intArrTahun1 - 1900);
    const dblK51 = dblK41 * 12.3685;
    const dblK61 = dblK51 - trunc(dblK51);
    const dblK71: number = dblK61 > 0.5 ? trunc(dblK51 + 1) : trunc(dblK51);

    const dblKN1: number = intIJST1 === 1 ? dblK71 : dblK71 - 0.5;
    const dblT1 = dblKN1 / 1236.85;

    const dblM11 = 29.10535608 * dblKN1;
    const dblM21 = -0.000033 * dblT1 * dblT1;
    const dblM31 = -0.00000347 * dblT1 * dblT1 * dblT1;
    const dblM1 = mod(359.2242 + dblM11 + dblM21 + dblM31, 360);

    const dblMA11 = 385.81691806 * dblKN1;
    const dblMA21 = 0.0107306 * dblT1 * dblT1;
    const dblMA31 = 0.00001236 * dblT1 * dblT1 * dblT1;
    const dblMA1 = mod(306.0253 + dblMA11 + dblMA21 + dblMA31, 360);

    const dblF11 = 390.67050646 * dblKN1;
    const dblF21 = -0.0016528 * dblT1 * dblT1;
    const dblF31 = -0.00000239 * dblT1 * dblT1 * dblT1;
    const dblF1 = mod(21.2964 + dblF11 + dblF21 + dblF31, 360);

    const dblKRA11 = 0.1734 - 0.000393 * dblT1;
    const dblKRA21 = dblKRA11 * Math.sin((dblM1 * PI) / 180);
    const dblKRA31 = -0.4068 * Math.sin((dblMA1 * PI) / 180);
    const dblKRA41 = 0.0021 * Math.sin((2 * dblM1 * PI) / 180);
    const dblKRA51 = 0.0161 * Math.sin((2 * dblMA1 * PI) / 180);
    const dblKRA61 = -0.0004 * Math.sin((3 * dblMA1 * PI) / 180);
    const dblKORA1 = dblKRA21 + dblKRA31 + dblKRA41 + dblKRA51 + dblKRA61;

    const dblKRB11 = -0.0051 * Math.sin(((dblM1 + dblMA1) * PI) / 180);
    const dblKRB21 = -0.0074 * Math.sin(((dblM1 - dblMA1) * PI) / 180);
    const dblKRB31 = 0.0004 * Math.sin(((2 * dblF1 + dblM1) * PI) / 180);
    const dblKRB41 = -0.0004 * Math.sin(((2 * dblF1 - dblM1) * PI) / 180);
    const dblKRB51 = 0.0104 * Math.sin((2 * dblF1 * PI) / 180);
    const dblKORB1 = dblKRB11 + dblKRB21 + dblKRB31 + dblKRB41 + dblKRB51;

    const dblKC11 = -0.0006 * Math.sin(((2 * dblF1 + dblMA1) * PI) / 180);
    const dblKC21 = 0.001 * Math.sin(((2 * dblF1 - dblMA1) * PI) / 180);
    const dblKC31 = 0.0005 * Math.sin(((dblM1 + 2 * dblMA1) * PI) / 180);
    const dblKORC1 = dblKC11 + dblKC21 + dblKC31;

    const dblKoreksi1 = dblKORA1 + dblKORB1 + dblKORC1;

    const dblJdA11 = 29.53058868 * dblKN1;
    const dblJdA21 = 0.0001178 * dblT1 * dblT1 * dblT1;
    const dblJdA31 = -0.000000155 * dblT1 * dblT1 * dblT1;

    const dblJdB11 = 132.87 * dblT1;
    const dblJdB21 = 0.009173 * dblT1 * dblT1;
    const dblJdB31 = 166.56 + dblJdB11 - dblJdB21;

    const dblJdC11 = 0.00033 * Math.sin((dblJdB31 * PI) / 180);
    const dblJdC21 = dblJdA11 + dblJdA21 + dblJdA31 + dblJdC11;
    const dblJdC31 = 2415020.75933 + dblJdC21;
    const dblJD1 = dblJdC31 + 0.5 + dblKoreksi1;

    const dblZJd1 = trunc(dblJD1);
    const dblEFJd1 = dblJD1 - dblZJd1;
    const dblAPJd1 = trunc((dblZJd1 - 1867216.25) / 36524.25);
    const dblAJd1 = dblZJd1 < 2299161 ? dblZJd1 : dblZJd1 + 1 + dblAPJd1 - trunc(dblAPJd1 / 4);
    const dblBJd1 = dblAJd1 + 1524;
    const dblCJd1 = trunc((dblBJd1 - 122.1) / 365.25);
    const dblDJd1 = trunc(365.25 * dblCJd1);
    const dblEJd1 = trunc((dblBJd1 - dblDJd1) / 30.6001);

    const dblTgl11 = dblBJd1 - dblDJd1 - trunc(30.6001 * dblEJd1) + dblEFJd1;
    const dblTgl21 = trunc(dblTgl11);
    const dblTgl31 = dblTgl11 - dblTgl21;
    const dblTgl41 = dblTgl31 * 24;
    const dblTgl51 = dblTgl41 + 7;
    const dblTglM1 = dblTgl51 <= 24 ? dblTgl21 : dblTgl21 + 1;

    const dblHasilBulan1 = dblEJd1 < 13.5 ? dblEJd1 - 1 : dblEJd1 - 13;

    let newYear1 = dblHasilBulan1 < 2.5 ? trunc(dblCJd1 - 4715) : trunc(dblCJd1 - 4716);
    let addYear1 = 0;
    /*
    if (intTahun1 >= 2038) {
      const addmultiply1 = intVal((intTahun1 - 1982) / 56);
      addYear1 = addmultiply1 * 56;
      newYear1 = intTahun1 - addYear1;
    }
    */
    const datHasil1 = new Date(newYear1, dblHasilBulan1 - 1, dblTglM1);

    const temp1 = dateAdd('d', 0, newYear1, dblHasilBulan1, dblTglM1);
    const temp2 = dateAdd('d', 29, newYear1, dblHasilBulan1, dblTglM1);

    let datFull2 = datHasil1 > datFull1 ? temp1 : temp2;
    const moon2 = mod(year, 19);
    if (moon2 == 9) datFull2 = temp2;

    const EdatFull = datFull2.split('-');

    const intIJST2: number = 0;
    const intTanggal2 = intVal(EdatFull[2]);
    const intBulan2 = intVal(EdatFull[1]);
    const intArrTahun2 = intVal(EdatFull[0]) + addYear1;

    const intTa12 = intVal(intArrTahun2) % 4 === 0 ? 1 : 0;
    const intTa22 = intVal(intArrTahun2) % 100 === 0 ? 1 : 0;
    const intTa32 = intTa12 + intTa22;

    const dblKB2 = intTa32 > 0 ? 1 : 2;

    const dblK12 = trunc((275 * intBulan2) / 9);
    const dblK22 = trunc((intBulan2 + 9) / 12) * dblKB2;
    const dblK32 = dblK12 - dblK22 + intTanggal2 - 30;
    const dblK42 = dblK32 / 365.25 + (intArrTahun2 - 1900);
    const dblK52 = dblK42 * 12.3685;
    const dblK62 = dblK52 - trunc(dblK52);
    const dblK72 = dblK62 > 0.5 ? trunc(dblK52 + 1) : trunc(dblK52);

    const dblKN2 = intIJST2 === 1 ? dblK72 : dblK72 - 0.5;
    const dblT2 = dblKN2 / 1236.85;

    const dblM12 = 29.10535608 * dblKN2;
    const dblM22 = -0.000033 * dblT2 * dblT2;
    const dblM32 = -0.00000347 * dblT2 * dblT2 * dblT2;
    const dblM2 = mod(359.2242 + dblM12 + dblM22 + dblM32, 360);

    const dblMA12 = 385.81691806 * dblKN2;
    const dblMA22 = 0.0107306 * dblT2 * dblT2;
    const dblMA32 = 0.00001236 * dblT2 * dblT2 * dblT2;
    const dblMA2 = mod(306.0253 + dblMA12 + dblMA22 + dblMA32, 360);

    const dblF12 = 390.67050646 * dblKN2;
    const dblF22 = -0.0016528 * dblT2 * dblT2;
    const dblF32 = -0.00000239 * dblT2 * dblT2 * dblT2;
    const dblF2 = mod(21.2964 + dblF12 + dblF22 + dblF32, 360);

    const dblKRA12 = 0.1734 - 0.000393 * dblT2;
    const dblKRA22 = dblKRA12 * Math.sin((dblM2 * PI) / 180);
    const dblKRA32 = -0.4068 * Math.sin((dblMA2 * PI) / 180);
    const dblKRA42 = 0.0021 * Math.sin((2 * dblM2 * PI) / 180);
    const dblKRA52 = 0.0161 * Math.sin((2 * dblMA2 * PI) / 180);
    const dblKRA62 = -0.0004 * Math.sin((3 * dblMA2 * PI) / 180);
    const dblKORA2 = dblKRA22 + dblKRA32 + dblKRA42 + dblKRA52 + dblKRA62;

    const dblKRB12 = -0.0051 * Math.sin(((dblM2 + dblMA2) * PI) / 180);
    const dblKRB22 = -0.0074 * Math.sin(((dblM2 - dblMA2) * PI) / 180);
    const dblKRB32 = 0.0004 * Math.sin(((2 * dblF2 + dblM2) * PI) / 180);
    const dblKRB42 = -0.0004 * Math.sin(((2 * dblF2 - dblM2) * PI) / 180);
    const dblKRB52 = 0.0104 * Math.sin((2 * dblF2 * PI) / 180);
    const dblKORB2 = dblKRB12 + dblKRB22 + dblKRB32 + dblKRB42 + dblKRB52;

    const dblKC12 = -0.0006 * Math.sin(((2 * dblF2 + dblMA2) * PI) / 180);
    const dblKC22 = 0.001 * Math.sin(((2 * dblF2 - dblMA2) * PI) / 180);
    const dblKC32 = 0.0005 * Math.sin(((dblM2 + 2 * dblMA2) * PI) / 180);
    const dblKORC2 = dblKC12 + dblKC22 + dblKC32;

    const dblKoreksi2 = dblKORA2 + dblKORB2 + dblKORC2;

    const dblJdA12 = 29.53058868 * dblKN2;
    const dblJdA22 = 0.0001178 * dblT2 * dblT2 * dblT2;
    const dblJdA32 = -0.000000155 * dblT2 * dblT2 * dblT2;

    const dblJdB12 = 132.87 * dblT2;
    const dblJdB22 = 0.009173 * dblT2 * dblT2;
    const dblJdB32 = 166.56 + dblJdB12 - dblJdB22;

    const dblJdC12 = 0.00033 * Math.sin((dblJdB32 * PI) / 180);
    const dblJdC22 = dblJdA12 + dblJdA22 + dblJdA32 + dblJdC12;
    const dblJdC32 = 2415020.75933 + dblJdC22;
    const dblJD2 = dblJdC32 + 0.5 + dblKoreksi2;

    const dblZJd2 = trunc(dblJD2);
    const dblEFJd2 = dblJD2 - dblZJd2;
    const dblAPJd2 = trunc((dblZJd2 - 1867216.25) / 36524.25);
    const dblAJd2 = dblZJd2 < 2299161 ? dblZJd2 : dblZJd2 + 1 + dblAPJd2 - trunc(dblAPJd2 / 4);
    const dblBJd2 = dblAJd2 + 1524;
    const dblCJd2 = trunc((dblBJd2 - 122.1) / 365.25);
    const dblDJd2 = trunc(365.25 * dblCJd2);
    const dblEJd2 = trunc((dblBJd2 - dblDJd2) / 30.6001);

    const dblTgl12 = dblBJd2 - dblDJd2 - trunc(30.6001 * dblEJd2) + dblEFJd2;
    const dblTgl22 = trunc(dblTgl12);
    const dblTgl32 = dblTgl12 - dblTgl22;
    const dblTgl42 = dblTgl32 * 24;
    const dblTgl52 = dblTgl42 + 7;
    const dblTglM2 = dblTgl52 <= 24 ? dblTgl22 : dblTgl22 + 1;
    const dblHasilBulan2 = dblEJd2 < 13.5 ? dblEJd2 - 1 : dblEJd2 - 13;

    return formatReadDate(year, dblHasilBulan2, dblTglM2);
  }
  public Tahun(year: number) {
    return year + 544;
  }
}

export default Buddha;
