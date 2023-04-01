import {dateAdd, intVal} from './Helper';
import {CalendarOptions, CalendarType, DefaultCalendarOption, HolidayType, Include} from "../opt";
import Islam from "./Islam";
import Buddha from "./Buddha";
import Hindu from "./Hindu";
import China from "./China";
import Christian from "./Christian";
import National from "./National";

class Calendar {
  private islam = new Islam();
  private buddha = new Buddha();
  private hindu = new Hindu();
  private china = new China();
  private christian = new Christian();
  private national = new National();
  private options?: CalendarOptions;
  private defaultOptions = DefaultCalendarOption;

  constructor(options?: CalendarOptions) {
    if (!options) {
      this.options = this.defaultOptions;
    } else {
      this.options = options;
    }
  }

  public KalenderMasehi(year: number, month: number = 0, day: number = 0) {
    const include: Include = {
      calendarTypes: this.options?.include?.calendarTypes ?? this.defaultOptions.include?.calendarTypes,
      showHoliday: this.options?.include?.showHoliday ?? this.defaultOptions.include?.showHoliday,
      showLeave: this.options?.include?.showLeave ?? this.defaultOptions.include?.showLeave,
      showImsakiyah: this.options?.include?.showImsakiyah ?? this.defaultOptions.include?.showImsakiyah,
      addHolidays: this.options?.include?.addHolidays ?? this.defaultOptions.include?.addHolidays,
      addLeaves: this.options?.include?.addLeaves ?? this.defaultOptions.include?.addLeaves,
      remHolidays: this.options?.include?.remHolidays ?? this.defaultOptions.include?.remHolidays,
      remLeaves: this.options?.include?.remLeaves ?? this.defaultOptions.include?.remLeaves,
    }
    const months: any[] = [];
    let startMonth = month - 1;
    let endMonth = month;

    if (month === 0) {
      startMonth = 0;
      endMonth = 12;
    }

    const options: CalendarOptions = {
      timezone: this.options?.timezone ?? this.defaultOptions.timezone,
      latitude: this.options?.latitude ?? this.defaultOptions.latitude,
      longitude: this.options?.longitude ?? this.defaultOptions.longitude,
      altitude: this.options?.altitude ?? this.defaultOptions.altitude,
      weeklyFormat: this.options?.weeklyFormat ?? this.defaultOptions.weeklyFormat,
      include
    }

    const nationalBuruh = this.national.Buruh(year);
    const nationalKemerdekaan = this.national.Kemerdekaan(year);
    const nationalPancasila = this.national.Pancasila(year);
    const nationalTahunBaru = this.national.TahunBaru(year);

    const christianNatal = this.christian.Natal(year);
    const christianKenaikan = this.christian.Kenaikan(year);
    const christianWafat = this.christian.Wafat(year);

    const buddhaWaisak = this.buddha.Waisak(year);
    const tahunWaisak = this.buddha.Tahun(year);
    const hinduNyepi = this.hindu.Nyepi(year);
    const tahunNyepi = this.hindu.Tahun(year);

    const chinaImlek = this.china.Imlek(year);
    const tahunImlek = this.china.Tahun(year);
    const shioImlek = this.china.Shio(year);
    const elemenImlek = this.china.Elemen(year);

    const hisab = this.islam.Hisab(year, options.latitude, options.longitude, options.timezone, options.altitude);

    for (let m = startMonth; m < endMonth; m++) {
      const dates: any[] = [];
      const firstMonthDate = new Date(year, m, 1, options.timezone);
      const lastMonthDate = new Date(year, m + 1, 0, options.timezone);
      const firstWeek = firstMonthDate.getDay();
      const lastWeek = lastMonthDate.getDay();

      let firstDate = dateAdd('d', 0, year, m + 1, 1);
      let lastDate = dateAdd('d', 0, year, m + 2, 0);

      if (options.weeklyFormat) {
        firstDate = dateAdd('d', -firstWeek, year, m + 1, 1);
        lastDate = dateAdd('d', 6 - lastWeek, year, m + 2, 0);
      }

      if (day > 0) {
        firstDate = dateAdd('d', 0, year, m + 1, day);
        lastDate = firstDate;
      }

      const arrFirstDate = firstDate.split('-');
      const yearFirstDate = intVal(arrFirstDate[0]);
      const monthFirstDate = intVal(arrFirstDate[1]);
      const dayFirstDate = intVal(arrFirstDate[2]);
      let leaveCount = 0;

      for (let d = 0; d < 43; d++) {
        const itemDate = dateAdd('d', d, yearFirstDate, monthFirstDate, dayFirstDate);
        const itemHisab = hisab.filter((el) => el.masehi === itemDate);
        const masehiDate = itemHisab[0].masehi;
        const hijriDate = itemHisab[0].hijri;
        const dayCount = itemHisab[0].daycount;

        const resultDate: any = {}

        const arrMasehiDate = masehiDate.split('-');
        const yearMasehiDate = intVal(arrMasehiDate[0]);
        const monthMasehiDate = intVal(arrMasehiDate[1]);
        const dayMasehiDate = intVal(arrMasehiDate[2]);

        const arrHijriDate = hijriDate.split('-');
        const yearHijriDate = intVal(arrHijriDate[0]);
        const monthHijriDate = intVal(arrHijriDate[1]);
        const dayHijriDate = intVal(arrHijriDate[2]);

        const dateMasehi = new Date(yearMasehiDate, monthMasehiDate - 1, dayMasehiDate, options.timezone);
        const weekDay = dateMasehi.getDay();
        resultDate.day = weekDay;
        resultDate.masehi = masehiDate;
        resultDate.holidays = [];
        resultDate.leaves = [];

        options.include?.calendarTypes?.forEach((e: CalendarType) => {
          if (e === CalendarType.HIJRIYAH) {
            resultDate.hijri = hijriDate
          }
        });

        if (options.include?.showHoliday) {
          if (masehiDate === nationalTahunBaru) {
            resultDate.holidays.push({
              date: masehiDate,
              type: HolidayType.ORIGINAL,
              name: 'tahun_baru_masehi',
              year,
            });
          }
          if (masehiDate === nationalBuruh) {
            resultDate.holidays.push({
              date: masehiDate,
              type: HolidayType.ORIGINAL,
              name: 'buruh_nasional',
              year,
            });
          }
          if (masehiDate === nationalPancasila) {
            resultDate.holidays.push({
              date: masehiDate,
              type: HolidayType.ORIGINAL,
              name: 'pancasila',
              year,
            });
          }
          if (masehiDate === nationalKemerdekaan) {
            resultDate.holidays.push({
              date: masehiDate,
              type: HolidayType.ORIGINAL,
              name: 'kemerdekaan',
              year,
              age: year - 1945,
            });
          }
          if (masehiDate === christianNatal) {
            resultDate.holidays.push({
              date: masehiDate,
              type: HolidayType.ORIGINAL,
              name: 'natal',
              year,
            });
          }
          if (masehiDate === christianWafat) {
            resultDate.holidays.push({
              date: masehiDate,
              type: HolidayType.ORIGINAL,
              name: 'wafat_isa',
              year,
            });
          }
          if (masehiDate === christianKenaikan) {
            resultDate.holidays.push({
              date: masehiDate,
              type: HolidayType.ORIGINAL,
              name: 'kenaikan_isa',
              year,
            });
          }
          if (masehiDate === hinduNyepi) {
            resultDate.holidays.push({
              date: masehiDate,
              type: HolidayType.ORIGINAL,
              name: 'nyepi',
              year,
              age: tahunNyepi,
            });
          }
          if (masehiDate === buddhaWaisak) {
            resultDate.holidays.push({
              date: masehiDate,
              type: HolidayType.ORIGINAL,
              name: 'waisak',
              year,
              age: tahunWaisak,
            });
          }
          if (masehiDate === chinaImlek) {
            resultDate.holidays.push({
              date: masehiDate,
              type: HolidayType.ORIGINAL,
              name: 'imlek',
              year,
              age: tahunImlek,
              shio: shioImlek,
              element: elemenImlek,
            });
          }
          switch (monthHijriDate) {
            case 1:
              switch (dayHijriDate) {
                case 1:
                  resultDate.holidays.push({
                    date: masehiDate,
                    type: HolidayType.ORIGINAL,
                    name: 'tahun_baru_islam',
                    year,
                    age: yearHijriDate
                  });
                  break;
              }
              break;
            case 3:
              switch (dayHijriDate) {
                case 12:
                  resultDate.holidays.push({
                    date: masehiDate,
                    type: HolidayType.ORIGINAL,
                    name: 'maulid_nabi',
                    year,
                    age: yearHijriDate
                  });
                  break;
              }
              break;
            case 7:
              switch (dayHijriDate) {
                case 27:
                  resultDate.holidays.push({
                    date: masehiDate,
                    type: HolidayType.ORIGINAL,
                    name: 'isra_miraj',
                    year,
                    age: yearHijriDate
                  });
                  break;
              }
              break;
            case 10:
              switch (dayHijriDate) {
                case 1:
                  resultDate.holidays.push({
                    date: masehiDate,
                    type: HolidayType.ORIGINAL,
                    name: 'idul_fitri',
                    year,
                    age: yearHijriDate
                  });
                  break;
                case 2:
                  resultDate.holidays.push({
                    date: masehiDate,
                    type: HolidayType.ORIGINAL,
                    name: 'idul_fitri',
                    year,
                    age: yearHijriDate
                  });
                  break;
              }
              break;
            case 12:
              switch (dayHijriDate) {
                case 10:
                  resultDate.holidays.push({
                    date: masehiDate,
                    type: HolidayType.ORIGINAL,
                    name: 'idul_adha',
                    year,
                    age: yearHijriDate
                  });
                  break;
              }
              break;
          }
        }

        if (options.include?.showLeave) {
          switch (monthHijriDate) {
            case 10:
              switch (dayHijriDate) {
                case 3:
                  if (weekDay >= 1 && weekDay <= 5){
                    resultDate.leaves.push({
                      date: masehiDate,
                      type: HolidayType.ORIGINAL,
                      name: 'idul_fitri',
                      year,
                      age: yearHijriDate
                    });
                    leaveCount += 1;
                  }
                  break;
                case 4:
                  if (weekDay >= 1 && weekDay <= 5){
                    resultDate.leaves.push({
                      date: masehiDate,
                      type: HolidayType.ORIGINAL,
                      name: 'idul_fitri',
                      year,
                      age: yearHijriDate
                    });
                  }
                  leaveCount += 1;
                  break;
              }
              break;
            case 9:
              if (dayHijriDate === dayCount - 1) {
                if (weekDay === 1){
                  if (leaveCount > 3) {
                    resultDate.leaves.push({
                      date: masehiDate,
                      type: HolidayType.ORIGINAL,
                      name: 'idul_fitri',
                      year,
                      age: yearHijriDate
                    });
                    leaveCount += 1;
                  }
                }
              }
              if (dayHijriDate === dayCount) {
                if (weekDay === 1 || weekDay === 2 || weekDay === 4 || weekDay === 5){
                  resultDate.leaves.push({
                    date: masehiDate,
                    type: HolidayType.ORIGINAL,
                    name: 'idul_fitri',
                    year,
                    age: yearHijriDate
                  });
                  leaveCount += 1;
                }
              }
              break;
          }
        }

        if (options.include?.addHolidays) {
          if (options.include?.addHolidays.length > 0) {
            for (const newHoliday of options.include?.addHolidays){
              if (masehiDate === newHoliday.date) {
                resultDate.holidays.push({
                  date: masehiDate,
                  name: newHoliday.name ?? '',
                  year,
                  type: newHoliday.type ?? HolidayType.ADDITIONAL,
                  description: newHoliday.description ?? '',
                });
              }
            }
          }
        }

        if (options.include?.remHolidays) {
          if (options.include?.remHolidays.length > 0) {
            if (resultDate.holidays) {
              if (resultDate.holidays.length > 0) {
                for (const aHoliday of resultDate.holidays) {
                  for (const remHoliday of options.include?.remHolidays){
                    if (aHoliday.date === remHoliday.date) {
                      delete resultDate.holiday;
                    }
                  }
                }
              }
            }
          }
        }

        if (options.include?.remLeaves) {
          if (options.include?.remLeaves.length > 0) {
            if (resultDate.leaves) {
              if (resultDate.leaves.length > 0) {
                for (const aLeave of resultDate.leaves) {
                  for (const remLeave of options.include?.remLeaves){
                    if (aLeave.date === remLeave.date) {
                      delete resultDate.leave;
                    }
                  }
                }
              }
            }
          }
        }

        if (resultDate.holidays.length == 0) {
          delete resultDate.holidays;
        }

        if (resultDate.leaves.length == 0) {
          delete resultDate.leaves;
        }

        if (resultDate.holidays) {
          if (resultDate.holidays.length > 0) {
            for (const aHoliday of resultDate.holidays) {
              delete aHoliday.date;
            }
          }
        }

        if (resultDate.leaves) {
          if (resultDate.leaves.length > 0) {
            for (const aLeave of resultDate.leaves) {
              delete aLeave.date;
            }
          }
        }

        dates.push(resultDate);
        if (itemDate === lastDate) break;
      }
      months.push({
        month: m + 1,
        dates
      });
    }
    return { request: { year, month, day }, options, data: months };
  }

