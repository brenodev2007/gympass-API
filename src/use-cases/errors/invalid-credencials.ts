export class invalidCredencialsError extends Error {
  constructor() {
    super("Invalid credentials");
    this.name = "InvalidCredencialsError";
  }
}
