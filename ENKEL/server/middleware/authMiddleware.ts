import { Request, Response } from "express";
import { UserLoginDAO } from "../../STRUDAL/DAO/UserLoginDAO.js";
import { LoginResponse } from "../iapi/loginResponse.js";
import fs from "fs";
import jwt from "jsonwebtoken";

export type TokenPayload = { id: string };

export async function authMiddleware(req: Request, res: Response, next: () => void): Promise<void> {
  // If trying to access the /users/login page, then don't block it
  if (req.path.startsWith("/login")) {
    console.log("Skipping auth middleware as accessing login page");
    next();
    return;
  }

  const publicKey = fs.readFileSync("../auth.public.pem", "utf-8");
  const token = req.headers.authorization?.replace("Bearer ", "");
  console.log(`Received auth request with token ${token}`);

  if (!token) {
    res.status(401).send(new LoginResponse(false, "JWT Token not provided in Bearer auth header", token));
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let tokenPayload: any;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tokenPayload = <any>jwt.verify(token, publicKey, { algorithms: ["RS512"] });
  } catch (error) {
    res.status(401).send(new LoginResponse(false, "JWT Token not valid! error:" + error, token));
    return;
  }

  if (!tokenPayload) {
    res.status(401).send(new LoginResponse(false, "JWT Token not valid!", token));
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((tokenPayload as any).id !== undefined) {
    const dao = new UserLoginDAO();
    const userLogin = await dao.findEntity({ where: { id: tokenPayload.id } });
    if (!userLogin) {
      res.status(401).send(new LoginResponse(false, "Cannot find user for ID contained in token payload", token));
      return;
    }

    // User from the payload has been found, now check if the users token matches
    if (userLogin.token == token) {
      req.user = userLogin;
      next();
      return;
    } else {
      res.status(401).send(new LoginResponse(false, "JWT Token not valid! (Does not exist for user)", token));
      return;
    }
  } else {
    res.status(401).send(new LoginResponse(false, "JWT Token not valid! (missing id in payload)", token));
    return;
  }
}
