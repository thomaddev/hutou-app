import dayjs from "dayjs";

export function convertDateToString(date: dayjs.Dayjs | undefined | string, format?: string): string {
  if (!date) return "";
  const convertToDate = dayjs(date);
  if (!convertToDate.isValid) return "";
  return convertToDate.format(format);
}

export function convertStringToDate(date: dayjs.Dayjs | string | undefined, format?: string): dayjs.Dayjs | string {
  if (!date) return "";
  const convertToDate = dayjs(date, format);
  if (!convertToDate.isValid) return "";
  return convertToDate;
}

export function convertTimeStringToHourMinute(time: string) {
  const regex = /^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/;
  if (!regex.test(time)) return null;
  const [hours, minutes] = time.split(":");
  return { h: hours, m: minutes };
}
