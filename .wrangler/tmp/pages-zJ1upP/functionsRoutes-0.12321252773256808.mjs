import { onRequestGet as __api_club___path___ts_onRequestGet } from "C:\\Users\\Mario\\Desktop\\Repository github\\poket-battle\\functions\\api\\club\\[[path]].ts"
import { onRequestPost as __api_club___path___ts_onRequestPost } from "C:\\Users\\Mario\\Desktop\\Repository github\\poket-battle\\functions\\api\\club\\[[path]].ts"

export const routes = [
    {
      routePath: "/api/club/:path*",
      mountPath: "/api/club",
      method: "GET",
      middlewares: [],
      modules: [__api_club___path___ts_onRequestGet],
    },
  {
      routePath: "/api/club/:path*",
      mountPath: "/api/club",
      method: "POST",
      middlewares: [],
      modules: [__api_club___path___ts_onRequestPost],
    },
  ]