import { decodeToken } from "../utils/token.js";
import { errorHandler } from "./resHandler.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.user_token;
  if (!token) {
    return next(errorHandler(401, "You are not sign in."));
  }
  const user = decodeToken(token);
  req.user = user;
  next();
};
