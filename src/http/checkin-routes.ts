import { FastifyInstance } from "fastify";

import { verifyJWT } from "./middlewares/verify-jwt";
import { createCheckIn } from "./controller/create-checkIn";
import { metrics } from "./controller/metrics";
import { validate } from "./controller/validate";

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/checkIn/metric", metrics);

  app.get("/checkIn/validate", validate);

  app.post("/checkIn", createCheckIn);
}
