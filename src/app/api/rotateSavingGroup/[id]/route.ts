import dbConnect from "@/app/libs/mongodb";
import RotateSavingGroupModel from "@/app/api/services/rotate-saving-group/rotate-saving-group.model";
import { startRoomPlay } from "../../services/rotate-saving-group/rotate-saving-group.service";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const player = await RotateSavingGroupModel.findById(params.id).populate("ownerId", ["playerName"]);
    return Response.json({ data: player, message: "Get player successful" });
  } catch (error) {
    return Response.json({ error });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const group = await RotateSavingGroupModel.findById(params.id);
    if (!group) throw new Error("Not found group");
    const res = await request.json();
    group.period = res.period || group.period;
    group.rotateAmount = res.rotateAmount || group.rotateAmount;
    group.minBitAmount = res.minBitAmount || group.minBitAmount;
    group.maxBitAmount = res.maxBitAmount || group.maxBitAmount;
    group.systemRandomPlayer = res.systemRandomPlayer || group.systemRandomPlayer;
    group.roomStatus = res.status || group.roomStatus;
    group.bitTime = res.bitTime || group.bitTime;
    group.startPlayDate = res.startPlayDate || group.startPlayDate;

    const groupUpdated = await group.save();

    // // For Test start
    // startRoomPlay(groupUpdated);

    return Response.json({
      data: groupUpdated,
      message: `Update Group  successful`,
    });
  } catch (error) {
    return Response.json({ error });
  }
}
