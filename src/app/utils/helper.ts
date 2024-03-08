import { DayOfMonth, DayOfWeek, Period, StatusGroup } from "../constants/enum";

export const periodOptions = Object.entries(Period).map(([key, value]) => ({
  label: key,
  value: value as Period,
}));

export const statusGroupOptions = Object.entries(StatusGroup).map(([key, value]) => ({
  label: key,
  value: value as StatusGroup,
}));

export const dayOyWeekOptions = Object.entries(DayOfWeek).map(([key, value]) => ({
  label: key,
  value: value as DayOfWeek,
}));

export const dayOyMonthOptions = Object.entries(DayOfMonth).map(([key, value]) => ({
  label: key,
  value: value as DayOfMonth,
}));
