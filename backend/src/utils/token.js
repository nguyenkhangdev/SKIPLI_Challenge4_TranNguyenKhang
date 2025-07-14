import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "4h",
    algorithm: "HS256",
  });
};

export const decodeToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
