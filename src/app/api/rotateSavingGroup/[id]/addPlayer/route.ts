import dbConnect from "@/app/libs/mongodb";
import RotateSavingGroupModel from "@/app/api/models/rotate-saving-group";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const res = await request.json();

    const group = await RotateSavingGroupModel.findById(params.id);
    const ownPlayersGroup = group.players.map((e: any) => e.toHexString());

    // Convert players array to a Set to ensure uniqueness
    const uniquePlayerIds = new Set<string>([...res.players, ...ownPlayersGroup]);

    uniquePlayerIds.size;
    // check player full?
    if (uniquePlayerIds.size > group.playerCount) {
      return Response.json(
        {
          message: `play room is full`,
        },
        {
          status: 400,
        }
      );
    }

    // Check should not owner in player
    if (uniquePlayerIds.has(group.ownerId.toHexString())) {
      return Response.json(
        {
          message: `cannot have owner in player room`,
        },
        {
          status: 400,
        }
      );
    }

    // set unique players
    group.players = Array.from(uniquePlayerIds);

    const groupUpdated = await group.save();

    return Response.json({
      data: groupUpdated,
      message: `Add players successful`,
    });
  } catch (error) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 500,
    });
  }
}
