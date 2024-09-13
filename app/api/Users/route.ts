import { NextResponse } from "next/server";
import { Users } from "@/utils/db";

// 1. API to get all the data
export function GET() {
  const data = Users;
  return NextResponse.json(data);
}
