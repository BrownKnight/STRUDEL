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

export const LoginResponseSchema = {
  LoginResponse: {
    type: "object",
    properties: {
      success: {
        type: "boolean",
      },
      errorMessage: {
        type: "string",
      },
      token: {
        type: "string",
        format: "JWT",
      },
    },
  },
};
