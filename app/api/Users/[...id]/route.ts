import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Users } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Params }
): Promise<NextResponse> {
  const { id } = context.params;

  // Expecting id to be an array like [userId, cravingId]
  if (!Array.isArray(id) || id.length < 2) {
    return NextResponse.json(
      { error: "Invalid route parameters" },
      { status: 400 }
    );
  }

  const [userId, cravingId] = id;

  const user = Users.find((u) => u.id === userId);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const specificCraving = user.activeCravings.find((c) => c.id === cravingId);
  if (!specificCraving) {
    return NextResponse.json({ error: "Craving not found" }, { status: 404 });
  }

  return NextResponse.json(
    { user, specificCraving },
    { status: 200 }
  );
}
