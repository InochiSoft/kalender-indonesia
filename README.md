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
    addLeaves: [
      {
        date: '2023-09-10',
        name: 'birthday',
        description: 'Cuti Ulang Tahun'
      }
    ],
    remHolidays: [
      {
        date: '2023-01-01'
      }
    ],
    remLeaves: [
      {
        date: '2023-05-05'
      }
    ],
    showHoliday: true,
    showLeave: true,
    showImsakiyah: true
  }
};
kalender.Options(options);
const masehi = kalender.KalenderMasehi(2023);
console.log('masehi', JSON.stringify(masehi));
```
## Situs Web
[KalenderIndonesia.Com](https://kalenderindonesia.com)

## Pengembang
[Agung Novian](mailto:pujanggabageur@gmail.com)

## Donasi
**PayPal**: [![PayPal](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/novian)

Crypto:

**ETH (ERC20)/BNB (BEP20)**: 0x12c930700efe92d466fece53eac424410b56f29a

**BTC**: 1NfrjEq4Ac6gTmcnAkEraFrAwoQ6MKQ4B8

Bank:

**BCA**: 8105216927
