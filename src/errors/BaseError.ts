export class BaseError extends Error {
  public message: string;
  public code: number;
  public name: string;

  constructor(message: string, code: number, name: string) {
    super();
    this.message = message;
    this.code = code;
    this.name = name;
  }
}
