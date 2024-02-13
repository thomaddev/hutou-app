import { models, model, Schema } from "mongoose";

const PlayerSchema: Schema = new Schema(
  {
    playerName: {
      type: String,
      required: true,
    },
    lineId: {
      type: String,
      required: true,
      unique: true,
    },
    rotateSavingGroups: [{ type: Schema.Types.ObjectId, ref: 'RotateSavingGroup' }],
    owners: [{ type: Schema.Types.ObjectId, ref: 'RotateSavingGroup' }],
  },
  { timestamps: true },
  
);

const PlayerModel = models.Player || model("Player", PlayerSchema);

export default PlayerModel;
