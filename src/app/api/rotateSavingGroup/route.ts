
import dbConnect from "@/app/libs/mongodb";
import RotateSavingGroupModel from "@/app/api/models/rotate-saving-group";

export async function GET() {
  try {
    await dbConnect();
    const lists = await RotateSavingGroupModel.find();
    return Response.json({ data: lists, message: "Get players successful" });
  } catch (error) {
    console.log(error);
    return Response.json({ error });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const res = await request.json();
    const result = await RotateSavingGroupModel.create(res);
    return Response.json({
      data: result,
      message: "Create Rotate saving group successful",
    });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error.message });
  }
}
