import { responseHandler } from "../middlewares/resHandler.js";

export const signup = async (req, res, next) => {
  try {
    return responseHandler(res, 200, "Sign up successful.");
  } catch (error) {
    next(error);
  }
};
