import dbConnect from "@/app/libs/mongodb";
import PlayerModel, { IPlayer, PlayerDocument } from "./player.model";

export async function createPlayer(playerData: IPlayer): Promise<PlayerDocument> {
  try {
    await dbConnect();
    const checkExisted = await PlayerModel.findOne({ userLineId: playerData?.userLineId });
    if (checkExisted) {
      return checkExisted;
    }
    const newPlayer = await PlayerModel.create({
      isOwner: playerData?.isOwner,
      userLineId: playerData?.userLineId,
      pictureUrl: playerData?.pictureUrl,
      displayName: playerData?.displayName,
    });
    return newPlayer;
  } catch (error: any) {
    throw new Error("Could not create player: " + error.message);
  }
}
