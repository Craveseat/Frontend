import { Document } from "mongoose";

export interface ICraveSeatUser extends Document {
  username: string;
  email?: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
