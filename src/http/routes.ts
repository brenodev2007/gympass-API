import { FastifyInstance } from "fastify";
import { register } from "../http/controller/register";
import { authenticate } from "../http/controller/authenticate";
import { profile } from "./controller/profile";
import { verifyJWT } from "./middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/authenticate", authenticate);

  // Authenticated
  app.get("/me", { onRequest: verifyJWT }, profile);
}
