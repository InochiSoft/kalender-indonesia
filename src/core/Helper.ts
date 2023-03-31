export const intVal = (mixedVar: any, base: number = 10): number => {
  let tmp, match;
  const type = typeof mixedVar;
  if (type === 'boolean') {
    return +mixedVar;
  } else if (type === 'string') {
    if (base === 0) {
      match = mixedVar.match(/^\s*0(x?)/i);
      base = match ? (match[1] ? 16 : 8) : 10;
    }
    tmp = parseInt(mixedVar, base || 10);
    return isNaN(tmp) || !isFinite(tmp) ? 0 : tmp;
  } else if (type === 'number' && isFinite(mixedVar)) {
    return mixedVar < 0 ? Math.ceil(mixedVar) : Math.floor(mixedVar);
  } else {
    return 0;
  }
};

export const strPos = (haystack: string, needle: string, offset: number = 0): any => {
  let i = (haystack + '').indexOf(needle, offset || 0);
  return i === -1 ? false : i;
};

export const isNumeric = (n: any) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

export const daysInMonth = (month: number, year: number): number => {
  return month == 2 ? (year % 4 ? 28 : year % 100 ? 29 : year % 400 ? 28 : 29) : ((month - 1) % 7) % 2 ? 30 : 31;
};

export const intPart = (floatNum: number): number => {
  if (floatNum < -0.0000001) {
    return floatNum - 0.0000001;
  }
  return intVal(floatNum + 0.0000001);
};

export const roundUp = (dblValue: number): number => {
  const myDec = strPos(dblValue.toString(), '.');
  let strValue: number;
  if (myDec === false) {
    strValue = dblValue;
  } else {
    const arrSplit = dblValue.toString().split('.');
    strValue = intVal(arrSplit[0]) + 1;
  }
  return strValue;
};

export const mod = (val1: number, val2: number): number => {
  return val1 - val2 * intVal(val1 / val2);
};

export const ceiling = (val: number, significance: number = 1): any => {
  return isNumeric(val) && isNumeric(significance) ? Math.ceil(val / significance) * significance : false;
};

export const trunc = (value: any): number => {
  if (value == 0) return 0;
  let strValue: any;
  let myDec = strPos(value.toString(), '.');
  if (myDec === false) {
    myDec = strPos(value.toString(), ',');
    if (myDec === false) {
      strValue = value;
    } else {
      const $arrSplit = value.toString().split(',');
      strValue = $arrSplit[0];
    }
  } else {
    const $arrSplit = value.toString().split('.');
    strValue = $arrSplit[0];
  }
  return intVal(strValue);
};

export const round = (num: number, dec: number): number => {
  const num_sign = num >= 0 ? 1 : -1;
  return parseFloat((Math.round(num * Math.pow(10, dec) + num_sign * 0.0001) / Math.pow(10, dec)).toFixed(dec));
};

export const isDecimal = (val: number): boolean => {
  return isNumeric(val) && Math.floor(val) != val;
};

export const romance = (num: number): string => {
  let numeral = num;
  let result = '';
  const NUMBERS = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const ROMAN: { [key: number]: string } = {
    1: 'I',
    4: 'IV',
    5: 'V',
    9: 'IX',
    10: 'X',
    40: 'XL',
    50: 'L',
    90: 'XC',
    100: 'C',
    400: 'CD',
    500: 'D',
    900: 'CM',
    1000: 'M',
  };

  NUMBERS.map((numbers) => {
    if (numeral / numbers > 0) {
      let count = Math.floor(numeral / numbers);
      numeral -= count * numbers;
      while (count > 0) {
        result += ROMAN[numbers];
        count--;
      }
    }
  });

  return result;
};

export const leftPad = (value: number, len: number) => {
  let output = value + '';
  while (output.length < len) {
    output = '0' + output;
  }
  return output;
};

export const formatReadDate = (year: number, month: number, day: number): string => {
  return [year, ('0' + month).slice(-2), ('0' + day).slice(-2)].join('-');
};

export const formatReadTime = (date: Date): string => {
  return [
    ('0' + date.getHours()).slice(-2),
    ('0' + date.getMinutes()).slice(-2),
    ('0' + date.getSeconds()).slice(-2),
  ].join(':');
};

export const convertDate = (date: string): string => {
  const arrDate = date.split('-');
  const dDay = intVal(arrDate[2]);
  const dMonth = intVal(arrDate[1]);
  const dYear = intVal(arrDate[0]);

  let newYear = dYear;
  let addYear = 0;
  let addMultiply = 0;

  if (dYear >= 2038) {
    addMultiply = intVal((dYear - 1982) / 56);
    addYear = addMultiply * 56;
    newYear = dYear - addYear;
  }

  return formatReadDate(newYear, dMonth, dDay);
};

export const daysBetween = (date1: string, date2: string): number => {
  const arrStartDate = date1.split('-');
  const dStartDay = intVal(arrStartDate[2]);
  const dStartMonth = intVal(arrStartDate[1]);
  let dStartYear = intVal(arrStartDate[0]);

  const arrEndDate = date2.split('-');
  const dEndDay = intVal(arrEndDate[2]);
  const dEndMonth = intVal(arrEndDate[1]);
  let dEndYear = intVal(arrEndDate[0]);

  if (dEndYear >= 2038) {
    const addMultiplyEnd = intVal((dEndYear - 1982) / 56);
    const addYearEnd = addMultiplyEnd * 56;
    dEndYear -= addYearEnd;
  }

  if (dStartYear == 2037) {
    if (dEndYear == 2038 || dEndYear == 1982) {
      dStartYear = 1981;
    }
  }
  const startDate = `${dStartYear}-${dStartMonth}-${dStartDay}`;
  const endDate = `${dEndYear}-${dEndMonth}-${dEndDay}`;

  const sDate1 = convertDate(startDate);
  const sDate2 = convertDate(endDate);
  return Math.floor((Date.parse(sDate2) - Date.parse(sDate1)) / 86400000);
};

export const dateAdd = (interval: string, value: number, year: number, month: number, day: number): string => {
  switch (interval) {
    case 'y': // add year
      year += value;
      break;
    case 'm': // add month
      month += value;
      break;
    case 'd': // add days
      day += value;
      break;
    case 'w': // add week
      day += value * 7;
      break;
  }
  const resDate = new Date(year, month - 1, day);
  return formatReadDate(resDate.getFullYear(), resDate.getMonth() + 1, resDate.getDate());
};

export const roundTime = (time: string) => {
  const arrTime = time.split(':');
  let hour = intVal(arrTime[0]);
  let minute = intVal(arrTime[1]);
  let second = intVal(arrTime[2]);

  if (second >= 30) {
    minute += 1;
    second = 0;
  } else {
    second = 0;
  }

  if (minute >= 60) {
    minute = 0;
    hour += 1;
  }

  return [('0' + hour).slice(-2), ('0' + minute).slice(-2), ('0' + second).slice(-2)].join(':');
};

export const roundUpTime = (time: string) => {
  const arrTime = time.split(':');
  let hour = intVal(arrTime[0]);
  let minute = intVal(arrTime[1]);
  let second = intVal(arrTime[2]);

  if (second >= 30) minute += 1;

  if (minute >= 60) {
    minute = 0;
    hour += 1;
  }

  return [('0' + hour).slice(-2), ('0' + minute).slice(-2)].join(':');
};

export const mktime = (hour: number = 0, minute: number = 0, second: number = 0, month: number = 0, day: number = 0, year: number = 0): any => {
  return new Date(year, month - 1, day, hour, minute, second, 0);
};
