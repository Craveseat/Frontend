import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
//import type { NextRequest } from "next";
import { Users } from "@/utils/db";

import { NextResponse } from "next/server";

interface Reply {
  id: string;
  avatar?: string;
  userName: string;
  comment: string;
  date: string;
  liked: boolean;
}

interface Comment {
  id: string;
  avatar?: string;
  userName: string;
  comment: string;
  date: string;
  liked: boolean;
  reply: Reply[];
}

// Types for cravings (active and satisfied)
interface Craving {
  id: string;
  image: string;
  name: string;
  price: string;
  craveNote: string;
  date: string;
  liked: boolean;
  bookmarked: boolean;
  mirror: boolean;
  likeCount: number;
  commentCount: number;
  bookmarkCount: number;
  mirrorCount: number;
  comments: Comment[];
}

interface SatisfiedCraving {
  id: string;
  image: string;
  name: string;
  price: string;
  dateSatisfied: string;
  anonymous: boolean;
  satisfier: string;
}

// Type for a user
interface User {
  id: string;
  userName: string;
  avatar: string;
  friends: boolean;
  activeCravings: Craving[];
  satisfiedCravings: SatisfiedCraving[];
}
// 2. API to get a single user

type ResponseData = {
  data: User;
};
export async function GET(req: Request, context: { params: Params }) {
  const Uid = context.params.id[0];
  const Cid = context.params.id[1];
  const user = Users.find((user) => user.id === Uid);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const specificCraving = user.activeCravings.find(
    (craving) => craving.id === Cid
  );
  if (!specificCraving) {
    return NextResponse.json({ error: "Craving not found" }, { status: 404 });
  }

  return NextResponse.json({ user, specificCraving }, { status: 200 });
}
