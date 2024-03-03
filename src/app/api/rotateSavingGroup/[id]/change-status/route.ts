import RotateSavingGroupModel from "@/app/api/services/rotate-saving-group/rotate-saving-group.model";
import { startRoomPlay } from "@/app/api/services/rotate-saving-group/rotate-saving-group.service";
import { StatusGroup } from "@/app/constants/enum";
import dbConnect from "@/app/libs/mongodb";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");
    if (!status) {
      // TODO => Should throw Badrequest
      throw new Error("Status can not be empty!");
    }
    if (status in StatusGroup) {
      await dbConnect();
      const group = await RotateSavingGroupModel.findById(params.id);
      group.roomStatus = status || group.status;
      const groupUpdated = await group.save();

      // For Test start
      startRoomPlay(groupUpdated);

      return Response.json({
        data: groupUpdated,
        message: `Group change status to ${groupUpdated?.roomStatus} successful.`,
      });
    } else {
      throw new Error("Status mismatch!");
    }
  } catch (error) {
    return Response.json({ error });
  }
}