  public LiburMasehi(year: number, month: number = 0, day: number = 0) {
    const include: Include = {
      calendarTypes: this.options?.include?.calendarTypes ?? this.defaultOptions.include?.calendarTypes,
      showHoliday: this.options?.include?.showHoliday ?? this.defaultOptions.include?.showHoliday,
      showLeave: this.options?.include?.showLeave ?? this.defaultOptions.include?.showLeave,
      showImsakiyah: this.options?.include?.showImsakiyah ?? this.defaultOptions.include?.showImsakiyah,
      addHolidays: this.options?.include?.addHolidays ?? this.defaultOptions.include?.addHolidays,
      addLeaves: this.options?.include?.addLeaves ?? this.defaultOptions.include?.addLeaves,
      remHolidays: this.options?.include?.remHolidays ?? this.defaultOptions.include?.remHolidays,
      remLeaves: this.options?.include?.remLeaves ?? this.defaultOptions.include?.remLeaves,
    }
    const months: any[] = [];
    let startMonth = month - 1;
    let endMonth = month;

    if (month === 0) {
      startMonth = 0;
      endMonth = 12;
    }

    const options: CalendarOptions = {
      timezone: this.options?.timezone ?? this.defaultOptions.timezone,
      latitude: this.options?.latitude ?? this.defaultOptions.latitude,
      longitude: this.options?.longitude ?? this.defaultOptions.longitude,
      altitude: this.options?.altitude ?? this.defaultOptions.altitude,
      weeklyFormat: this.options?.weeklyFormat ?? this.defaultOptions.weeklyFormat,
      include
    }

    const nationalBuruh = this.national.Buruh(year);
    const nationalKemerdekaan = this.national.Kemerdekaan(year);
    const nationalPancasila = this.national.Pancasila(year);
    const nationalTahunBaru = this.national.TahunBaru(year);

    const christianNatal = this.christian.Natal(year);
    const christianKenaikan = this.christian.Kenaikan(year);
    const christianWafat = this.christian.Wafat(year);

    const buddhaWaisak = this.buddha.Waisak(year);
    const tahunWaisak = this.buddha.Tahun(year);
    const hinduNyepi = this.hindu.Nyepi(year);
    const tahunNyepi = this.hindu.Tahun(year);

    const chinaImlek = this.china.Imlek(year);
    const tahunImlek = this.china.Tahun(year);
    const shioImlek = this.china.Shio(year);
    const elemenImlek = this.china.Elemen(year);

    const hisab = this.islam.Hisab(year, options.latitude, options.longitude, options.timezone, options.altitude);

    for (let m = startMonth; m < endMonth; m++) {
      const holidays: any[] = [];
      const leaves: any[] = [];

      let firstDate = dateAdd('d', 0, year, m + 1, 1);
      let lastDate = dateAdd('d', 0, year, m + 2, 0);

      if (day > 0) {
        firstDate = dateAdd('d', 0, year, m + 1, day);
        lastDate = firstDate;
      }

      const arrFirstDate = firstDate.split('-');
      const yearFirstDate = intVal(arrFirstDate[0]);
      const monthFirstDate = intVal(arrFirstDate[1]);
      const dayFirstDate = intVal(arrFirstDate[2]);
      let leaveCount = 0;

      for (let d = 0; d < 43; d++) {
        const itemDate = dateAdd('d', d, yearFirstDate, monthFirstDate, dayFirstDate);
        const itemHisab = hisab.filter((el) => el.masehi === itemDate);
        const masehiDate = itemHisab[0].masehi;
        const hijriDate = itemHisab[0].hijri;
        const dayCount = itemHisab[0].daycount;

        const resultDate: any = {}

        const arrMasehiDate = masehiDate.split('-');
        const yearMasehiDate = intVal(arrMasehiDate[0]);
        const monthMasehiDate = intVal(arrMasehiDate[1]);
        const dayMasehiDate = intVal(arrMasehiDate[2]);

        const arrHijriDate = hijriDate.split('-');
        const yearHijriDate = intVal(arrHijriDate[0]);
        const monthHijriDate = intVal(arrHijriDate[1]);
        const dayHijriDate = intVal(arrHijriDate[2]);

        const dateMasehi = new Date(yearMasehiDate, monthMasehiDate - 1, dayMasehiDate, options.timezone);
        const weekDay = dateMasehi.getDay();
        resultDate.day = weekDay;
        resultDate.masehi = masehiDate;
        resultDate.holidays = [];
        resultDate.leaves = [];
        if (masehiDate === nationalTahunBaru) {
          resultDate.holidays.push({
            date: masehiDate,
            type: HolidayType.ORIGINAL,
            name: 'tahun_baru_masehi',
            year,
          });
        }
        if (masehiDate === nationalBuruh) {
          resultDate.holidays.push({
            date: masehiDate,
            type: HolidayType.ORIGINAL,
            name: 'buruh_nasional',
            year,
          });
        }
        if (masehiDate === nationalPancasila) {
          resultDate.holidays.push({
            date: masehiDate,
            type: HolidayType.ORIGINAL,
            name: 'pancasila',
            year,
          });
        }
        if (masehiDate === nationalKemerdekaan) {
          resultDate.holidays.push({
            date: masehiDate,
            type: HolidayType.ORIGINAL,
            name: 'kemerdekaan',
            year,
            age: year - 1945,
          });
        }
        if (masehiDate === christianNatal) {
          resultDate.holidays.push({
            date: masehiDate,
            type: HolidayType.ORIGINAL,
            name: 'natal',
            year,
          });
        }
        if (masehiDate === christianWafat) {
          resultDate.holidays.push({
            date: masehiDate,
            type: HolidayType.ORIGINAL,
            name: 'wafat_isa',
            year,
          });
        }
        if (masehiDate === christianKenaikan) {
          resultDate.holidays.push({
            date: masehiDate,
            type: HolidayType.ORIGINAL,
            name: 'kenaikan_isa',
            year,
          });
        }
        if (masehiDate === hinduNyepi) {
          resultDate.holidays.push({
            date: masehiDate,
            type: HolidayType.ORIGINAL,
            name: 'nyepi',
            year,
            age: tahunNyepi,
          });
        }
        if (masehiDate === buddhaWaisak) {
          resultDate.holidays.push({
            date: masehiDate,
            type: HolidayType.ORIGINAL,
            name: 'waisak',
            year,
            age: tahunWaisak,
          });
        }
        if (masehiDate === chinaImlek) {
          resultDate.holidays.push({
            date: masehiDate,
            type: HolidayType.ORIGINAL,
            name: 'imlek',
            year,
            age: tahunImlek,
            shio: shioImlek,
            element: elemenImlek,
          });
        }
        switch (monthHijriDate) {
          case 1:
            switch (dayHijriDate) {
              case 1:
                resultDate.holidays.push({
                  date: masehiDate,
                  type: HolidayType.ORIGINAL,
                  name: 'tahun_baru_islam',
                  year,
                  age: yearHijriDate
                });
                break;
            }
            break;
          case 3:
            switch (dayHijriDate) {
              case 12:
                resultDate.holidays.push({
                  date: masehiDate,
                  type: HolidayType.ORIGINAL,
                  name: 'maulid_nabi',
                  year,
                  age: yearHijriDate
                });
                break;
            }
            break;
          case 7:
            switch (dayHijriDate) {
              case 27:
                resultDate.holidays.push({
                  date: masehiDate,
                  type: HolidayType.ORIGINAL,
                  name: 'isra_miraj',
                  year,
                  age: yearHijriDate
                });
                break;
            }
            break;
          case 10:
            switch (dayHijriDate) {
              case 1:
                resultDate.holidays.push({
                  date: masehiDate,
                  type: HolidayType.ORIGINAL,
                  name: 'idul_fitri',
                  year,
                  age: yearHijriDate
                });
                break;
              case 2:
                resultDate.holidays.push({
                  date: masehiDate,
                  type: HolidayType.ORIGINAL,
                  name: 'idul_fitri',
                  year,
                  age: yearHijriDate
                });
                break;
            }
            break;
          case 12:
            switch (dayHijriDate) {
              case 10:
                resultDate.holidays.push({
                  date: masehiDate,
                  type: HolidayType.ORIGINAL,
                  name: 'idul_adha',
                  year,
                  age: yearHijriDate
                });
                break;
            }
            break;
        }

        if (options.include?.showLeave) {
          switch (monthHijriDate) {
            case 10:
              switch (dayHijriDate) {
                case 3:
                  if (weekDay >= 1 && weekDay <= 5){
                    resultDate.leaves.push({
                      date: masehiDate,
                      type: HolidayType.ORIGINAL,
                      name: 'idul_fitri',
                      year,
                      age: yearHijriDate
                    });
                    leaveCount += 1;
                  }
                  break;
                case 4:
                  if (weekDay >= 1 && weekDay <= 5){
                    resultDate.leaves.push({
                      date: masehiDate,
                      type: HolidayType.ORIGINAL,
                      name: 'idul_fitri',
                      year,
                      age: yearHijriDate
                    });
                  }
                  leaveCount += 1;
                  break;
              }
              break;
            case 9:
              if (dayHijriDate === dayCount - 1) {
                if (weekDay === 1){
                  if (leaveCount > 3) {
                    resultDate.leaves.push({
                      date: masehiDate,
                      type: HolidayType.ORIGINAL,
                      name: 'idul_fitri',
                      year,
                      age: yearHijriDate
                    });
                    leaveCount += 1;
                  }
                }
              }
              if (dayHijriDate === dayCount) {
                if (weekDay === 1 || weekDay === 2 || weekDay === 4 || weekDay === 5){
                  resultDate.leaves.push({
                    date: masehiDate,
                    type: HolidayType.ORIGINAL,
                    name: 'idul_fitri',
                    year,
                    age: yearHijriDate
                  });
                  leaveCount += 1;
                }
              }
              break;
          }
        }

        if (options.include?.addHolidays) {
          if (options.include?.addHolidays.length > 0) {
            for (const newHoliday of options.include?.addHolidays){
              if (masehiDate === newHoliday.date) {
                resultDate.holidays.push({
                  date: masehiDate,
                  name: newHoliday.name ?? '',
                  year,
                  type: newHoliday.type ?? HolidayType.ADDITIONAL,
                  description: newHoliday.description ?? '',
                });
              }
            }
          }
        }

        if (options.include?.remHolidays) {
          if (options.include?.remHolidays.length > 0) {
            if (resultDate.holidays) {
              if (resultDate.holidays.length > 0) {
                for (const aHoliday of resultDate.holidays) {
                  for (const remHoliday of options.include?.remHolidays){
                    if (aHoliday.date === remHoliday.date) {
                      delete resultDate.holiday;
                    }
                  }
                }
              }
            }
          }
        }

        if (options.include?.remLeaves) {
          if (options.include?.remLeaves.length > 0) {
            if (resultDate.leaves) {
              if (resultDate.leaves.length > 0) {
                for (const aLeave of resultDate.leaves) {
                  for (const remLeave of options.include?.remLeaves){
                    if (aLeave.date === remLeave.date) {
                      delete resultDate.leave;
                    }
                  }
                }
              }
            }
          }
        }

        if (resultDate.holidays.length > 0) {
          holidays.push(resultDate);
        }

        if (resultDate.leaves.length > 0) {
          leaves.push(resultDate);
        }

        if (resultDate.holidays.length == 0) {
          delete resultDate.holidays;
        }

        if (resultDate.holidays.leaves == 0) {
          delete resultDate.holidays;
        }

        if (itemDate === lastDate) break;
      }

      let itemResult: any = {
        month: m + 1,
        holidays,
        leaves
      }

      if (!options.include?.showLeave) {
        itemResult = {
          month: m + 1,
          holidays,
          leaves
        }
      }

      months.push(itemResult);
    }

    return { request: { year, month, day }, options, data: months };
  }

