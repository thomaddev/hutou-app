import dbConnect from "@/app/libs/mongodb";
import RotateSavingGroupModel from "@/app/api/services/rotate-saving-group/rotate-saving-group.model";
import { addPlayersToGroup } from "@/app/api/services/rotate-saving-group/rotate-saving-group.service";
import { IPlayer } from "@/app/api/services/player/player.model";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const res = await request.json();
    const players: IPlayer[] = [];
    res.players.forEach((userLineId: string) => {
      players.push({
        userLineId,
        isOwner: false,
      });
    });
    const groupUpdated = await addPlayersToGroup(params.id, players);
    return Response.json({
      data: groupUpdated,
      message: `Add players successful`,
    });
  } catch (error: any) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 500,
    });
  }
}
