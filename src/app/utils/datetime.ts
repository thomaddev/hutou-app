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
