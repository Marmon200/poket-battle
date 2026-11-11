import { handle } from "../../../../PokeBattle_2D_v28/lib/server";

type PagesContext = {
  request: Request;
  env: Record<string, unknown>;
};

export async function onRequestGet({ request, env }: PagesContext) {
  return handle(request, env);
}

export async function onRequestPost({ request, env }: PagesContext) {
  return handle(request, env);
}
