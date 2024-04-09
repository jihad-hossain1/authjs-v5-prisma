import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { db } from "./lib/db";
import authConfig from "./auth.config";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      if (!user) {
        throw new Error("User not found in signIn callback");
      }

      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      return token;
    },
  },

  adapter: PrismaAdapter(db),

  session: { strategy: "jwt" },

  ...authConfig,
});
