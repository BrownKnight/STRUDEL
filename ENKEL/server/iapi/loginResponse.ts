export class LoginResponse {
  success: boolean;
  errorMessage: string;
  token: string;

  constructor(success = true, errorMessage = "", token = "") {
    this.success = success;
    this.errorMessage = errorMessage;
    this.token = token;
  }
}