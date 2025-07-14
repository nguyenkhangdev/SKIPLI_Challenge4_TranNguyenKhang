import express from "express";
import {
  CreateNewAccessCode,
  GetMe,
  LoginEmail,
  signout,
  ValidateAccessCode,
  ValidateAccessCodeEmail,
} from "../controllers/auth.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/CreateNewAccessCode", CreateNewAccessCode);
router.post("/ValidateAccessCode", ValidateAccessCode);

router.get("/getme", verifyToken, GetMe);
router.delete("/signout", signout);

router.post("/LoginEmail", LoginEmail);
router.post("/ValidateAccessCodeEmail", ValidateAccessCodeEmail);

export default router;
