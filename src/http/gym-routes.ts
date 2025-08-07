import { FastifyInstance } from "fastify";

import { verifyJWT } from "./middlewares/verify-jwt";
import { search } from "./controller/search";
import { searchNearBy } from "./controller/nearby";
import { create } from "./controller/create";

export async function gymRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/gyms/search", search);

  app.get("/gyms/nearby", searchNearBy);

  app.post("/gyms", create);
}
