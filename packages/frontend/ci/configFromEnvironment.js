const assert = require("assert");

const Environments = require("../../../features/environments.json");
const { parseBooleanFromShell } = require("../src/config/envParsers");

const Config = {
  NEAR_WALLET_ENV: process.env.NEAR_WALLET_ENV,
  TRAVIS: parseBooleanFromShell(process.env.TRAVIS),
  BRANCH: process.env.BRANCH,
  CLOUDFLARE_BASE_URL: process.env.CLOUDFLARE_BASE_URL,
  CONTEXT: process.env.CONTEXT,
  DEBUG_BUILD: process.env.DEBUG_BUILD,
  DEPLOY_PRIME_URL: process.env.DEPLOY_PRIME_URL,
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
  IS_NETLIFY: parseBooleanFromShell(process.env.NETLIFY),
  IS_RENDER: parseBooleanFromShell(process.env.RENDER),
  IS_PULL_REQUEST: parseBooleanFromShell(process.env.IS_PULL_REQUEST),
  RENDER: process.env.RENDER,
  RENDER_EXTERNAL_URL: process.env.RENDER_EXTERNAL_URL,
  RENDER_GIT_COMMIT: process.env.RENDER_GIT_COMMIT,
  REVIEW_ID: process.env.REVIEW_ID,
  SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
  SENTRY_DSN: process.env.SENTRY_DSN,
  SENTRY_RELEASE:
      process.env.SENTRY_RELEASE ||
      (process.env.RENDER &&
          `render:${process.env.RENDER_SERVICE_NAME}:${process.env.RENDER_GIT_BRANCH}:${process.env.RENDER_GIT_COMMIT}`),
  SHOULD_USE_CLOUDFLARE: parseBooleanFromShell(process.env.USE_CLOUDFLARE),
};

const computeCiNearWalletEnv = (Config) => {
  if(Config.IS_DEVELOPMENT || Config.SHOULD_USE_CLOUDFLARE) {
    return Environments.DEVELOPMENT;
  }

  if(Config.IS_NETLIFY) {
    switch (Config.CONTEXT) {
        case "production":
            return Config.DEPLOY_PRIME_URL.includes("near-wallet-staging")
                ? Environments.MAINNET_STAGING
                : Environments.MAINNET;
        case "branch-deploy":
            return Environments.MAINNET_STAGING;
        case "deploy-preview":
            return Config.DEPLOY_PRIME_URL.includes("near-wallet-staging")
                ? Environments.MAINNET_STAGING
                : Environments.MAINNET;
    }
  }

  if(Config.IS_RENDER) {
    return Config.IS_PULL_REQUEST
        ? Environments.TESTNET_STAGING
        : Environments.TESTNET;
  }

  if(Config.TRAVIS) {
    return Environments.MAINNET_STAGING;
  }
};

const NEAR_WALLET_ENV =
    Config.NEAR_WALLET_ENV || computeCiNearWalletEnv(Config);

assert(
    Object.values(Environments).some((env) => NEAR_WALLET_ENV === env),
    `Invalid environment: "${NEAR_WALLET_ENV}"`
);

module.exports = {
    ...Config,
    NEAR_WALLET_ENV,
};