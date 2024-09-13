import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { CraveSeatUser } from "@/models/User";
import connectDB from "@/config/db";
import { signIn } from "next-auth/react";

interface CredentialType {
  username?: string;
  password?: string;
}
export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectDB();
          const user = await CraveSeatUser.findOne({
            username: credentials?.username,
          });

          if (user) {
            if (user.password === credentials?.password) {
              return user;
            } else {
              throw new Error("Wrong password");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account?.provider == "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
