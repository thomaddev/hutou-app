import { DayOfMonth, DayOfWeek, Period, StatusGroup } from "../constants/enum";

export const periodOptions = Object.keys(Period).map((key) => ({
  label: key,
  value: Period[key],
}));

export const statusGroupOptions = Object.keys(StatusGroup).map((key) => ({
  label: key,
  value: StatusGroup[key],
}));

export const dayOyWeekOptions = Object.keys(DayOfWeek).map((key) => ({
  label: key,
  value: DayOfWeek[key],
}));

export const dayOyMonthOptions = Object.keys(DayOfMonth).map((key) => ({
  label: key,
  value: DayOfMonth[key],
}));
