import dbConnect from "@/app/libs/mongodb";
import RotateSavingGroupModel from "@/app/api/models/rotate-saving-group";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const player = await RotateSavingGroupModel.findById(params.id).populate("ownerId", ["playerName"]);
    return Response.json({ data: player, message: "Get player successful" });
  } catch (error) {
    console.log(error);
    return Response.json({ error });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const group = await RotateSavingGroupModel.findById(params.id);
    const res = await request.json();
    group.status = res.status;
    group.bit_time = res.bit_time
    const groupUpdated = await group.save();
    return Response.json({
      data: groupUpdated,
      message: `Update player  successful`,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ error });
  }
}
