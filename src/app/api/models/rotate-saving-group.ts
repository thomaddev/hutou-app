import { models, model, Schema } from "mongoose";
import PlayerModel from "./player";

const RotateSavingGroupSchema: Schema = new Schema(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: PlayerModel },
    groupLineId: {
      type: String,
    },
    period: {
      type: String,
      enum: ["day", "week", "month"],
      required: true,
    },
    playerCount: {
      type: Number,
      required: true,
    },
    rotateAmount: {
      type: Number,
      required: true,
      default: 100,
    },
    minBitAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    maxBitAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    systemRandomPlayer: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["OPENED", "PLAYING", "CLOSED"],
      default: "OPENED",
    },
    startPlayDate: {
      type: Date,
    },
    bit_time: {
      type: {
        dayOfWeek: { type: String, enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
        time: { type: String }, // Format: HH:MM (24-hour format)
        dayOfMonth: { type: String, enum: ["begin", "end"] }, // For monthly period
      },
      required: true,
    },
    players: [{ type: Schema.Types.ObjectId, ref: PlayerModel }],
  },
  { timestamps: true }
);

const RotateSavingGroupModel = models.RotateSavingGroup || model("RotateSavingGroup", RotateSavingGroupSchema);

export default RotateSavingGroupModel;
