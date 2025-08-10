// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { CraveSeatUser } from "@/models/User";
import {connectDB} from "@/config/db";

interface Credentials {
  username: string;
  password: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "johndoe" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing username or password");
        }

        await connectDB();

        const user = await CraveSeatUser.findOne({ username: credentials.username }).lean();
        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        // Remove password before returning user object
        const { password, ...safeUser } = user;
        return safeUser;
      },
    }),
  ],

  callbacks: {
    async signIn({ account }) {
      return account?.provider === "credentials";
    },
    async session({ session, token }) {
      // Attach user id or any other info you want in session
      if (token?.sub) {
        if (session.user) {
          session.user.id = token.sub;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any)._id;
      }
      return token;
    },
  },

  pages: {
    signIn: "/auth/login", // Custom login page (optional)
  },

  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
