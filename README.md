# Kalender Indonesia

Kalender Indonesia Masehi, Hijriyah dengan Libur Nasional tahun 1900 sampai 2100.

[![NPM Version][npm-version-image]][npm-url]
[![NPM Install Size][npm-install-size-image]][npm-install-size-url]
[![NPM Downloads][npm-downloads-image]][npm-downloads-url]

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
      CalendarType.MASEHI, // atau 0
      CalendarType.HIJRIYAH, // atau 1
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
const kalenderMasehi = kalender.KalenderMasehi(2023);
console.log('kalenderMasehi', JSON.stringify(kalenderMasehi));

const kalenderHijriyah = kalender.KalenderHijriyah(1444);
console.log('kalenderHijriyah', JSON.stringify(kalenderHijriyah));

const liburMasehi = kalender.LiburMasehi(2023);
console.log('liburMasehi', JSON.stringify(liburMasehi));

```
## Situs Web
[![KalenderIndonesia.Com][kalender-indonesia-banner]][kalender-indonesia-url]
[KalenderIndonesia.Com]([kalender-indonesia-url])

## Pengembang
[Agung Novian](mailto:pujanggabageur@gmail.com)

## Donasi
**PayPal**: [![PayPal](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/novian)

Crypto:

**ETH (ERC20)/BNB (BEP20)**: 0x12c930700efe92d466fece53eac424410b56f29a

**BTC**: 1NfrjEq4Ac6gTmcnAkEraFrAwoQ6MKQ4B8

Bank:

**BCA**: 8105216927



[npm-install-size-image]: https://badgen.net/packagephobia/install/kalender-indonesia
[npm-install-size-url]: https://packagephobia.com/result?p=kalender-indonesia
[npm-url]: https://npmjs.org/package/kalender-indonesia
[npm-version-image]: https://badgen.net/npm/v/kalender-indonesia
[npm-downloads-image]: https://badgen.net/npm/dm/kalender-indonesia
[npm-downloads-url]: https://npmcharts.com/compare/kalender-indonesia?minimal=true
[kalender-indonesia-banner]: https://kalenderindonesia.com/image/big-banner/year/month.png
[kalender-indonesia-url]: https://kalenderindonesia.com
