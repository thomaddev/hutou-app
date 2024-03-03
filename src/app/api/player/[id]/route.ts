import { NextRequest } from "next/server";
import dbConnect from "@/app/libs/mongodb";
import PlayerModel from "@/app/api/services/player/player.model";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const player = await PlayerModel.findById(params.id);
    return Response.json({ data: player, message: "Get player successful" });
  } catch (error) {
    return Response.json({ error });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const res = await request.json();
    const updatePlayer = await PlayerModel.findByIdAndUpdate(params.id, res);
    return Response.json({
      data: updatePlayer,
      message: `Update player ${updatePlayer.playerName} successful`,
    });
  } catch (error) {
    return Response.json({ error });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const res = await request.json();
    const deletelayer = await PlayerModel.findByIdAndDelete(params.id);
    return Response.json({
      data: deletelayer,
      message: `Delete player ${deletelayer.playerName} successful`,
    });
  } catch (error) {
    return Response.json({ error });
  }
}
