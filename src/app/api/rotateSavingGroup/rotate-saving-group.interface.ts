import { Schema } from "mongoose";

export interface RegisterRoom {
    groupLineId: string;
    ownerId: Schema.Types.ObjectId
}