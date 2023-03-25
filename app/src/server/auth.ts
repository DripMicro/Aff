import type { GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./db";
import { loginAccount } from "./auth-affiliates-login";
import { castError } from "../utils/errors";

export type AuthUser = {
  id: string;
  type: "affiliate" | "admin";
  // ...other properties
  // role: UserRole;
} & DefaultSession["user"];

/**
 * Module augmentation for `next-auth` types.
 * Allows us to add custom properties to the `session` object and keep type
 * safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: AuthUser;
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks,
 * etc.
 *
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  callbacks: {
    // jwt({ token, account, profile }) {
    //   console.log(`muly:jwt`, { token, account, profile });
    //   // Persist the OAuth access_token and or the user id to the token right after signin
    //   // if (account) {
    //   //   token.accessToken = account.access_token;
    //   //   token.id = profile.id;
    //   // }
    //   return token;
    // },
    session({ session, user, token }) {
      // console.log(`muly:session`, { session, user, token });
      if (session.user && token.sub) {
        session.user.id = token.sub;
        // session.user.type = token.sub;
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
  },
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        // const res = await fetch("/your/endpoint", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });
        // const user = await res.json();
        //
        // // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user;
        // }

        if (credentials) {
          try {
            const user = await loginAccount(
              prisma,
              credentials.username,
              credentials.password
            );

            console.log(`muly:authorize`, { user, credentials });
            return user;
          } catch (_err) {
            const err = castError(_err);
            console.error(`authorize ERROR: ${err.message}`);
            throw err;
          }
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the
 * `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 **/
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
