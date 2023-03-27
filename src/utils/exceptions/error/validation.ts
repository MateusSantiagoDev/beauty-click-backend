export class Validation extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationException';
  }
}
