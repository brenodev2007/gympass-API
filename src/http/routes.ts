import { FastifyInstance } from "fastify";
import { register } from "../http/controller/register";
import { authenticate } from "../http/controller/authenticate";
import { profile } from "./controller/profile";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/authenticate", authenticate);

  // Authenticated
  app.get("/me", profile);
}
