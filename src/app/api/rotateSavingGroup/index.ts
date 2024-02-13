import dbConnect from "@/app/libs/mongodb";
import RotateSavingGroupModel from "@/app/api/models/rotate-saving-group";
import { RegisterRoom } from "./rotate-saving-group.interface";

export const registerRoom = async (data: RegisterRoom) => {
  console.log("registerRoom", data);
  await dbConnect();
//   const res = await request.json();
};
