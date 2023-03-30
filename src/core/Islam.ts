import {dateAdd, daysBetween, daysInMonth, formatReadDate, intPart, intVal, mod, round, roundUp, trunc} from './Helper';

interface HisabResult {
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

class Islam {
  public IdulFitri: any = {};
  public IdulFitri2: any = {};
  public MaulidNabi: any = {};
  public IdulAdha: any = {};
  public IsraMiraj: any = {};
  public DateMasehiToHijri: any = {};
  public TahunHijriyah: number = 0;
  public TahunIdulFitri: number = 0;
  public TahunIdulAdha: number = 0;
  public TahunMaulidNabi: number = 0;
  public TahunBaruHijri: any = {};
  public CurrentYear: any = {};
  public DaysCount: number = 0;

  constructor(year: number = 0) {
  }

  public setTahunHijriyah(intResult: number) {
    this.TahunHijriyah = intResult;
  }

  public setTahunIdulFitri(intResult: number) {
    this.TahunIdulFitri = intResult;
  }

  public setTahunBaruHijri(intResult: string) {
    const arr = intResult.split('-');
    this.TahunBaruHijri = {
      year: arr[0],
      month: arr[1],
      day: arr[2],
    };
  }

  public setIdulFitri(intResult: string) {
    const arr = intResult.split('-');
    this.IdulFitri = {
      year: arr[0],
      month: arr[1],
      day: arr[2],
    };
  }

  public setIdulFitri2(intResult: string) {
    const arr = intResult.split('-');
    this.IdulFitri2 = {
      year: arr[0],
      month: arr[1],
      day: arr[2],
    };
  }

  public setMaulidNabi(intResult: string) {
    const arr = intResult.split('-');
    this.MaulidNabi = {
      year: arr[0],
      month: arr[1],
      day: arr[2],
    };
  }

  public setIdulAdha(intResult: string) {
    const arr = intResult.split('-');
    this.IdulAdha = {
      year: arr[0],
      month: arr[1],
      day: arr[2],
    };
  }

  public setIsraMiraj(intResult: string) {
    const arr = intResult.split('-');
    this.IsraMiraj = {
      year: arr[0],
      month: arr[1],
      day: arr[2],
    };
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
    JH[2] = intTHM2 % 4 == 0 || intTHM2 % 100 == 0 || intTHM2 % 400 == 0 ? 29 : 28;

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

    let intBulan1: number = intSisa < 31 ? 0 : intMatch;

    let intJmlHari: number = JLH[intBulan1];
    let intSisaHari: number = intSisa - intJmlHari;

    let dMasehi: number = intSisaHari == 0 ? JH[intBulan1] : intSisaHari;
    let mMasehi: number = intJmlHari == 0 ? intBulan1 : (intBulan1 + 1) % 12 == 0 ? 12 : (intBulan1 + 1) % 12;

    if (mMasehi == 0) mMasehi = 1;
    return formatReadDate(intVal(intTHM2), intVal(mMasehi), dMasehi);
  }

