import { formatReadDate } from './Helper';
class National {
  public TahunBaru(year: number) {
    return formatReadDate(year, 1, 1);
  }
  public Kemerdekaan(year: number) {
    return formatReadDate(year, 8, 17);
  }
  public Buruh(year: number) {
    return formatReadDate(year, 5, 1);
  }
  public Pancasila(year: number) {
    return formatReadDate(year, 6, 1);
  }
}
export default National;
