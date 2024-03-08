import { models, model, Schema, Date, Document } from "mongoose";
import { DayOfMonth, DayOfWeek, Period, StatusGroup } from "@/app/constants/enum";
import { BitTime, PlayerGroup } from "@/app/interfaces/global.interface";

const RotateSavingGroupSchema: Schema = new Schema(
  {
    ownerId: {
      userLineId: { type: String },
      displayName: { type: String },
    },
    groupLineId: {
      type: String,
    },
    period: {
      type: String,
      enum: Period,
      // required: true,
    },
    playerCount: {
      type: Number,
      // required: true,
    },
    rotateAmount: {
      type: Number,
      // required: true,
      default: 100,
    },
    minBitAmount: {
      type: Number,
      // required: true,
      default: 0,
    },
    maxBitAmount: {
      type: Number,
      // required: true,
      default: 0,
    },
    systemRandomPlayer: {
      type: Boolean,
      default: true,
    },
    roomStatus: {
      type: String,
      enum: StatusGroup,
      default: StatusGroup.CREATED,
    },
    startPlayDate: {
      type: Date,
    },
    bitTime: {
      dayOfWeek: { type: String, enum: DayOfWeek },
      time: { type: String }, // Format: HH:MM (24-hour format)
      dayOfMonth: { type: String, enum: DayOfMonth }, // For monthly period
    },
    players: [
      {
        userLineId: { type: String },
        displayName: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export interface IRotateSavingGroup {
  ownerId: PlayerGroup;
  groupLineId?: string;
  period?: Period;
  playerCount?: number;
  rotateAmount?: number;
  minBitAmount?: number;
  maxBitAmount?: number;
  systemRandomPlayer?: boolean;
  roomStatus?: StatusGroup;
  startPlayDate?: Date;
  bitTime?: BitTime;
  players?: PlayerGroup[];
}

const RotateSavingGroupModel = model<IRotateSavingGroup>("RotateSavingGroup", RotateSavingGroupSchema);

export interface RotateSavingGroupDocument extends IRotateSavingGroup, Document {}

export default RotateSavingGroupModel;
