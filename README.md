# Kalender Indonesia
## Instalasi/Pemasangan
`
npm i kalender-indonesia
`

## Penggunaan
```javascript
const kalender = require('kalender-indonesia');
const { CalendarType } = require("kalender-indonesia/lib/opt");
const options = {
  timezone: 7,
  latitude: -6.9128,
  longitude: 107.6206,
  altitude: 10,
  weeklyFormat: true,
  include: {
  calendarTypes: [
    CalendarType.MASEHI,
    CalendarType.HIJRIYAH,
  ],
  addHolidays: [
    {
      date: '2023-09-09',
      name: 'birthday',
      description: 'Ulang Tahun'
    }
  ],
  addLeaves: [],
  remHolidays: [
    {
      date: '2023-01-01'
    }
  ],
  remLeaves: [],
  showHoliday: true,
  showLeave: true,
  showImsakiyah: false
  }
};
kalender.Options(options);
const masehi = kalender.KalenderMasehi(2023);
console.log('masehi', JSON.stringify(masehi));
```
## Donasi
[![Donasi](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/novian)

