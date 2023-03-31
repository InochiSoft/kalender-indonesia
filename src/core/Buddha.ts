import { dateAdd, formatReadDate, intVal, mod, trunc } from './Helper';

class Buddha {
  constructor() {}
  public Waisak(year: number) {
    const PI = 3.141592654;
    let newYear = year;
    if (year >= 2038) {
      let addMultiply = intVal((year - 1982) / 56);
      let addYear = addMultiply * 56;
      newYear = year - addYear;
    }
    let intIJST_1 = 0;
    let intTanggal_1 = 5;
    let intBulan_1 = 5;
    let intArrTahun_1 = year;

    let datFull_1 = new Date(newYear, intBulan_1 - 1, intTanggal_1);

    let intTa1_1 = intArrTahun_1 % 4 == 0 ? 1 : 0;
    let intTa2_1 = intArrTahun_1 % 100 == 0 ? 1 : 0;
    let intTa3_1 = intTa1_1 + intTa2_1;

    let dblKB_1 = intTa3_1 > 0 ? 1 : 2;

    let dblK1_1 = trunc((275 * intBulan_1) / 9);
    let dblK2_1 = trunc((intBulan_1 + 9) / 12) * dblKB_1;
    let dblK3_1 = dblK1_1 - dblK2_1 + intTanggal_1 - 30;
    let dblK4_1 = dblK3_1 / 365.25 + (intArrTahun_1 - 1900);
    let dblK5_1 = dblK4_1 * 12.3685;
    let dblK6_1 = dblK5_1 - trunc(dblK5_1);
    let dblK7_1 = dblK6_1 > 0.5 ? trunc(dblK5_1 + 1) : trunc(dblK5_1);

    let dblKN_1 = intIJST_1 == 1 ? dblK7_1 : dblK7_1 - 0.5;
    let dblT_1 = dblKN_1 / 1236.85;

    let dblM1_1 = 29.10535608 * dblKN_1;
    let dblM2_1 = -0.000033 * dblT_1 * dblT_1;
    let dblM3_1 = -0.00000347 * dblT_1 * dblT_1 * dblT_1;
    let dblM_1 = mod(359.2242 + dblM1_1 + dblM2_1 + dblM3_1, 360);

    let dblMA1_1 = 385.81691806 * dblKN_1;
    let dblMA2_1 = 0.0107306 * dblT_1 * dblT_1;
    let dblMA3_1 = 0.00001236 * dblT_1 * dblT_1 * dblT_1;
    let dblMA_1 = mod(306.0253 + dblMA1_1 + dblMA2_1 + dblMA3_1, 360);

    let dblF1_1 = 390.67050646 * dblKN_1;
    let dblF2_1 = -0.0016528 * dblT_1 * dblT_1;
    let dblF3_1 = -0.00000239 * dblT_1 * dblT_1 * dblT_1;
    let dblF_1 = mod(21.2964 + dblF1_1 + dblF2_1 + dblF3_1, 360);

    let dblKRA1_1 = 0.1734 - 0.000393 * dblT_1;
    let dblKRA2_1 = dblKRA1_1 * Math.sin((dblM_1 * PI) / 180);
    let dblKRA3_1 = -0.4068 * Math.sin((dblMA_1 * PI) / 180);
    let dblKRA4_1 = 0.0021 * Math.sin((2 * dblM_1 * PI) / 180);
    let dblKRA5_1 = 0.0161 * Math.sin((2 * dblMA_1 * PI) / 180);
    let dblKRA6_1 = -0.0004 * Math.sin((3 * dblMA_1 * PI) / 180);
    let dblKORA_1 = dblKRA2_1 + dblKRA3_1 + dblKRA4_1 + dblKRA5_1 + dblKRA6_1;

    let dblKRB1_1 = -0.0051 * Math.sin(((dblM_1 + dblMA_1) * PI) / 180);
    let dblKRB2_1 = -0.0074 * Math.sin(((dblM_1 - dblMA_1) * PI) / 180);
    let dblKRB3_1 = 0.0004 * Math.sin(((2 * dblF_1 + dblM_1) * PI) / 180);
    let dblKRB4_1 = -0.0004 * Math.sin(((2 * dblF_1 - dblM_1) * PI) / 180);
    let dblKRB5_1 = 0.0104 * Math.sin((2 * dblF_1 * PI) / 180);
    let dblKORB_1 = dblKRB1_1 + dblKRB2_1 + dblKRB3_1 + dblKRB4_1 + dblKRB5_1;

    let dblKC1_1 = -0.0006 * Math.sin(((2 * dblF_1 + dblMA_1) * PI) / 180);
    let dblKC2_1 = 0.001 * Math.sin(((2 * dblF_1 - dblMA_1) * PI) / 180);
    let dblKC3_1 = 0.0005 * Math.sin(((dblM_1 + 2 * dblMA_1) * PI) / 180);
    let dblKORC_1 = dblKC1_1 + dblKC2_1 + dblKC3_1;

    let dblKoreksi_1 = dblKORA_1 + dblKORB_1 + dblKORC_1;

    let dblJdA1_1 = 29.53058868 * dblKN_1;
    let dblJdA2_1 = 0.0001178 * dblT_1 * dblT_1 * dblT_1;
    let dblJdA3_1 = -0.000000155 * dblT_1 * dblT_1 * dblT_1;

    let dblJdB1_1 = 132.87 * dblT_1;
    let dblJdB2_1 = 0.009173 * dblT_1 * dblT_1;
    let dblJdB3_1 = 166.56 + dblJdB1_1 - dblJdB2_1;

    let dblJdC1_1 = 0.00033 * Math.sin((dblJdB3_1 * PI) / 180);
    let dblJdC2_1 = dblJdA1_1 + dblJdA2_1 + dblJdA3_1 + dblJdC1_1;
    let dblJdC3_1 = 2415020.75933 + dblJdC2_1;
    let dblJD_1 = dblJdC3_1 + 0.5 + dblKoreksi_1;

    let dblZJd_1 = trunc(dblJD_1);
    let dblEFJd_1 = dblJD_1 - dblZJd_1;
    let dblAPJd_1 = trunc((dblZJd_1 - 1867216.25) / 36524.25);
    let dblAJd_1 = dblZJd_1 < 2299161 ? dblZJd_1 : dblZJd_1 + 1 + dblAPJd_1 - trunc(dblAPJd_1 / 4);
    let dblBJd_1 = dblAJd_1 + 1524;
    let dblCJd_1 = trunc((dblBJd_1 - 122.1) / 365.25);
    let dblDJd_1 = trunc(365.25 * dblCJd_1);
    let dblEJd_1 = trunc((dblBJd_1 - dblDJd_1) / 30.6001);

    let dblTgl1_1 = dblBJd_1 - dblDJd_1 - trunc(30.6001 * dblEJd_1) + dblEFJd_1;
    let dblTgl2_1 = trunc(dblTgl1_1);
    let dblTgl3_1 = dblTgl1_1 - dblTgl2_1;
    let dblTgl4_1 = dblTgl3_1 * 24;
    let dblTgl5_1 = dblTgl4_1 + 7;
    let dblTglM_1 = dblTgl5_1 <= 24 ? dblTgl2_1 : dblTgl2_1 + 1;

    let dblHasilBulan_1 = dblEJd_1 < 13.5 ? dblEJd_1 - 1 : dblEJd_1 - 13;

    let intTahun1 = dblHasilBulan_1 < 2.5 ? trunc(dblCJd_1 - 4715) : trunc(dblCJd_1 - 4716);
    let newYear1 = intTahun1;
    let addYear1 = 0;

    if (intTahun1 >= 2038) {
      let addmultiply1 = intVal((intTahun1 - 1982) / 56);
      addYear1 = addmultiply1 * 56;
      newYear1 = intTahun1 - addYear1;
    }

    let datHasil_1 = new Date(newYear1, dblHasilBulan_1 - 1, dblTglM_1);

    let temp1 = dateAdd('d', 0, newYear1, dblHasilBulan_1, dblTglM_1);
    let temp2 = dateAdd('d', 29, newYear1, dblHasilBulan_1, dblTglM_1);

    let datFull_2 = datHasil_1 > datFull_1 ? temp1 : temp2;

    let EdatFull = datFull_2.split('-');

    let intIJST_2 = 0;
    let intTanggal_2 = intVal(EdatFull[2]);
    let intBulan_2 = intVal(EdatFull[1]);
    let intArrTahun_2 = intVal(EdatFull[0]) + addYear1;

    let intTa1_2 = intVal(intArrTahun_2) % 4 == 0 ? 1 : 0;
    let intTa2_2 = intVal(intArrTahun_2) % 100 == 0 ? 1 : 0;
    let intTa3_2 = intTa1_2 + intTa2_2;

    let dblKB_2 = intTa3_2 > 0 ? 1 : 2;

    let dblK1_2 = trunc((275 * intBulan_2) / 9);
    let dblK2_2 = trunc((intBulan_2 + 9) / 12) * dblKB_2;
    let dblK3_2 = dblK1_2 - dblK2_2 + intTanggal_2 - 30;
    let dblK4_2 = dblK3_2 / 365.25 + (intArrTahun_2 - 1900);
    let dblK5_2 = dblK4_2 * 12.3685;
    let dblK6_2 = dblK5_2 - trunc(dblK5_2);
    let dblK7_2 = dblK6_2 > 0.5 ? trunc(dblK5_2 + 1) : trunc(dblK5_2);

    let dblKN_2 = intIJST_2 == 1 ? dblK7_2 : dblK7_2 - 0.5;
    let dblT_2 = dblKN_2 / 1236.85;

    let dblM1_2 = 29.10535608 * dblKN_2;
    let dblM2_2 = -0.000033 * dblT_2 * dblT_2;
    let dblM3_2 = -0.00000347 * dblT_2 * dblT_2 * dblT_2;
    let dblM_2 = mod(359.2242 + dblM1_2 + dblM2_2 + dblM3_2, 360);

    let dblMA1_2 = 385.81691806 * dblKN_2;
    let dblMA2_2 = 0.0107306 * dblT_2 * dblT_2;
    let dblMA3_2 = 0.00001236 * dblT_2 * dblT_2 * dblT_2;
    let dblMA_2 = mod(306.0253 + dblMA1_2 + dblMA2_2 + dblMA3_2, 360);

    let dblF1_2 = 390.67050646 * dblKN_2;
    let dblF2_2 = -0.0016528 * dblT_2 * dblT_2;
    let dblF3_2 = -0.00000239 * dblT_2 * dblT_2 * dblT_2;
    let dblF_2 = mod(21.2964 + dblF1_2 + dblF2_2 + dblF3_2, 360);

    let dblKRA1_2 = 0.1734 - 0.000393 * dblT_2;
    let dblKRA2_2 = dblKRA1_2 * Math.sin((dblM_2 * PI) / 180);
    let dblKRA3_2 = -0.4068 * Math.sin((dblMA_2 * PI) / 180);
    let dblKRA4_2 = 0.0021 * Math.sin((2 * dblM_2 * PI) / 180);
    let dblKRA5_2 = 0.0161 * Math.sin((2 * dblMA_2 * PI) / 180);
    let dblKRA6_2 = -0.0004 * Math.sin((3 * dblMA_2 * PI) / 180);
    let dblKORA_2 = dblKRA2_2 + dblKRA3_2 + dblKRA4_2 + dblKRA5_2 + dblKRA6_2;

    let dblKRB1_2 = -0.0051 * Math.sin(((dblM_2 + dblMA_2) * PI) / 180);
    let dblKRB2_2 = -0.0074 * Math.sin(((dblM_2 - dblMA_2) * PI) / 180);
    let dblKRB3_2 = 0.0004 * Math.sin(((2 * dblF_2 + dblM_2) * PI) / 180);
    let dblKRB4_2 = -0.0004 * Math.sin(((2 * dblF_2 - dblM_2) * PI) / 180);
    let dblKRB5_2 = 0.0104 * Math.sin((2 * dblF_2 * PI) / 180);
    let dblKORB_2 = dblKRB1_2 + dblKRB2_2 + dblKRB3_2 + dblKRB4_2 + dblKRB5_2;

    let dblKC1_2 = -0.0006 * Math.sin(((2 * dblF_2 + dblMA_2) * PI) / 180);
    let dblKC2_2 = 0.001 * Math.sin(((2 * dblF_2 - dblMA_2) * PI) / 180);
    let dblKC3_2 = 0.0005 * Math.sin(((dblM_2 + 2 * dblMA_2) * PI) / 180);
    let dblKORC_2 = dblKC1_2 + dblKC2_2 + dblKC3_2;

    let dblKoreksi_2 = dblKORA_2 + dblKORB_2 + dblKORC_2;

    let dblJdA1_2 = 29.53058868 * dblKN_2;
    let dblJdA2_2 = 0.0001178 * dblT_2 * dblT_2 * dblT_2;
    let dblJdA3_2 = -0.000000155 * dblT_2 * dblT_2 * dblT_2;

    let dblJdB1_2 = 132.87 * dblT_2;
    let dblJdB2_2 = 0.009173 * dblT_2 * dblT_2;
    let dblJdB3_2 = 166.56 + dblJdB1_2 - dblJdB2_2;

    let dblJdC1_2 = 0.00033 * Math.sin((dblJdB3_2 * PI) / 180);
    let dblJdC2_2 = dblJdA1_2 + dblJdA2_2 + dblJdA3_2 + dblJdC1_2;
    let dblJdC3_2 = 2415020.75933 + dblJdC2_2;
    let dblJD_2 = dblJdC3_2 + 0.5 + dblKoreksi_2;

    let dblZJd_2 = trunc(dblJD_2);
    let dblEFJd_2 = dblJD_2 - dblZJd_2;
    let dblAPJd_2 = trunc((dblZJd_2 - 1867216.25) / 36524.25);
    let dblAJd_2 = dblZJd_2 < 2299161 ? dblZJd_2 : dblZJd_2 + 1 + dblAPJd_2 - trunc(dblAPJd_2 / 4);
    let dblBJd_2 = dblAJd_2 + 1524;
    let dblCJd_2 = trunc((dblBJd_2 - 122.1) / 365.25);
    let dblDJd_2 = trunc(365.25 * dblCJd_2);
    let dblEJd_2 = trunc((dblBJd_2 - dblDJd_2) / 30.6001);

    let dblTgl1_2 = dblBJd_2 - dblDJd_2 - trunc(30.6001 * dblEJd_2) + dblEFJd_2;
    let dblTgl2_2 = trunc(dblTgl1_2);
    let dblTgl3_2 = dblTgl1_2 - dblTgl2_2;
    let dblTgl4_2 = dblTgl3_2 * 24;
    let dblTgl5_2 = dblTgl4_2 + 7;
    let dblTglM_2 = dblTgl5_2 <= 24 ? dblTgl2_2 : dblTgl2_2 + 1;
    let dblHasilBulan_2 = dblEJd_2 < 13.5 ? dblEJd_2 - 1 : dblEJd_2 - 13;
    return formatReadDate(year, dblHasilBulan_2, dblTglM_2);
  }
  public Tahun(year: number) {
    return year + 544;
  }
}

export default Buddha;
