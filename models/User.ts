import mongoose, { Schema, Model } from "mongoose";
import { ICraveSeatUser } from "@/types/user.types";

const newUserSchema = new Schema<ICraveSeatUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CraveSeatUser: Model<ICraveSeatUser> =
  mongoose.models.Userr || mongoose.model<ICraveSeatUser>("Userr", newUserSchema);

export { CraveSeatUser };