  public MasehiKeHijriyah(year: number, month: number, day: number) {
    const options: CalendarOptions = {
      timezone: this.options?.timezone ?? this.defaultOptions.timezone,
      latitude: this.options?.latitude ?? this.defaultOptions.latitude,
      longitude: this.options?.longitude ?? this.defaultOptions.longitude,
      altitude: this.options?.altitude ?? this.defaultOptions.altitude
    }
    return this.islam.MasehiToHijri(year, month, day, options.latitude, options.longitude, options.timezone, options.altitude)
  }

  public HijriyahKeMasehi(year: number, month: number, day: number) {
    return this.islam.HijriToMasehi(year, month, day);
  }

  public Imsakiyah(year: number, month: number, day: number, shubuh: number = 20, thulu: number = 1, dhuha: number = 4.5, ihtiyat: number = 1, dhuhur: number = 4, ashar: number = 1, isya: number = 18, imsak: number = 10) {
    const options: CalendarOptions = {
      timezone: this.options?.timezone ?? this.defaultOptions.timezone,
      latitude: this.options?.latitude ?? this.defaultOptions.latitude,
      longitude: this.options?.longitude ?? this.defaultOptions.longitude,
      altitude: this.options?.altitude ?? this.defaultOptions.altitude
    }
    return this.islam.Imsakiyah(
      year,
      month,
      day,
      options.latitude,
      options.longitude,
      options.timezone,
      options.altitude,
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

  public Waisak(year: number) {
    return this.buddha.Waisak(year);
  };

  public TahunBuddha(year: number) {
    return this.buddha.Tahun(year);
  };

  public Nyepi(year: number) {
    return this.hindu.Nyepi(year);
  };

  public TahunWaisak(year: number) {
    return this.hindu.Tahun(year);
  };

  public Imlek(year: number) {
    return this.china.Imlek(year);
  };

  public TahunImlek(year: number) {
    return this.china.Tahun(year);
  };

  public ShioImlek(year: number) {
    return this.china.Shio(year);
  };

  public ElementImlek(year: number) {
    return this.china.Elemen(year);
  };

  public TahunBaru(year: number) {
    return this.national.TahunBaru(year);
  };

  public Kemerdekaan(year: number) {
    return this.national.Kemerdekaan(year);
  };

  public Buruh(year: number) {
    return this.national.Buruh(year);
  };

  public Pancasila(year: number) {
    return this.national.Pancasila(year);
  };

  public Paskah(year: number) {
    return this.christian.Paskah(year);
  };

  public WafatIsa(year: number) {
    return this.christian.Wafat(year);
  };

  public KenaikanIsa(year: number) {
    return this.christian.Kenaikan(year);
  };

  public Natal(year: number) {
    return this.christian.Natal(year);
  };

}
export default Calendar
