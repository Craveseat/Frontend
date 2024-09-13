import bcrypt from "bcrypt-ts";
import { CraveSeatUser } from "@/models/User";
import connectDB from "@/config/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { username, email, password, confirmPassword } = await req.json();

  if (password !== confirmPassword) {
    return new NextResponse(
      JSON.stringify({ error: "Passwords do not match" }),
      { status: 400 }
    );
  }

  await connectDB();

  const existingEmail = await CraveSeatUser.findOne({ email });
  const existingUsername = await CraveSeatUser.findOne({ username });

  if (existingEmail) {
    return NextResponse.json(
      { error: "User with email already exist" },
      { status: 400 }
    );
  } else if (existingUsername) {
    return NextResponse.json(
      { error: "Username already Taken" },
      { status: 400 }
    );
  }

  // const hashedPassword = await bcrypt.hash(password, 10);
  const newCraveSeatUser = new CraveSeatUser({
    username,
    email,
    password,
  });

  try {
    await newCraveSeatUser.save();

    return new NextResponse(
      JSON.stringify({ message: "User successfully created" }),
      {
        status: 201,
      }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error }), { status: 400 });
  }
};
