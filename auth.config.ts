// import bcrypt from "bcryptjs";
// import type { NextAuthConfig } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import Github from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
// import prisma from "./prisma";
// import { LoginSchema } from "./schemas";
// import FacebookProvider from "next-auth/providers/facebook";

// export default {
//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     Github({
//       clientId: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_CLIENT_ID!,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
//     }),
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "Email:",
//           type: "email",
//           placeholder: "your-Email",
//         },
//         mobile: {
//           label: "mobile number:",
//           type: "text",
//           placeholder: "your mobile numer",
//         },
//         password: {
//           label: "password:",
//           type: "password",
//           placeholder: "your-password",
//         },
//         for: {
//           label: "for",
//           type: "text",
//           value: "customer",
//         },
//       },

//       async authorize(
//         credentials: Record<"email" | "password" | "mobile" | "for", string>
//       ) {
//         if (!credentials) return null;

//         const { email, password, mobile } = credentials;

//         try {
//           const foundUser = await prisma.user.findFirst({
//             where: { email: email },
//             select: {
//               password: true,
//               email: true,
//             },
//           });

//           if (!foundUser)
//             return Promise.reject(new Error("Email are not valid"));

//           if (foundUser) {
//             const validPassword = await bcrypt.compare(
//               password,
//               foundUser?.password
//             );

//             if (!validPassword) {
//               return Promise.reject(new Error("Password Invalid"));
//             }

//             return Promise.resolve(foundUser);
//           } else {
//             return Promise.resolve(null);
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       },
//     }),
//   ],
//   secret:
//     process.env.NEXT_AUTH_SECRET ||
//     "aljfasdoifjasldkfjasidfioawefkasdfjalskdjf",
// } satisfies NextAuthConfig;

import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import prisma from "./prisma";
import { LoginSchema } from "./schemas";
import FacebookProvider from "next-auth/providers/facebook";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await prisma.user.findFirst({
            where: { email: email },
          });

          if (!user || !user.password)
            return Promise.reject(new Error("email Invalid"));

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch)
            return Promise.reject(new Error("Password Invalid"));

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  secret:
    process.env.NEXT_AUTH_SECRET ||
    "aljfasdoifjasldkfjasidfioawefkasdfjalskdjf",
} satisfies NextAuthConfig;