  public MasehiToHijriSincTemp(dYear: number, dMonth: number, dDay: number) {
    let intAW = 227016;
    let TA = [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
    let KA = [0, 2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29, 32];
    let JH = [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 354];

    let intMonth = dMonth < 3 ? dMonth + 12 : dMonth;
    let intYear = dMonth < 3 ? dYear - 1 : dYear;

    let intAM1 = intVal(365.25 * intYear) + intVal(30.60001 * (intMonth + 1)) + dDay - 428;
    let intB = intAM1 < 577748 ? 0 : 2 - intVal(intYear / 100) + intVal(intVal(intYear / 100) / 4);

    let intAM = intVal(365.25 * intYear) + intVal(30.60001 * (intMonth + 1)) + dDay + intB - 428;

    let intAH = intAM - intAW;
    let intThH1 = intVal(intAH / 354.3671);

    let intModDay1 = round(intAH - 354.3671 * intVal(intAH / 354.3671), 0.5);
    let intModDay2 = roundUp(intAH - 354.3671 * intVal(intAH / 354.3671));

    let intDayCount = intAH < 0 ? intModDay1 : intModDay2;
    let intAddYear = intVal(intDayCount / 365);

    let intTHM2 = intThH1 + intAddYear + 1;
    let intSisa = mod(intDayCount, 365);
    let intBulan1 = 0;

    for (let x = 1; x <= 12; x++) {
      if (intSisa >= JH[x - 1] && intSisa <= JH[x]) {
        intBulan1 = x - 1;
        break;
      }
    }

    let intJmlHari = JH[intBulan1];
    let intSisaHari = intSisa - intJmlHari;

    let dHijri = intSisaHari == 0 ? TA[intBulan1] : intSisaHari;
    let mHijri = intSisaHari == 0 ? intBulan1 : (intBulan1 + 1) % 12 == 0 ? 12 : (intBulan1 + 1) % 12;

    let yHijri = intTHM2;

    if (intSisaHari == 355) {
      dHijri = 1;
      yHijri = intTHM2 + 1;
    }
    return formatReadDate(intVal(yHijri), intVal(mHijri), dHijri);
  }

  public MasehiToHijriSinc(dYear: number, dMonth: number, dDay: number) {
    let newYear = dYear;
    let addYear = 0;
    let addMultiply = 0;

    if (dYear >= 2038) {
      addMultiply = intVal((dYear - 1982) / 56);
      addYear = addMultiply * 56;
      newYear = dYear - addMultiply * 56;
    }

    let dDateAfter = dateAdd('d', 1, newYear, dMonth, dDay);
    let arrDateAfter = dDateAfter.split('-');

    let intYearDate = intVal(arrDateAfter[0]) + addYear;
    let intMonthDate = intVal(arrDateAfter[1]);
    let intDayDate = intVal(arrDateAfter[2]);

    let M2JNow = this.MasehiToHijriSincTemp(dYear, dMonth, dDay);
    let arrM2JNow = M2JNow.split('-');

    let M2JAfter = this.MasehiToHijriSincTemp(intYearDate, intMonthDate, intDayDate);
    let arrM2JAfter = M2JAfter.split('-');

    let lastResultDay: number = intVal(arrM2JNow[2]);

    if (intVal(arrM2JNow[1]) == 1) {
      if (intVal(arrM2JNow[2]) == intVal(arrM2JAfter[2])) {
        lastResultDay = 30;
      }
    }
    return formatReadDate(intVal(arrM2JNow[0]), intVal(arrM2JNow[1]), lastResultDay);
  }

  public getHisab(index: number = 0, yMasehi: number = 0, yHijri: number = 0, mLastMonth: number = 0, addMonth: number = 0, lintang: number = -6.9128, bujur: number = 107.6206, timezone: number = 7, tinggi: number = 10,) {
    let result: HisabResult = {
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

    let timezoneconv = timezone * 15;
    let pilihanimkan = 2;
    let imkanurrukyah1 = 2; //C8

    let Ir = pilihanimkan == 1 ? 0.1 : imkanurrukyah1;
    //--Derajat Bandung--//

    let akhirbulan = mLastMonth; //C13
    let mHijri = 0;

    switch (index) {
      case 0:
        let datHijri: string = this.MasehiToHijriSinc(yMasehi, 1, 1);
        let arrHijri = datHijri.split('-');

        // let dHijri = arrHijri[2];
        mHijri = intVal(arrHijri[1]);
        yHijri = intVal(arrHijri[0]);

        akhirbulan = mHijri == 1 ? 12 : mHijri - 1; //C13
        yHijri = mHijri == 1 ? yHijri - 1 : yHijri; //C12
        break;
      case 1:
        yHijri = akhirbulan == 12 ? yHijri + addMonth : yHijri;
        akhirbulan = mod(akhirbulan + addMonth, 12) == 0 ? 12 : mod(akhirbulan + addMonth, 12);
        break;
      default:
        yHijri = akhirbulan == 12 ? yHijri + 1 : yHijri;
        akhirbulan = mod(akhirbulan + 1, 12) == 0 ? 12 : mod(akhirbulan + 1, 12);
        break;
    }

    // result['Index'] = index;
    // result['LastHijriYear'] = yHijri;
    // result['LastHijriMonth'] = akhirbulan;

    result.index = index;
    result.last_hijri_year = yHijri;
    result.last_hijri_month = akhirbulan;

    const arrIRP = [0, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 2, 2, 0.1, 2, 0.1];
    let ImkanPilihan = pilihanimkan == 3 ? arrIRP[akhirbulan] : Ir; // IF(G3=3,VLOOKUP(C13,Irp,3),Ir)

    //------------------------------Ijtimak-------------------------------------//
    let PI = 3.14159265358979323846;
    let Dr = 180 / PI; //57.29577951;

    let HY = yHijri + (akhirbulan * 29.53) / 354.3671;

    let K = Math.ceil((HY - 1410) * 12); //C17
    let T = round(K / 1200, 10); //C18
    let tJD1 = round(29.53058868 * K, 6);
    //tJD2 = T ^ 2;
    let tJD2 = Math.pow(T, 2);
    let tJD3 = 0.0001178 * tJD2;
    let JD = round(2447740.652 + tJD1 + tJD3, 6); //C19
    let tM1a = round(29.10535608 * K, 6);
    let tM1b = 207.9587074;
    //tM1c = T ^ 2;
    let tM1c = Math.pow(T, 2);
    let tM1d = -0.0000333 * tM1c;
    let tM1e = tM1a + tM1b + tM1d;
    let M1 = round(tM1e / 360, 10); //C20
    //M = (M1 - intVal(M1)) * 360;
    let tM = M1 - intVal(M1);
    let M = tM * 360; //C21

    let tMq1a = round(385.81691806 * K, 6);
    let tMq1b = 111.1791307;
    //tMq1c = T ^ 2;
    let tMq1c = Math.pow(T, 2);
    let tMq1d = 0.0107306 * tMq1c;
    let tMq1e = tMq1a + tMq1b + tMq1d;
    let Mq1 = tMq1e / 360; //C22

    let tMq = Mq1 - intVal(Mq1);
    let Mq = tMq * 360; //C23

    let tF1a = round(390.67050646 * K, 6);
    let tF1b = 164.2162296;
    //tF1c = T ^ 2;
    let tF1c = Math.pow(T, 2);
    let tF1d = -0.0016528 * tF1c;
    let tF1e = tF1a + tF1b + tF1d;

    let F1 = tF1e / 360; //C24
    let tF = F1 - intVal(F1);
    let F = tF * 360; //C25

    let T1 = (0.1734 - 0.000395 * T) * Math.sin(M / Dr); //C26
    let T2 = 0.0021 * Math.sin((2 * M) / Dr); //C27
    let T3 = -0.4068 * Math.sin(Mq / Dr); //C28
    let T4 = 0.0161 * Math.sin((2 * Mq) / Dr); //C29
    let T5 = -0.0004 * Math.sin((3 * Mq) / Dr); //C30
    let T6 = 0.0104 * Math.sin((2 * F) / Dr); //C31
    let T7 = -0.0051 * Math.sin(M / Dr + Mq / Dr); //C32
    let T8 = -0.0074 * Math.sin(M / Dr - Mq / Dr); //C33
    let T9 = 0.0004 * Math.sin((2 * F) / Dr + M / Dr); //C34
    let T10 = -0.0004 * Math.sin((2 * F) / Dr - M / Dr); //C35
    let T11 = -0.0006 * Math.sin((2 * F) / Dr + Mq / Dr); //C36
    let T12 = 0.001 * Math.sin((2 * F) / Dr - Mq / Dr); //C37
    let T13 = 0.0005 * Math.sin(M / Dr + (2 * Mq) / Dr); //C38
    let MT = T1 + T2 + T3 + T4 + T5 + T6 + T7 + T8 + T9 + T10 + T11 + T12 + T13; //C39

    let JDIjtimak = round(JD + 0.5 + MT, 6); //C40
    let WIq = JDIjtimak - intPart(JDIjtimak); //C41
    let WI = WIq * 24; //C42
    // let WD = mod(WI + timezone, 24);									//C43

    let Z = intVal(JDIjtimak); //C45
    let tAA = Z - 1867216.25;
    let AA = intVal(tAA / 36524.25); //C46
    let A = Z < 2299161 ? Z : Z + 1 + AA - intVal(AA / 4); //C47
    let B = A + 1524; //C48
    let C = intVal((B - 122.1) / 365.25); //C49
    let D = intVal(365.25 * C); //C50
    let E = intVal((B - D) / 30.6001); //C51

    let TglMUT = intVal(B - D - intVal(30.6001 * E)); //C52
    let BlnMUT = E > 13.5 ? E - 13 : E - 1; //C53
    let ThnMUT = BlnMUT < 2.5 ? C - 4715 : C - 4716; //C53

    // let PA = WI + timezone > 24 ? Z + 3 : Z + 2;
    // let Hari = mod(PA, 7);
    // let Pasar = mod(PA, 5);

    let newYear = ThnMUT;
    let addYear = 0;
    let addMultiply = 0;

    if (ThnMUT >= 2038) {
      addMultiply = intVal((ThnMUT - 1982) / 56);
      addYear = addMultiply * 56;
      newYear = ThnMUT - addYear;
    }

    const datFull = new Date(newYear, BlnMUT - 1, TglMUT, WI + timezone, 0, 0, 0);
    //let datFull = getdate(mktime(WI + timezone, 0, 0, BlnMUT, TglMUT, newYear));
    /*
    let TglM = datFull['mday'];									//C59
    let BlnM = datFull['mon'];									//C60
    let ThnM = datFull['year'] + addYear;						//C61
    */
    let TglM = datFull.getDate(); //C59
    let BlnM = datFull.getMonth() + 1; //C60
    let ThnM = datFull.getFullYear() + addYear; //C61

    //------------------------------Ijtimak-------------------------------------//

    //---------------------Ghurub dan Syuruq Matahari---------------------------//

    JD =
        trunc(1461 * ((ThnM + 4800 + (BlnM - 14) / 12) / 4)) -
        trunc((3 / 400) * (ThnM + 4900 + (BlnM - 14) / 12)) +
        TglM -
        31709.5; //C73

    T = (JD - 2451545) / 36525; //C74
    let L = 279.69668 + 36000.76892 * T + 0.0003025 * Math.pow(T, 2); //C75
    let G = 358.47583 + 35999.04975 * T - 0.00015 * Math.pow(T, 2) - 0.0000033 * Math.pow(T, 3); //C76
    let R = 0.01675104 - 0.0000418 * T - 0.000000126 * Math.pow(T, 2); //C77
    C =
        L +
        (1.91946 - 0.004789 * T - 0.000014 * Math.pow(T, 2)) * Math.sin((G * PI) / 180) +
        (0.020094 - 0.0001 * T) * Math.sin((2 * G * PI) / 180) +
        0.000293 * Math.sin((3 * G * PI) / 180); //C78

    let mailkulli = 23.452294 - 0.0130125 * T - 0.00000164 * Math.pow(T, 2) + 0.000000503 * Math.pow(T, 3); //C79
    let declinasimthr = (Math.asin(Math.sin((mailkulli * PI) / 180) * Math.sin((C * PI) / 180)) * 180) / PI; //C80
    let tX = Math.tan(((mailkulli / 2) * PI) / 180);
    let X = Math.pow(tX, 2); //C81
    let Tafawwut =
        ((X * Math.sin((2 * L * PI) / 180) -
            2 * R * Math.sin((G * PI) / 180) +
            4 * R * X * Math.sin((G * PI) / 180) * Math.cos((2 * L * PI) / 180) -
            0.5 * Math.pow(X, 2) * Math.sin((4 * L * PI) / 180) -
            (5 / 4) * Math.pow(R, 2) * Math.sin((2 * G * PI) / 180)) *
            180) /
        PI /
        15; //C82
    let WaktuZawal = 12 - Tafawwut + (timezoneconv - bujur) / 15; //C83
    let N = -Math.tan((lintang * PI) / 180) * Math.tan((declinasimthr * PI) / 180); //C84
    let U = Math.cos((lintang * PI) / 180) * Math.cos((declinasimthr * PI) / 180); //C85
    let W = (Math.acos(N + Math.sin((-1 * PI) / 180) / U) * 180) / PI / 15; //C86
    let GhurubMthr2 = WaktuZawal + W; //C88
    let GhurubMthr1 = GhurubMthr2 - timezone; //C87

    // let Zawal1 =  12 - Tafawwut + (timezoneconv - bujur) / 15;							//C90
    // let Zawal2 = -Math.tan(lintang * PI / 180) * Math.tan(declinasimthr * PI / 180);				//C91
    // let Zawal3 = Math.cos(lintang * PI / 180) * Math.cos(declinasimthr * PI / 180);				//C92
    // let Zawal4 = (357.5291 + 35999.0503 * T) / 360;												//C93
    // let Zawal5 =(Zawal4 - intVal(Zawal4)) * 360;													//C94
    // let Zawal6 = 0.267 / (1 - 0.017 * Math.cos(Zawal5 * PI / 180));									//C95
    // let Zawal7 = 1.76 / 60 * Math.sqrt(tinggi);														//C96
    // let Zawal8 = -(Zawal6 + (34.5 / 60) + Zawal7);												//C97

    // let Syuruq = Zawal1 - Math.acos(Zawal2 + Math.sin((Zawal8 - 0.0024) * PI / 180) / Zawal3) * 180 / PI / 15; //C98

    let Tanggal = TglM; //C101

    let Bulan = BlnM < 3 ? BlnM + 12 : BlnM; //C102
    let Tahun = BlnM < 3 ? ThnM - 1 : ThnM; //C103
    let GrbMatahariTqrb = GhurubMthr1; //C104

    let B2 = 2 - intVal(Tahun / 100) + intVal(intVal(Tahun / 100) / 4); //C106
    let JD2 =
        intVal(365.25 * (Tahun + 4716)) + intVal(30.6001 * (Bulan + 1)) + Tanggal + GrbMatahariTqrb / 24 + B2 - 1524.5; //C107
    T2 = (JD2 - 2451545) / 36525; //C108

    //---------------------Ghurub dan Syuruq Matahari---------------------------//

    //---------------------Harokat Matahari---------------------------//
    let S1 = (280.46645 + 36000.76983 * T2) / 360; //C111
    let S = (S1 - intVal(S1)) * 360; //C112
    M1 = (357.5291 + 35999.0503 * T2) / 360; //C113
    M = (M1 - intVal(M1)) * 360; //C114
    let N1 = (125.04 - 1934.136 * T2) / 360; //C115
    // let tN = intVal(N1);
    N = (N1 - intVal(N1)) * 360; //C116

    let Kr1 = (17.264 / 3600) * Math.sin(N / Dr) + (0.206 / 3600) * Math.sin((2 * N) / Dr); //C117
    let Kr2 = (-1.264 / 3600) * Math.sin((2 * S) / Dr); //C118
    let Kr3 = (9.23 / 3600) * Math.cos(N / Dr) - (0.09 / 3600) * Math.cos((2 * N) / Dr); //C119
    let Kr4 = (0.548 / 3600) * Math.cos((2 * S) / Dr); //C120
    let Qq = 23.43929111 + Kr3 + Kr4 - (46.815 / 3600) * T2; //C121
    E =
        (6898.06 / 3600) * Math.sin(M / Dr) +
        (72.095 / 3600) * //C122
        Math.sin((2 * M) / Dr) +
        (0.966 / 3600) * Math.sin((3 * M) / Dr);
    let Sq = mod(S + E + Kr1 + Kr2 - 20.47 / 3600, 360); //C123
    let MailS = (Math.asin(Math.sin(Sq / Dr) * Math.sin(Qq / Dr)) * 180) / PI; //C124
    let Pta = (Math.atan(Math.tan(Sq / Dr) * Math.cos(Qq / Dr)) * 180) / PI; //C125

    //Sq: 251.43275349321

    let Ptb = Sq >= 0 && Sq <= 90 ? Pta : 0; //C126
    let Ptc = Sq >= 90 && Sq <= 270 ? Pta + 180 : 0; //C127
    let Ptd = Sq >= 270 && Sq <= 360 ? Pta + 360 : 0; //C128

    let PT = Ptb + Ptc + Ptd; //SUM(Ptb:Ptd);												//C129
    // let PTuntukE = (Math.abs(S - PT) > 5) ? PT + 360 : PT;											//C130
    // let xe = (S - PTuntukE) / 15;																//C131
    let xsd = 0.267 / (1 - 0.017 * Math.cos(M / Dr)); //C132
    let Dip = (1.76 / 60) * Math.sqrt(tinggi); //C133
    let xh = -(xsd + 34.5 / 60 + Dip); //C134
    let xt =
        (Math.acos(
            -Math.tan(lintang / Dr) * Math.tan(MailS / Dr) +
            Math.sin(xh / Dr) / Math.cos(lintang / Dr) / Math.cos(MailS / Dr),
            ) *
            180) /
        PI; //C135
    // let GhurubLMT = xt / 15 + (12 - xe);															//C136
    // let GhurubLT = GhurubLMT + (timezoneconv - bujur) / 15;								//C137

    //---------------------Harokat Matahari---------------------------//

    //---------------------Harokat Bulan---------------------------//
    M1 = (218.31617 + 481267.88088 * T2) / 360; //C140
    let HM = (M1 - intVal(M1)) * 360; //C141
    let A1 = (134.96292 + 477198.86753 * T2) / 360; //C142
    A = mod((A1 - intVal(A1)) * 360, 360); //C143
    F1 = (93.27283 + 483202.01873 * T2) / 360; //C144
    F = (F1 - intVal(F1)) * 360; //C145
    let D1 = (297.85027 + 445267.11135 * T2) / 360; //C146
    D = (D1 - intVal(D1)) * 360; //C147
    T1 = (22640 / 3600) * Math.sin(A / Dr); //C148
    T2 = (-4586 / 3600) * Math.sin((A - 2 * D) / Dr); //C149
    T3 = (2370 / 3600) * Math.sin((2 * D) / Dr); //C150
    T4 = (769 / 3600) * Math.sin((2 * A) / Dr); //C151
    T5 = (-668 / 3600) * Math.sin(M / Dr); //C152
    T6 = (-412 / 3600) * Math.sin((2 * F) / Dr); //C153
    T7 = (-212 / 3600) * Math.sin((2 * A - 2 * D) / Dr); //C154
    T8 = (-206 / 3600) * Math.sin((A + M - 2 * D) / Dr); //C155
    T9 = (192 / 3600) * Math.sin((A + 2 * D) / Dr); //C156
    T10 = (-165 / 3600) * Math.sin((M - 2 * D) / Dr); //C157
    T11 = (148 / 3600) * Math.sin((A - M) / Dr); //C158
    T12 = (-125 / 3600) * Math.sin(D / Dr); //C159
    T13 = (-110 / 3600) * Math.sin((A + M) / Dr); //C160
    let T14 = (-55 / 3600) * Math.sin((2 * F - 2 * D) / Dr); //C161
    C = T1 + T2 + T3 + T4 + T5 + T6 + T7 + T8 + T9 + T10 + T11 + T12 + T13 + T14; //C162
    let Mo = HM + C + Kr1 + Kr2 - 20.47 / 3600; //C163

    let Aq = A + T2 + T3 + T5; //C164
    let Lq =
        (18461 / 3600) * Math.sin(F / Dr) +
        (1010 / 3600) * Math.sin((A + F) / Dr) +
        (1000 / 3600) * Math.sin((A - F) / Dr) -
        (624 / 3600) * Math.sin((F - 2 * D) / Dr) -
        (199 / 3600) * Math.sin((A - F - 2 * D) / Dr) -
        (167 / 3600) * Math.sin((A + F - 2 * D) / Dr); //C165
    let x = (Math.atan(Math.sin(Mo / Dr) * Math.tan(Qq / Dr)) * 180) / PI; //C166
    let y = Lq + x; //C167
    let nc = (Math.asin((Math.sin(Mo / Dr) * Math.sin(Qq / Dr) * Math.sin(y / Dr)) / Math.sin(x / Dr)) * 180) / PI; //C168
    let Ptca = (Math.acos((Math.cos(Mo / Dr) * Math.cos(Lq / Dr)) / Math.cos(nc / Dr)) * 180) / PI; //C169
    let Ptcb = Mo >= 0 && Mo <= 180 ? Ptca : 0; //C170
    let Ptcc = Mo >= 180 && Mo <= 360 ? 360 - Ptca : 0; //C171
    let PTc = Ptcb + Ptcc; //C172
    let tc = mod(PT - PTc + xt, 360); //C173
    let hc =
        (Math.asin(
            Math.sin(lintang / Dr) * Math.sin(nc / Dr) + Math.cos(lintang / Dr) * Math.cos(nc / Dr) * Math.cos(tc / Dr),
            ) *
            180) /
        PI; //C174
    let xp = (384401 * (1 - Math.pow(0.0549, 2))) / (1 + 0.0549 * Math.cos((Aq + T1) / Dr)); //C175
    let HP = 0.9507 / (xp / 384401); //C176
    let sdc = 0.5181 / (xp / 384401) / 2; //C177
    let P = HP * Math.cos(hc / Dr); //C178
    let Ref = 0.0167 / Math.tan((hc + 7.31 / (hc + 4.4)) / Dr); //C179
    let hcqa = hc < 0 || hc - P < 0 ? hc - P : 0; //C180
    let hcqb = hc - P > 0 ? hc - P + sdc + Ref + Dip : 0; //C181
    let hcq = hcqa + hcqb; //C182
    // let Umur = (GhurubLT - WD);																		//C183
    // let Azm1 = Math.atan(((-Math.sin(lintang / Dr) / Math.tan(xt / Dr))
    //    + Math.cos(lintang / Dr) * Math.tan(MailS / Dr) / Math.sin(xt / Dr))) * 180 / PI + 270;			//C184
    // let Azm2 = Math.atan(((-Math.sin(lintang / Dr) / Math.tan(xt / Dr))
    //    + Math.cos(lintang / Dr) * Math.tan(MailS / Dr) / Math.sin(xt / Dr))) * 180 / PI;					//C185
    // let Azc1 = Math.atan(((-Math.sin(lintang / Dr) / Math.tan(tc / Dr))
    //    + Math.cos(lintang / Dr) * Math.tan(nc / Dr) / Math.sin(tc / Dr))) * 180 / PI + 270; 				//C186
    // let Azc2 = Math.atan(((-Math.sin(lintang / Dr) / Math.tan(tc / Dr))
    //    + Math.cos(lintang / Dr) * Math.tan(nc / Dr) / Math.sin(tc / Dr))) * 180 / PI;	 					//C187

    // let z = Math.abs(Azc1 - Azm1); 																		//C188
    // let Dc = PTc < PT ? ((PTc + 360) - PT)/15 : (PTc - PT)/15; 									//C189
    // let AL = Math.acos(Math.cos(Math.abs(hcq - xh) / Dr) * Math.cos(Math.abs(Azc1 - Azm1) / Dr)) * 180 / PI; 			//C190
    // let Cw = (1 - Math.cos(AL / Dr)) * sdc * 60; 														//C191
    // let EL = Math.acos(Math.cos((Mo - Sq) / Dr) * Math.cos(Lq / Dr)) * 180 / PI; 								//C192
    // let FIa = Math.acos(-Math.cos(EL / Dr)) * 180 / PI;														//C193
    // let FI = ((1 + Math.cos(FIa / Dr)) / 2) * 100;														//C194
    // let Ms = GhurubLT + Dc;																			//C195
    // let GhurubHilal = mod(Ms,24);																//C196
    // let Mukuts = hcq < 0 ? 0 : hcq * 4 / 60;															//C197
    // let Ra = 1.00014 - 0.01671 * Math.cos(M / Dr) - 0.00014 * Math.cos((2 * M) / Dr); //C198
    // R = Ra * 149597870;

    //---------------------Harokat Bulan---------------------------//

    let TambahHari = hcq >= ImkanPilihan ? 1 : 2; //C206
    let BulanHijri = mod(akhirbulan + 1, 12);
    let TahunHijri = akhirbulan == 12 ? yHijri + 1 : yHijri;

    let arrJumlahBulan = [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    arrJumlahBulan[2] = daysInMonth(BlnM, ThnM);
    let tTanggalAwal =
        TglM + TambahHari > arrJumlahBulan[BlnM] ? TglM + TambahHari - arrJumlahBulan[BlnM] : TglM + TambahHari; //C212
    let tBulanAwal = TglM + TambahHari > arrJumlahBulan[BlnM] ? mod(BlnM + 1, 12) : mod(BlnM, 12); //C213
    let tTahunAwal = TglM + TambahHari > 31 && BlnM == 12 ? ThnM + 1 : ThnM; //C214

    let TanggalAwal = tTanggalAwal;
    let BulanAwal = tBulanAwal == 0 ? 12 : tBulanAwal;
    let TahunAwal = tTahunAwal;

    addMonth = TglM < 3 && BlnM == 12 ? 1 : 0;

    if (BulanHijri == 0) BulanHijri = 12;

    // if (mHijri == 0) mHijri = 12;

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

    // console.log('result-getHisab:', result);
    return result;
  }

  public calcHisab(year: number, lintang: number, bujur: number, timezone: number, tinggi = 10){
    const result: HisabResult[] = [];

    for (let i = 0; i <= 15; i++){
      let itemResult: HisabResult = {
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

    result[0] = this.getHisab(0, year, 0, 0, 0, lintang, bujur, timezone, tinggi);

    let yHijri = result[0].last_hijri_year;
    let mHijri = result[0].last_hijri_month;
    let addMonth = result[0].add_month;

    for (let i = 1; i <= 15; i++){
      result[i].days_count = 0;

      yHijri = result[i - 1].last_hijri_year;
      mHijri = result[i - 1].last_hijri_month;
      addMonth = result[i - 1].add_month;

      result[i] = this.getHisab(i, year, yHijri, mHijri, addMonth, lintang, bujur, timezone, tinggi);

      const startDate = result[i - 1].masehi_date;
      const endDate = result[i].masehi_date;

      result[i - 1].days_count = daysBetween(startDate, endDate);
    }

    return result;
  }

  public createHisab(year: number, lintang: number = -6.9128, bujur: number = 107.6206, timezone: number = 7, tinggi: number = 10){
    const yearBefore = year - 1;
    const hisabBefore = this.calcHisab(yearBefore, lintang, bujur, timezone, tinggi);
    const daysCount: number[] = [];
    const startDateMasehi: string[] = [];
    const startDateHijri: string[] = [];
    const dateMasehiToHijriBefore: any[] = [];
    const dateMasehiToHijriNow: any[] = [];

    for (let i = 2; i < 16; i++){
      daysCount.push(0);
      startDateMasehi.push('');
    }

    for (let i = 2; i < 16; i++){
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

      if (intVal(arrDateHijri[1]) == 0){
        arrDateHijri[1] = '12';
      }

      let newYear: number = intVal(thisYearMasehi);
      let addYear = 0;
      let addMultiply = 0;

      if (intVal(thisYearMasehi) >= 2038){
        addMultiply = (intVal(thisYearMasehi) - 1982) / 56;
        addYear = addMultiply * 56;
        newYear = intVal(thisYearMasehi) - (addMultiply * 56);
      }

      for (let x = 0; x < daysCount[i]; x++){
        const newDateMasehi = dateAdd('d', x, newYear, intVal(thisMonthMasehi), intVal(thisDayMasehi));
        const arrNewDateMasehi = newDateMasehi.split('-');

        realYearMasehi = realYearMasehi + (addYear + intVal(arrNewDateMasehi[0]) - realYearMasehi);

        if (i < 15){
          dateMasehiToHijriBefore.push({
            masehi: formatReadDate(intVal(realYearMasehi), intVal(arrNewDateMasehi[1]), intVal(arrNewDateMasehi[2])),
            hijri: formatReadDate(intVal(arrDateHijri[0]), intVal(arrDateHijri[1]), intVal(arrDateHijri[2]) + x),
            daycount: daysCount[i]
          });
        }
      }
    }

    //-- YEAR CURRENT --//
    const hisabNow = this.calcHisab(year, lintang, bujur, timezone, tinggi);

    for (let i = 2; i < 15; i++){
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

      if (intVal(arrDateHijri[1]) == 0){
        arrDateHijri[1] = '12';
      }

      for (let x = 0; x < daysCount[i]; x++){
        let newYear: number = intVal(thisYearMasehi);
        let addYear = 0;
        let addMultiply = 0;

        if (intVal(thisYearMasehi) >= 2038){
          addMultiply = (intVal(thisYearMasehi) - 1982) / 56;
          addYear = addMultiply * 56;
          newYear = intVal(thisYearMasehi) - (addMultiply * 56);
        }

        let newDateMasehi = dateAdd('d', x, newYear, intVal(thisMonthMasehi), intVal(thisDayMasehi));

        let arrNewDateMasehi = newDateMasehi.split('-');
        realYearMasehi = realYearMasehi + (addYear + intVal(arrNewDateMasehi[0]) - realYearMasehi);

        dateMasehiToHijriNow.push({
          masehi: formatReadDate(intVal(realYearMasehi), intVal(arrNewDateMasehi[1]), intVal(arrNewDateMasehi[2])),
          hijri: formatReadDate(intVal(arrDateHijri[0]), intVal(arrDateHijri[1]), intVal(arrDateHijri[2]) + x),
          daycount: daysCount[i]
        });
      }
    }

    //console.log('dateMasehiToHijriBefore-createHisab:', dateMasehiToHijriBefore);
    //console.log('dateMasehiToHijriNow-createHisab:', dateMasehiToHijriNow);

    const dateMasehiToHijri = {
      before: dateMasehiToHijriBefore,
      current: dateMasehiToHijriNow,
    }

    this.CurrentYear[year] = year;
    this.DateMasehiToHijri[year] = dateMasehiToHijri;

    //this.CurrentYear.push({[year]: year});
    //this.DateMasehiToHijri.push({[year]: dateMasehiToHijri});

    return dateMasehiToHijri;
  }

  public MasehiToHijri(dYear: number, dMonth: number, dDay: number, lintang: number = -6.9128, bujur: number = 107.6206, timezone: number = 7, tinggi: number = 10, Shubuch: number = 20, Thulu: number = 1, Dhucha: number = 4.5, Ihtiyat: number = 1, Dhuhur: number = 4, Ashar: number = 1, Isya: number = 18, Imsak: number = 10){
    const newDate = formatReadDate(dYear, dMonth, dDay);

    const currYear = this.CurrentYear[dYear];
    let dateMasehiToHijri: any;

    if (!currYear){
      dateMasehiToHijri = this.createHisab(dYear, lintang, bujur, timezone, tinggi);
    } else {
      dateMasehiToHijri = this.DateMasehiToHijri[dYear];
    }

    const arrDateBefore = dateMasehiToHijri.before;
    const arrDateCurrent = dateMasehiToHijri.current;

    const countArrBefore = arrDateBefore.length;
    const countArrCurrent = arrDateCurrent.length;

    let datReturn = '';
    let isFound = false;

    for (let i = 0; i < countArrCurrent; i++){
      if (arrDateCurrent[i].masehi == newDate){
        datReturn = arrDateCurrent[i].hijri;
        isFound = true;
        break;
      }
    }

    if (!isFound){
      for (let i = 0; i < countArrBefore; i++){
        if (arrDateBefore[i].masehi == newDate){
          datReturn = arrDateBefore[i].hijri;
          isFound = true;
          break;
        }
      }
    }
    return datReturn;
  }

}

export default Islam;
