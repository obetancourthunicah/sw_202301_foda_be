import { JWT } from "@utils/Jwt";
import { Request, Response } from "express";

export const validateJwtMiddleWare = (req: Request, res: Response, next) => {
  try {
    console.log(req.headers);
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer ', '');
    let decodedJWT = JWT.verifyJWT(token);
    if (decodedJWT) {
      console.log('AUTH OK', decodedJWT);
      req["user"] = decodedJWT;
      return next();
    }
    return res.status(403).json({ error: "Invalid Token" });
  } catch (error) {
    console.error("jwtValidator", error);
    return res.status(403).json({ error: "Invalid Token" });
  }
}
