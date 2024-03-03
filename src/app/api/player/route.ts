import dbConnect from "@/app/libs/mongodb";
import PlayerModel from "@/app/api/services/player/player.model";
import { createPlayer } from "../services/player/player.service";

export async function GET() {
  try {
    await dbConnect();
    const players = await PlayerModel.find({});
    return Response.json({ data: players, message: "Get players successful" });
  } catch (error) {
    return Response.json({ error });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const res = await request.json();
    const newPlayer = createPlayer(res);
    // const newPlayer = await PlayerModel.create(res);
    return Response.json({
      data: newPlayer,
      message: "Create player successful",
    });
  } catch (error) {
    return Response.json({ error });
  }
}
