import dayjs from "dayjs";
import { DayOfMonth, DayOfWeek } from "../constants/enum";

export interface BitTime {
  dayOfWeek: DayOfWeek | undefined | null;
  time: string | dayjs.Dayjs;
  dayOfMonth: DayOfMonth | undefined | null;
}

export interface PlayerGroup {
  userLineId: string;
  displayName: string;
}
