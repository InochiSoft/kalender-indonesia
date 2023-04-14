import {
  ceiling,
  dateAdd,
  daysBetween,
  daysInMonth,
  formatReadDate,
  formatReadTime,
  intPart,
  intVal,
  mod,
  round,
  roundTime,
  roundUp,
  trunc,
} from './Helper';
import {HisabResult, ImsakiyahResult} from "../opt";

class Islam {
  public CurrentYear: any = {};
  public DateMasehiToHijri: any = {};

  private static _masehiToHijriSincTemp(dYear: number, dMonth: number, dDay: number) {
    const intAW = 227016;
    const TA = [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
    const JH = [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 354];

    const intMonth = dMonth < 3 ? dMonth + 12 : dMonth;
    const intYear = dMonth < 3 ? dYear - 1 : dYear;

    const intAM1 = intVal(365.25 * intYear) + intVal(30.60001 * (intMonth + 1)) + dDay - 428;
    const intB = intAM1 < 577748 ? 0 : 2 - intVal(intYear / 100) + intVal(intVal(intYear / 100) / 4);

    const intAM = intVal(365.25 * intYear) + intVal(30.60001 * (intMonth + 1)) + dDay + intB - 428;

    const intAH = intAM - intAW;
    const intThH1 = intVal(intAH / 354.3671);

    const intModDay1 = round(intAH - 354.3671 * intVal(intAH / 354.3671), 0.5);
    const intModDay2 = roundUp(intAH - 354.3671 * intVal(intAH / 354.3671));

    const intDayCount = intAH < 0 ? intModDay1 : intModDay2;
    const intAddYear = intVal(intDayCount / 365);

    const intTHM2 = intThH1 + intAddYear + 1;
    const intSisa = mod(intDayCount, 365);
    let intBulan1 = 0;

    for (let x = 1; x <= 12; x++) {
      if (intSisa >= JH[x - 1] && intSisa <= JH[x]) {
        intBulan1 = x - 1;
        break;
      }
    }

    const intJmlHari = JH[intBulan1];
    const intSisaHari = intSisa - intJmlHari;

    let dHijri = intSisaHari === 0 ? TA[intBulan1] : intSisaHari;
    const mHijri = intSisaHari === 0 ? intBulan1 : (intBulan1 + 1) % 12 === 0 ? 12 : (intBulan1 + 1) % 12;

    let yHijri = intTHM2;

    if (intSisaHari === 355) {
      dHijri = 1;
      yHijri = intTHM2 + 1;
    }
    return formatReadDate(intVal(yHijri), intVal(mHijri), dHijri);
  }

  private static _masehiToHijriSinc(dYear: number, dMonth: number, dDay: number) {
    let newYear = dYear;
    let addYear = 0;
    /*
    let addMultiply = 0;
    if (dYear >= 2038) {
      addMultiply = intVal((dYear - 1982) / 56);
      addYear = addMultiply * 56;
      newYear = dYear - addMultiply * 56;
    }
    */
    const dDateAfter = dateAdd('d', 1, newYear, dMonth, dDay);
    const arrDateAfter = dDateAfter.split('-');

    const intYearDate = intVal(arrDateAfter[0]) + addYear;
    const intMonthDate = intVal(arrDateAfter[1]);
    const intDayDate = intVal(arrDateAfter[2]);

    const M2JNow = Islam._masehiToHijriSincTemp(dYear, dMonth, dDay);
    const arrM2JNow = M2JNow.split('-');

    const M2JAfter = Islam._masehiToHijriSincTemp(intYearDate, intMonthDate, intDayDate);
    const arrM2JAfter = M2JAfter.split('-');

    let lastResultDay: number = intVal(arrM2JNow[2]);

    if (intVal(arrM2JNow[1]) === 1) {
      if (intVal(arrM2JNow[2]) === intVal(arrM2JAfter[2])) {
        lastResultDay = 30;
      }
    }
    return formatReadDate(intVal(arrM2JNow[0]), intVal(arrM2JNow[1]), lastResultDay);
  }

  private static _getHisab(
    index: number = 0,
    yMasehi: number = 0,
    yHijri: number = 0,
    mLastMonth: number = 0,
    addMonth: number = 0,
    latitude: number = -6.9128,
    longitude: number = 107.6206,
    timezone: number = 7,
    altitude: number = 10,
  ) {
    const result: HisabResult = {
      index: 0,
      last_hijri_year: 0,
      last_hijri_month: 0,
      add_month: 0,
      hijri_year: 0,
      hijri_month: 0,
      hijri_day: 0,
      hijri_date: '',
      masehi_year: 0,
      masehi_month: 0,
      masehi_day: 0,
      masehi_date: '',
      days_count: 0,
    };

    const timezoneconv = timezone * 15;
    const pilihanimkan: number = 2;
    const imkanurrukyah1: number = 2;
    const Ir: number = pilihanimkan === 1 ? 0.1 : imkanurrukyah1;
    let akhirbulan = mLastMonth;
    let mHijri = 0;

    switch (index) {
      case 0:
        const datHijri: string = Islam._masehiToHijriSinc(yMasehi, 1, 1);
        const arrHijri = datHijri.split('-');
        mHijri = intVal(arrHijri[1]);
        yHijri = intVal(arrHijri[0]);
        akhirbulan = mHijri === 1 ? 12 : mHijri - 1;
        yHijri = mHijri === 1 ? yHijri - 1 : yHijri;
        break;
      case 1:
        yHijri = akhirbulan === 12 ? yHijri + addMonth : yHijri;
        akhirbulan = mod(akhirbulan + addMonth, 12) === 0 ? 12 : mod(akhirbulan + addMonth, 12);
        break;
      default:
        yHijri = akhirbulan === 12 ? yHijri + 1 : yHijri;
        akhirbulan = mod(akhirbulan + 1, 12) === 0 ? 12 : mod(akhirbulan + 1, 12);
        break;
    }

    result.index = index;
    result.last_hijri_year = yHijri;
    result.last_hijri_month = akhirbulan;

    const arrIRP = [0, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 2, 2, 0.1, 2, 0.1];
    const ImkanPilihan = pilihanimkan === 3 ? arrIRP[akhirbulan] : Ir;
    const PI = 3.14159265358979323846;
    const Dr = 180 / PI;
    const HY = yHijri + (akhirbulan * 29.53) / 354.3671;
    const K = Math.ceil((HY - 1410) * 12);
    let T = round(K / 1200, 10);
    const tJD1 = round(29.53058868 * K, 6);
    const tJD2 = Math.pow(T, 2);
    const tJD3 = 0.0001178 * tJD2;
    let JD = round(2447740.652 + tJD1 + tJD3, 6);
    const tM1a = round(29.10535608 * K, 6);
    const tM1b = 207.9587074;
    const tM1c = Math.pow(T, 2);
    const tM1d = -0.0000333 * tM1c;
    const tM1e = tM1a + tM1b + tM1d;
    let M1 = round(tM1e / 360, 10);
    const tM = M1 - intVal(M1);
    let M = tM * 360;
    const tMq1a = round(385.81691806 * K, 6);
    const tMq1b = 111.1791307;
    const tMq1c = Math.pow(T, 2);
    const tMq1d = 0.0107306 * tMq1c;
    const tMq1e = tMq1a + tMq1b + tMq1d;
    const Mq1 = tMq1e / 360;
    const tMq = Mq1 - intVal(Mq1);
    const Mq = tMq * 360;
    const tF1a = round(390.67050646 * K, 6);
    const tF1b = 164.2162296;
    const tF1c = Math.pow(T, 2);
    const tF1d = -0.0016528 * tF1c;
    const tF1e = tF1a + tF1b + tF1d;
    let F1 = tF1e / 360;
    const tF = F1 - intVal(F1);
    let F = tF * 360;
    let T1 = (0.1734 - 0.000395 * T) * Math.sin(M / Dr);
    let T2 = 0.0021 * Math.sin((2 * M) / Dr);
    let T3 = -0.4068 * Math.sin(Mq / Dr);
    let T4 = 0.0161 * Math.sin((2 * Mq) / Dr);
    let T5 = -0.0004 * Math.sin((3 * Mq) / Dr);
    let T6 = 0.0104 * Math.sin((2 * F) / Dr);
    let T7 = -0.0051 * Math.sin(M / Dr + Mq / Dr);
    let T8 = -0.0074 * Math.sin(M / Dr - Mq / Dr);
    let T9 = 0.0004 * Math.sin((2 * F) / Dr + M / Dr);
    let T10 = -0.0004 * Math.sin((2 * F) / Dr - M / Dr);
    let T11 = -0.0006 * Math.sin((2 * F) / Dr + Mq / Dr);
    let T12 = 0.001 * Math.sin((2 * F) / Dr - Mq / Dr);
    let T13 = 0.0005 * Math.sin(M / Dr + (2 * Mq) / Dr);
    const MT = T1 + T2 + T3 + T4 + T5 + T6 + T7 + T8 + T9 + T10 + T11 + T12 + T13;
    const JDIjtimak = round(JD + 0.5 + MT, 6);
    const WIq = JDIjtimak - intPart(JDIjtimak);
    const WI = WIq * 24;
    const Z = intVal(JDIjtimak);
    const tAA = Z - 1867216.25;
    const AA = intVal(tAA / 36524.25);
    let A = Z < 2299161 ? Z : Z + 1 + AA - intVal(AA / 4);
    const B = A + 1524;
    let C = intVal((B - 122.1) / 365.25);
    let D = intVal(365.25 * C);
    let E = intVal((B - D) / 30.6001);
    const TglMUT = intVal(B - D - intVal(30.6001 * E));
    const BlnMUT = E > 13.5 ? E - 13 : E - 1;
    let newYear = BlnMUT < 2.5 ? C - 4715 : C - 4716;
    let addYear = 0;
    /*
    let addMultiply = 0;
    if (ThnMUT >= 2038) {
      addMultiply = intVal((ThnMUT - 1982) / 56);
      addYear = addMultiply * 56;
      newYear = ThnMUT - addYear;
    }
    */
    const datFull = new Date(newYear, BlnMUT - 1, TglMUT, WI + timezone, 0, 0, 0);

    const TglM = datFull.getDate(); // C59
    const BlnM = datFull.getMonth() + 1; // C60
    const ThnM = datFull.getFullYear() + addYear; // C61

    JD =
      trunc(1461 * ((ThnM + 4800 + (BlnM - 14) / 12) / 4)) -
      trunc((3 / 400) * (ThnM + 4900 + (BlnM - 14) / 12)) +
      TglM -
      31709.5;

    T = (JD - 2451545) / 36525;
    const L = 279.69668 + 36000.76892 * T + 0.0003025 * Math.pow(T, 2);
    const G = 358.47583 + 35999.04975 * T - 0.00015 * Math.pow(T, 2) - 0.0000033 * Math.pow(T, 3);
    const R = 0.01675104 - 0.0000418 * T - 0.000000126 * Math.pow(T, 2);
    C =
      L +
      (1.91946 - 0.004789 * T - 0.000014 * Math.pow(T, 2)) * Math.sin((G * PI) / 180) +
      (0.020094 - 0.0001 * T) * Math.sin((2 * G * PI) / 180) +
      0.000293 * Math.sin((3 * G * PI) / 180);

    const mailkulli = 23.452294 - 0.0130125 * T - 0.00000164 * Math.pow(T, 2) + 0.000000503 * Math.pow(T, 3);
    const declinasimthr = (Math.asin(Math.sin((mailkulli * PI) / 180) * Math.sin((C * PI) / 180)) * 180) / PI;
    const tX = Math.tan(((mailkulli / 2) * PI) / 180);
    const X = Math.pow(tX, 2);
    const Tafawwut =
      ((X * Math.sin((2 * L * PI) / 180) -
        2 * R * Math.sin((G * PI) / 180) +
        4 * R * X * Math.sin((G * PI) / 180) * Math.cos((2 * L * PI) / 180) -
        0.5 * Math.pow(X, 2) * Math.sin((4 * L * PI) / 180) -
        (5 / 4) * Math.pow(R, 2) * Math.sin((2 * G * PI) / 180)) *
        180) /
      PI /
      15;
    const WaktuZawal = 12 - Tafawwut + (timezoneconv - longitude) / 15;
    let N = -Math.tan((latitude * PI) / 180) * Math.tan((declinasimthr * PI) / 180);
    const U = Math.cos((latitude * PI) / 180) * Math.cos((declinasimthr * PI) / 180);
    const W = (Math.acos(N + Math.sin((-1 * PI) / 180) / U) * 180) / PI / 15;
    const GhurubMthr2 = WaktuZawal + W;
    const GhurubMthr1 = GhurubMthr2 - timezone;
    const Tanggal = TglM;
    const Bulan = BlnM < 3 ? BlnM + 12 : BlnM;
    const Tahun = BlnM < 3 ? ThnM - 1 : ThnM;
    const GrbMatahariTqrb = GhurubMthr1;
    const B2 = 2 - intVal(Tahun / 100) + intVal(intVal(Tahun / 100) / 4);
    const JD2 =
      intVal(365.25 * (Tahun + 4716)) + intVal(30.6001 * (Bulan + 1)) + Tanggal + GrbMatahariTqrb / 24 + B2 - 1524.5;
    T2 = (JD2 - 2451545) / 36525;
    const S1 = (280.46645 + 36000.76983 * T2) / 360;
    const S = (S1 - intVal(S1)) * 360;
    M1 = (357.5291 + 35999.0503 * T2) / 360;
    M = (M1 - intVal(M1)) * 360;
    const N1 = (125.04 - 1934.136 * T2) / 360;
    N = (N1 - intVal(N1)) * 360;
    const Kr1 = (17.264 / 3600) * Math.sin(N / Dr) + (0.206 / 3600) * Math.sin((2 * N) / Dr);
    const Kr2 = (-1.264 / 3600) * Math.sin((2 * S) / Dr);
    const Kr3 = (9.23 / 3600) * Math.cos(N / Dr) - (0.09 / 3600) * Math.cos((2 * N) / Dr);
    const Kr4 = (0.548 / 3600) * Math.cos((2 * S) / Dr);
    const Qq = 23.43929111 + Kr3 + Kr4 - (46.815 / 3600) * T2;
    E =
      (6898.06 / 3600) * Math.sin(M / Dr) +
      (72.095 / 3600) * Math.sin((2 * M) / Dr) +
      (0.966 / 3600) * Math.sin((3 * M) / Dr);
    const Sq = mod(S + E + Kr1 + Kr2 - 20.47 / 3600, 360);
    const MailS = (Math.asin(Math.sin(Sq / Dr) * Math.sin(Qq / Dr)) * 180) / PI;
    const Pta = (Math.atan(Math.tan(Sq / Dr) * Math.cos(Qq / Dr)) * 180) / PI;

    const Ptb = Sq >= 0 && Sq <= 90 ? Pta : 0;
    const Ptc = Sq >= 90 && Sq <= 270 ? Pta + 180 : 0;
    const Ptd = Sq >= 270 && Sq <= 360 ? Pta + 360 : 0;

    const PT = Ptb + Ptc + Ptd;
    const xsd = 0.267 / (1 - 0.017 * Math.cos(M / Dr));
    const Dip = (1.76 / 60) * Math.sqrt(altitude);
    const xh = -(xsd + 34.5 / 60 + Dip);
    const xt =
      (Math.acos(
        -Math.tan(latitude / Dr) * Math.tan(MailS / Dr) +
        Math.sin(xh / Dr) / Math.cos(latitude / Dr) / Math.cos(MailS / Dr),
        ) *
        180) /
      PI;

    M1 = (218.31617 + 481267.88088 * T2) / 360;
    const HM = (M1 - intVal(M1)) * 360;
    const A1 = (134.96292 + 477198.86753 * T2) / 360;
    A = mod((A1 - intVal(A1)) * 360, 360);
    F1 = (93.27283 + 483202.01873 * T2) / 360;
    F = (F1 - intVal(F1)) * 360;
    const D1 = (297.85027 + 445267.11135 * T2) / 360;
    D = (D1 - intVal(D1)) * 360;
    T1 = (22640 / 3600) * Math.sin(A / Dr);
    T2 = (-4586 / 3600) * Math.sin((A - 2 * D) / Dr);
    T3 = (2370 / 3600) * Math.sin((2 * D) / Dr);
    T4 = (769 / 3600) * Math.sin((2 * A) / Dr);
    T5 = (-668 / 3600) * Math.sin(M / Dr);
    T6 = (-412 / 3600) * Math.sin((2 * F) / Dr);
    T7 = (-212 / 3600) * Math.sin((2 * A - 2 * D) / Dr);
    T8 = (-206 / 3600) * Math.sin((A + M - 2 * D) / Dr);
    T9 = (192 / 3600) * Math.sin((A + 2 * D) / Dr);
    T10 = (-165 / 3600) * Math.sin((M - 2 * D) / Dr);
    T11 = (148 / 3600) * Math.sin((A - M) / Dr);
    T12 = (-125 / 3600) * Math.sin(D / Dr);
    T13 = (-110 / 3600) * Math.sin((A + M) / Dr);
    const T14 = (-55 / 3600) * Math.sin((2 * F - 2 * D) / Dr);
    C = T1 + T2 + T3 + T4 + T5 + T6 + T7 + T8 + T9 + T10 + T11 + T12 + T13 + T14;
    const Mo = HM + C + Kr1 + Kr2 - 20.47 / 3600;
    const Aq = A + T2 + T3 + T5;
    const Lq =
      (18461 / 3600) * Math.sin(F / Dr) +
      (1010 / 3600) * Math.sin((A + F) / Dr) +
      (1000 / 3600) * Math.sin((A - F) / Dr) -
      (624 / 3600) * Math.sin((F - 2 * D) / Dr) -
      (199 / 3600) * Math.sin((A - F - 2 * D) / Dr) -
      (167 / 3600) * Math.sin((A + F - 2 * D) / Dr);
    const x = (Math.atan(Math.sin(Mo / Dr) * Math.tan(Qq / Dr)) * 180) / PI;
    const y = Lq + x;
    const nc = (Math.asin((Math.sin(Mo / Dr) * Math.sin(Qq / Dr) * Math.sin(y / Dr)) / Math.sin(x / Dr)) * 180) / PI;
    const Ptca = (Math.acos((Math.cos(Mo / Dr) * Math.cos(Lq / Dr)) / Math.cos(nc / Dr)) * 180) / PI;
    const Ptcb = Mo >= 0 && Mo <= 180 ? Ptca : 0;
    const Ptcc = Mo >= 180 && Mo <= 360 ? 360 - Ptca : 0;
    const PTc = Ptcb + Ptcc;
    const tc = mod(PT - PTc + xt, 360);
    const hc =
      (Math.asin(
        Math.sin(latitude / Dr) * Math.sin(nc / Dr) + Math.cos(latitude / Dr) * Math.cos(nc / Dr) * Math.cos(tc / Dr),
        ) *
        180) /
      PI;
    const xp = (384401 * (1 - Math.pow(0.0549, 2))) / (1 + 0.0549 * Math.cos((Aq + T1) / Dr));
    const HP = 0.9507 / (xp / 384401);
    const sdc = 0.5181 / (xp / 384401) / 2;
    const P = HP * Math.cos(hc / Dr);
    const Ref = 0.0167 / Math.tan((hc + 7.31 / (hc + 4.4)) / Dr);
    const hcqa = hc < 0 || hc - P < 0 ? hc - P : 0;
    const hcqb = hc - P > 0 ? hc - P + sdc + Ref + Dip : 0;
    const hcq = hcqa + hcqb;
    const TambahHari = hcq >= ImkanPilihan ? 1 : 2;
    let BulanHijri = mod(akhirbulan + 1, 12);
    const TahunHijri = akhirbulan === 12 ? yHijri + 1 : yHijri;
    const arrJumlahBulan = [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    arrJumlahBulan[2] = daysInMonth(BlnM, ThnM);
    const tTanggalAwal =
      TglM + TambahHari > arrJumlahBulan[BlnM] ? TglM + TambahHari - arrJumlahBulan[BlnM] : TglM + TambahHari;
    const tBulanAwal = TglM + TambahHari > arrJumlahBulan[BlnM] ? mod(BlnM + 1, 12) : mod(BlnM, 12);
    const tTahunAwal = TglM + TambahHari > 31 && BlnM === 12 ? ThnM + 1 : ThnM;

    const TanggalAwal = tTanggalAwal;
    const BulanAwal = tBulanAwal === 0 ? 12 : tBulanAwal;
    const TahunAwal = tTahunAwal;

    addMonth = TglM < 3 && BlnM === 12 ? 1 : 0;

    if (BulanHijri === 0) BulanHijri = 12;

    result.add_month = addMonth;
    result.hijri_year = TahunHijri;
    result.hijri_month = BulanHijri;
    result.hijri_day = 1;
    result.hijri_date = formatReadDate(TahunHijri, BulanHijri, 1);
    result.masehi_year = TahunAwal;
    result.masehi_month = BulanAwal;
    result.masehi_day = TanggalAwal;
    result.masehi_date = formatReadDate(TahunAwal, BulanAwal, TanggalAwal);
    result.days_count = 0;
    return result;
  }

  private static _calcHisab(year: number, latitude: number, longitude: number, timezone: number, altitude = 10) {
    const result: HisabResult[] = [];

    for (let i = 0; i <= 15; i++) {
      const itemResult: HisabResult = {
        index: 0,
        last_hijri_year: 0,
        last_hijri_month: 0,
        add_month: 0,
        hijri_year: 0,
        hijri_month: 0,
        hijri_day: 0,
        hijri_date: '',
        masehi_year: 0,
        masehi_month: 0,
        masehi_day: 0,
        masehi_date: '',
        days_count: 0,
      };
      result.push(itemResult);
    }

    result[0] = Islam._getHisab(0, year, 0, 0, 0, latitude, longitude, timezone, altitude);

    let yHijri = result[0].last_hijri_year;
    let mHijri = result[0].last_hijri_month;
    let addMonth = result[0].add_month;

    for (let i = 1; i <= 15; i++) {
      result[i].days_count = 0;

      yHijri = result[i - 1].last_hijri_year;
      mHijri = result[i - 1].last_hijri_month;
      addMonth = result[i - 1].add_month;

      result[i] = Islam._getHisab(i, year, yHijri, mHijri, addMonth, latitude, longitude, timezone, altitude);

      const startDate = result[i - 1].masehi_date;
      const endDate = result[i].masehi_date;

      result[i - 1].days_count = daysBetween(startDate, endDate);
    }

    return result;
  }

  public HijriToMasehi(dYear: number, dMonth: number, dDay: number) {
    const intAW: number = 227016;
    const intAH: number =
      trunc((11 * dYear) / 30) + trunc(354 * dYear) + trunc(30 * dMonth) - trunc((dMonth - 1) / 2) + dDay - 384;

    const intAM: number = intAH + intAW;

    const intTHM1: number = intVal(intAM / 1461) * 4;
    const intDayCount: number = intAM % 1461;
    const intAddYear: number = intVal(intDayCount / 365);

    const intTHM2: number = intTHM1 + intAddYear + 1;
    const intA: number = intDayCount % 365;
    const intB: number = intAM < 577748 ? 0 : 2 - intVal(intTHM2 / 100) + intVal(intVal(intTHM2 / 100) / 4);

    const intSisa: number = intA - intB;
    const JH = [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31];
    JH[2] = intTHM2 % 4 === 0 || intTHM2 % 100 === 0 || intTHM2 % 400 === 0 ? 29 : 28;

    const JLH = [0, 31];
    let intMatch: number = 1;

    for (let x = 2; x <= 12; x++) {
      JLH[x] = JLH[x - 1] + JH[x];
    }

    for (let x = 1; x <= 12; x++) {
      if (intSisa >= JLH[x - 1] && intSisa <= JLH[x]) {
        intMatch = x - 1;
        break;
      }
    }

    const intBulan1: number = intSisa < 31 ? 0 : intMatch;

    const intJmlHari: number = JLH[intBulan1];
    const intSisaHari: number = intSisa - intJmlHari;

    const dMasehi: number = intSisaHari === 0 ? JH[intBulan1] : intSisaHari;
    let mMasehi: number = intJmlHari === 0 ? intBulan1 : (intBulan1 + 1) % 12 === 0 ? 12 : (intBulan1 + 1) % 12;

    if (mMasehi === 0) mMasehi = 1;
    return formatReadDate(intVal(intTHM2), intVal(mMasehi), dMasehi);
  }

  public Hisab(year: number, latitude: number = -6.9128, longitude: number = 107.6206, timezone: number = 7, altitude: number = 10) {
    const yearBefore = year - 1;
    const hisabBefore = Islam._calcHisab(yearBefore, latitude, longitude, timezone, altitude);
    const daysCount: number[] = [];
    const startDateMasehi: string[] = [];
    const startDateHijri: string[] = [];
    const dateMasehiToHijriBefore: any[] = [];
    const dateMasehiToHijriNow: any[] = [];

    for (let i = 2; i < 16; i++) {
      daysCount.push(0);
      startDateMasehi.push('');
    }

    for (let i = 2; i < 16; i++) {
      startDateMasehi[i] = hisabBefore[i].masehi_date;
      startDateHijri[i] = hisabBefore[i].hijri_date;

      daysCount[i] = i < 15 ? hisabBefore[i].days_count : 0;

      const arrRealMasehi = startDateMasehi[i].split('-');
      let realYearMasehi: number = intVal(arrRealMasehi[0]);

      const arrDateMasehi = startDateMasehi[i].split('-');
      const arrDateHijri = startDateHijri[i].split('-');

      const thisDayMasehi = arrDateMasehi[2];
      const thisMonthMasehi = arrDateMasehi[1];
      const thisYearMasehi = arrDateMasehi[0];

      if (intVal(arrDateHijri[1]) === 0) {
        arrDateHijri[1] = '12';
      }

      let newYear: number = intVal(thisYearMasehi);
      let addYear = 0;
      /*
      let addMultiply = 0;
      if (intVal(thisYearMasehi) >= 2038) {
        addMultiply = (intVal(thisYearMasehi) - 1982) / 56;
        addYear = addMultiply * 56;
        newYear = intVal(thisYearMasehi) - addMultiply * 56;
      }
      */
      for (let x = 0; x < daysCount[i]; x++) {
        const newDateMasehi = dateAdd('d', x, newYear, intVal(thisMonthMasehi), intVal(thisDayMasehi));
        const arrNewDateMasehi = newDateMasehi.split('-');

        realYearMasehi = realYearMasehi + (addYear + intVal(arrNewDateMasehi[0]) - realYearMasehi);

        if (i < 15) {
          dateMasehiToHijriBefore.push({
            masehi: formatReadDate(intVal(realYearMasehi), intVal(arrNewDateMasehi[1]), intVal(arrNewDateMasehi[2])),
            hijri: formatReadDate(intVal(arrDateHijri[0]), intVal(arrDateHijri[1]), intVal(arrDateHijri[2]) + x),
            daycount: daysCount[i],
          });
        }
      }
    }

    const hisabNow = Islam._calcHisab(year, latitude, longitude, timezone, altitude);

    for (let i = 2; i < 15; i++) {
      startDateMasehi[i] = hisabNow[i].masehi_date;
      startDateHijri[i] = hisabNow[i].hijri_date;
      daysCount[i] = hisabNow[i].days_count;

      const arrRealMasehi = startDateMasehi[i].split('-');
      let realYearMasehi: number = intVal(arrRealMasehi[0]);

      const arrDateMasehi = startDateMasehi[i].split('-');
      const arrDateHijri = startDateHijri[i].split('-');

      const thisDayMasehi = arrDateMasehi[2];
      const thisMonthMasehi = arrDateMasehi[1];
      const thisYearMasehi = arrDateMasehi[0];

      if (intVal(arrDateHijri[1]) === 0) {
        arrDateHijri[1] = '12';
      }

      for (let x = 0; x < daysCount[i]; x++) {
        let newYear: number = intVal(thisYearMasehi);
        let addYear = 0;
        /*
        let addMultiply = 0;
        if (intVal(thisYearMasehi) >= 2038) {
          addMultiply = (intVal(thisYearMasehi) - 1982) / 56;
          addYear = addMultiply * 56;
          newYear = intVal(thisYearMasehi) - addMultiply * 56;
        }
        */
        const newDateMasehi = dateAdd('d', x, newYear, intVal(thisMonthMasehi), intVal(thisDayMasehi));

        const arrNewDateMasehi = newDateMasehi.split('-');
        realYearMasehi = realYearMasehi + (addYear + intVal(arrNewDateMasehi[0]) - realYearMasehi);

        dateMasehiToHijriNow.push({
          masehi: formatReadDate(intVal(realYearMasehi), intVal(arrNewDateMasehi[1]), intVal(arrNewDateMasehi[2])),
          hijri: formatReadDate(intVal(arrDateHijri[0]), intVal(arrDateHijri[1]), intVal(arrDateHijri[2]) + x),
          daycount: daysCount[i],
        });
      }
    }

    const dateMasehiToHijri = {
      before: dateMasehiToHijriBefore,
      current: dateMasehiToHijriNow,
    };

    const combineDate = [
      ...dateMasehiToHijriBefore,
      ...dateMasehiToHijriNow
    ];

    this.CurrentYear[year] = year;
    this.DateMasehiToHijri[year] = dateMasehiToHijri;

    return combineDate;
  }

  public MasehiToHijri(
      dYear: number,
      dMonth: number,
      dDay: number,
      latitude: number = -6.9128,
      longitude: number = 107.6206,
      timezone: number = 7,
      altitude: number = 10,
  ) {
    const newDate = formatReadDate(dYear, dMonth, dDay);

    const currYear = this.CurrentYear[dYear];
    let dateMasehiToHijri: any;

    if (!currYear) {
      dateMasehiToHijri = this.Hisab(dYear, latitude, longitude, timezone, altitude);
    } else {
      dateMasehiToHijri = this.DateMasehiToHijri[dYear];
    }

    const arrDateBefore = dateMasehiToHijri.before;
    const arrDateCurrent = dateMasehiToHijri.current;

    const countArrBefore = arrDateBefore.length;
    const countArrCurrent = arrDateCurrent.length;

    let datReturn = '';
    let isFound = false;

    for (let i = 0; i < countArrCurrent; i++) {
      if (arrDateCurrent[i].masehi === newDate) {
        datReturn = arrDateCurrent[i].hijri;
        isFound = true;
        break;
      }
    }

    if (!isFound) {
      for (let i = 0; i < countArrBefore; i++) {
        if (arrDateBefore[i].masehi === newDate) {
          datReturn = arrDateBefore[i].hijri;
          isFound = true;
          break;
        }
      }
    }
    return datReturn;
  }

  public Imsakiyah(
      dYear: number,
      dMonth: number,
      dDay: number,
      latitude: number = -6.9128,
      longitude = 107.6206,
      timezone: number = 7,
      altitude: number = 10,
      Shubuh: number = 20,
      Thulu: number = 1,
      Dhuha: number = 4.5,
      Ihtiyat: number = 1,
      Dhuhur: number = 4,
      Ashar: number = 1,
      Isya: number = 18,
      Imsak: number = 10,
  ) {
    const DIP = (1.76 / 60) * Math.sqrt(altitude);
    const JamDeklinasiGMT = 5;
    const PI = 3.14159265358979323846;
    const Dr = PI / 180;
    const BulanHt = dMonth < 3 ? dMonth + 12 : dMonth;
    const TahunHt = dMonth < 3 ? dYear - 1 : dYear;
    const KRG = 2 - intVal(TahunHt / 100) + intVal(intVal(TahunHt / 100) / 4);
    const JD =
        intVal(365.25 * (TahunHt + 4716)) + intVal(30.6001 * (BulanHt + 1)) + dDay + JamDeklinasiGMT / 24 + KRG - 1524.5; // T11
    const T = (JD - 2451545) / 36525;
    const S1 = (280.46645 + 36000.76983 * T) / 360;
    const S = (S1 - intVal(S1)) * 360;
    const M1 = (357.5291 + 35999.0503 * T) / 360;
    const M = (M1 - intVal(M1)) * 360;
    const N1 = (125.04 - 1934.136 * T) / 360;
    const N1t = N1 < 0 ? -1 * roundUp(N1) : roundUp(N1);
    const N = (N1 - N1t) * 360;
    const Kr1 = (17.264 / 3600) * Math.sin(N * Dr) + (0.206 / 3600) * Math.sin(2 * N * Dr);
    const Kr2 = (-1.264 / 3600) * Math.sin(2 * S * Dr);
    const Kr3 = (9.23 / 3600) * Math.cos(N * Dr) - (0.09 / 3600) * Math.cos(2 * N * Dr);
    const Kr4 = (0.548 / 3600) * Math.cos(2 * S * Dr);
    const Qp = 23.43929111 + Kr3 + Kr4 - (46.815 / 3600) * T;
    const E =
        (6898.06 / 3600) * Math.sin(M * Dr) +
        (72.095 / 3600) * Math.sin(2 * M * Dr) +
        (0.966 / 3600) * Math.sin(3 * M * Dr);
    const Sp = mod(S + E + Kr1 + Kr2 - 20.47 / 3600, 360);
    const MailS = (Math.asin(Math.sin(Sp * Dr) * Math.sin(Qp * Dr)) * 180) / PI;
    const rQA = 0.5 * Qp;
    const rA = Math.pow(Math.tan(rQA * Dr), 2);
    const rE1 = 0.01675104 - 0.0000418 * T;
    const rE2 = 0.000000126 * T * T;
    const rE = rE1 + rE2;
    const rQ1 = rA * Math.sin(2 * S * Dr);
    const rQ2 = 2 * rE * Math.sin(M * Dr);
    const rQ3 = 4 * rE * rA * Math.sin(M * Dr) * Math.cos(2 * S * Dr);
    const rQ4 = 0.5 * rA * rA * Math.sin(4 * S * Dr);
    const rQ5 = 1.25 * rE * rE * Math.sin(2 * M * Dr);
    const rQ = rQ1 - rQ2 + rQ3 - rQ4 - rQ5;
    const rW = (rQ * 57.29577951) / 15;
    const Psd = 0.267 / (1 - 0.017 * Math.cos(M * Dr));
    const rF = -Math.tan(latitude * Dr) * Math.tan(MailS * Dr);
    const rG = Math.cos(latitude * Dr) * Math.cos(MailS * Dr);
    const lDhuhur = 12 - rW + (timezone * 15 - longitude) / 15;
    const lHa = (Math.atan(1 / (Math.tan(Math.abs(latitude - MailS) * Dr) + Ashar)) * 180) / PI;
    const lAshar = lDhuhur + (Math.acos(rF + Math.sin((lHa * PI) / 180) / rG) * 180) / PI / 15;
    const lHm = -(Psd + 34.5 / 60 + DIP) - 0.0024; // BJ11
    const lMaghrib = lDhuhur + (Math.acos(rF + Math.sin(lHm * Dr) / rG) * 180) / PI / 15;
    const lIsya = lDhuhur + (Math.acos(rF + Math.sin(-Isya * Dr) / rG) * 180) / PI / 15;
    const lShubuh = lDhuhur - (Math.acos(rF + Math.sin(-Shubuh * Dr) / rG) * 180) / PI / 15;
    const lImsak = lShubuh - Imsak / 60;
    const lSyuruq = lDhuhur - (Math.acos(rF + Math.sin(lHm * Dr) / rG) * 180) / PI / 15;
    const lDhuha = lDhuhur - (Math.acos(rF + Math.sin(Dhuha * Dr) / rG) * 180) / PI / 15;

    const rIMSAK = ceiling(lImsak / 24, 0.5 / 24 / 60) + Ihtiyat / 24 / 60;
    const rSHUBUH = ceiling(lShubuh / 24, 0.5 / 24 / 60) + Ihtiyat / 24 / 60;
    const rSYURUQ = lSyuruq / 24 - Ihtiyat / 24 / 60;
    const rDHUHA = ceiling(lDhuha / 24, 0.5 / 24 / 60) + Ihtiyat / 24 / 60;
    const rDHUHUR = ceiling(lDhuhur / 24, 0.5 / 24 / 60) + Dhuhur / 24 / 60;
    const rASHAR = ceiling(lAshar / 24, 0.5 / 24 / 60) + Ihtiyat / 24 / 60;
    const rMAGHRIB = ceiling(lMaghrib / 24, 0.5 / 24 / 60) + Ihtiyat / 24 / 60;
    const rISYA = ceiling(lIsya / 24, 0.5 / 24 / 60) + Ihtiyat / 24 / 60;

    const dateCalc = formatReadDate(dYear, dMonth, dDay);
    const curDateTime = new Date(dYear, dMonth - 1, dDay, 0, 0, 1, 0).getTime() / 1000;
    const dIMSAK = new Date((curDateTime + round(Math.floor(rIMSAK * 3600 * 24), 1)) * 1000);
    const dSHUBUH = new Date((curDateTime + round(Math.floor(rSHUBUH * 3600 * 24), 1)) * 1000);
    const dSYURUQ = new Date((curDateTime + round(Math.floor(rSYURUQ * 3600 * 24), 1)) * 1000);
    const dDHUHA = new Date((curDateTime + round(Math.floor(rDHUHA * 3600 * 24), 1)) * 1000);
    const dDHUHUR = new Date((curDateTime + round(Math.floor(rDHUHUR * 3600 * 24), 1)) * 1000);
    const dASHAR = new Date((curDateTime + round(Math.floor(rASHAR * 3600 * 24), 1)) * 1000);
    const dMAGHRIB = new Date((curDateTime + round(Math.floor(rMAGHRIB * 3600 * 24), 1)) * 1000);
    const dISYA = new Date((curDateTime + round(Math.floor(rISYA * 3600 * 24), 1)) * 1000);

    const tIMSAK = formatReadTime(dIMSAK);
    const tSHUBUH = formatReadTime(dSHUBUH);
    const tSYURUQ = formatReadTime(dSYURUQ);
    const tDHUHA = formatReadTime(dDHUHA);
    const tDHUHUR = formatReadTime(dDHUHUR);
    const tASHAR = formatReadTime(dASHAR);
    const tMAGHRIB = formatReadTime(dMAGHRIB);
    const tISYA = formatReadTime(dISYA);

    const result: ImsakiyahResult = {
      date: dateCalc,
      imsak: roundTime(tIMSAK),
      shubuh: roundTime(tSHUBUH),
      syuruq: roundTime(tSYURUQ),
      dhuha: roundTime(tDHUHA),
      dhuhur: roundTime(tDHUHUR),
      ashar: roundTime(tASHAR),
      maghrib: roundTime(tMAGHRIB),
      isya: roundTime(tISYA),
    };
    return result;
  }
}

export default Islam;
