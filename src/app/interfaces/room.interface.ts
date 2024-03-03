import dayjs from "dayjs";
import { Period, StatusGroup } from "../constants/enum";
import { BitTime, PlayerGroup } from "./global.interface";

export interface RotateSaingGroupType {
    _id: string;
    ownerId: PlayerGroup;
    groupLineId?: string;
    period?: Period;
    playerCount?: number;
    rotateAmount?: number;
    minBitAmount?: number;
    maxBitAmount?: number;
    systemRandomPlayer?: boolean;
    roomStatus?: StatusGroup;
    startPlayDate?: string | dayjs.Dayjs;
    bitTime?: BitTime;
    players?: PlayerGroup[];
  } 