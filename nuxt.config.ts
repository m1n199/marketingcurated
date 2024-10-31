
import { defineNuxtConfig } from "nuxt/config";

function checkEnvVariables(requiredKeys: string[]) {
  const missingKeys = requiredKeys.filter(key => !process.env[key]);

  if (missingKeys.length > 0) {
    throw new Error(`Missing required environment variables: ${missingKeys.join(', ')}`);
  }
}

// List of required environment variables
const requiredEnvKeys = [
  'BASE_URL',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'AUTH_SECRET',
  'NODEMAILER_SERVICE',
  'NODEMAILER_HOST',
  'NODEMAILER_PORT',
  'NODEMAILER_USER',
  'NODEMAILER_PASS',
  'MONGODB_URI'
];

// Check if all required environment variables are available
checkEnvVariables(requiredEnvKeys);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: !true },
  spaLoadingTemplate: false,
  ssr: !true,
  modules: [
    "@unocss/nuxt", 
    "@sidebase/nuxt-auth", 
    'nuxt-nodemailer'
  ],

  nodemailer: {
    service: process.env.NODEMAILER_SERVICE,
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    }
  },

  imports: {
    autoImport: false,
  },
  unocss: {
    preflight: true,
  },
  auth: {
    provider: {
      type: 'authjs'
    },
    globalAppMiddleware: {
      isEnabled: !true
    },
    baseURL: process.env.BASE_URL,
  },
  routeRules: {
    "/with-caching": {
      swr: 86400000,
      auth: {
        disableServerSideAuth: true
      }
    },
    "/": {
      redirect: "/browse/Color?filter=Red",
    },
  },
  // vite: {
  //   server: {
  //     hmr: {
  //       protocol: 'wss'
  //     }
  //   }
  // }
});