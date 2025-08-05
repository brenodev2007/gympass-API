export class resourceNotExists extends Error {
  constructor() {
    super("Resource does not exist");
  }
}
