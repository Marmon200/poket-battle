import { handle } from "../../../PokeBattle_2D_v28/lib/server";

type PagesContext = {
  request: Request;
  env: {
    DB?: unknown;
    BREVO_API_KEY?: string;
    AUTH_FROM_EMAIL?: string;
    AUTH_CODE_PEPPER?: string;
    ADMIN_EMAILS?: string;
    env?: {
      DB?: unknown;
      BREVO_API_KEY?: string;
      AUTH_FROM_EMAIL?: string;
      AUTH_CODE_PEPPER?: string;
      ADMIN_EMAILS?: string;
    };
  };
};

function runtimeEnv(env: PagesContext['env']) {
  return env?.env && typeof env.env === 'object' ? env.env : env;
}

export async function onRequestGet({ request, env }: PagesContext) {
  return handle(request, runtimeEnv(env));
}

export async function onRequestPost({ request, env }: PagesContext) {
  return handle(request, runtimeEnv(env));
}
