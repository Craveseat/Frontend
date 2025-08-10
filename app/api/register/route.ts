import bcrypt from "bcryptjs";
import { CraveSeatUser } from "@/models/User";
import {connectDB} from "@/config/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { username, email, password, confirmPassword } = await req.json();

    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    // Connect to DB
    await connectDB();

    // Check if user already exists (email or username)
    const existingUser = await CraveSeatUser.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error:
            existingUser.email === email
              ? "User with this email already exists"
              : "Username already taken",
        },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await CraveSeatUser.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User successfully created", userId: newUser._id },
      { status: 201 }
    );
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
};
