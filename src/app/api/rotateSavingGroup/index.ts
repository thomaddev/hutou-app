import dbConnect from "@/app/libs/mongodb";
import RotateSavingGroupModel from "@/app/api/services/rotate-saving-group/rotate-saving-group.model";
import { RegisterRoom } from "./rotate-saving-group.interface";

export const registerRoom = async (data: RegisterRoom) => {
  await dbConnect();
//   const res = await request.json();
};
