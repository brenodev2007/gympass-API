import fastify from "fastify";
import { appRoutes } from "./http/routes";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import { gymRoutes } from "./http/gym-routes";

export const app = fastify({
  logger: true,
});

app.register(fastifyJwt, {
  secret: env.SECRET,
});

app.register(gymRoutes);
app.register(appRoutes);
