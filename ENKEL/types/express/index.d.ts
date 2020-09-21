import { UserLogin } from "../../STRUDAL/entity/UserLogin";

declare module "express-serve-static-core" {
  interface Request {
    user?: UserLogin;
  }
}
