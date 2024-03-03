import { models, model, Schema, Document } from "mongoose";

const PlayerSchema: Schema = new Schema(
  {
    playerName: {
      type: String,
    },
    displayName: {
      type: String,
    },
    pictureUrl: {
      type: String,
    },
    userLineId: {
      type: String,
      required: true,
      unique: true,
    },
    isOwner: {
      type: Boolean,
      default: false,
      required: true,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    // rotateSavingGroups: [{ type: Schema.Types.ObjectId, ref: 'RotateSavingGroup' }],
    // owners: [{ type: Schema.Types.ObjectId, ref: 'RotateSavingGroup' }],
  },
  { timestamps: true }
);


export interface IPlayer {
  _id?: Schema.Types.ObjectId;
  playerName?: string;
  displayName?: string;
  pictureUrl?: string;
  userLineId: string;
  isOwner?: boolean;
  first_name?: string;
  last_name?: string;
}


const PlayerModel = models.Player || model("Player", PlayerSchema);
export interface PlayerDocument extends IPlayer, Document {}

export default PlayerModel;
