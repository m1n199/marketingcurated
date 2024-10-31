import CredentialsProvider from "next-auth/providers/credentials";
// import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
// import Auth0 from "next-auth/providers/auth0";
import { NuxtAuthHandler } from "#auth";
import { useStorage } from "#imports";

export default NuxtAuthHandler({
  // a) Never hardcode your secret in your code!! and b) use a secure secret, `test-123` is **not** secure!!
  secret: process.env.AUTH_SECRET,
  providers: [
    // // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    // Auth0.default({
    //   // domain: process.env.AUTH0_DOMAIN,
    //   clientId: process.env.AUTH0_CLIENT_ID,
    //   clientSecret: process.env.AUTH0_CLIENT_SECRET,
    //   issuer: process.env.AUTH0_ISSUER,
    // }),
    // // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    // GithubProvider.default({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET
    // }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      async authorize(credentials: any) {
        if (!credentials || !credentials.email || !credentials.password) {
          console.error('Warning: Malicious login attempt registered, bad credentials provided')
          return null
        }
        const user = await useStorage('user').get(credentials.email) as { password: string, username: string }
        if (!user || user.password !== credentials.password) {
          console.error('Warning: Malicious login attempt registered, bad credentials provided')
          return null
        }
        return { username: user.username  }
      }
    })
  ],
});
