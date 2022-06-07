class DateService {
  public static DateToString(date: Date) {
    return (
      ('0' + date.getDate()).slice(-2) +
      '-' +
      ('0' + date.getMonth()).slice(-2) +
      '-' +
      date.getFullYear()
    );
  }
  public static DateReset(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
}

export default DateService;
