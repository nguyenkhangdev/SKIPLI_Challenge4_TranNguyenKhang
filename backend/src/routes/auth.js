import express from "express";
import {
  CreateNewAccessCode,
  GetMe,
  ValidateAccessCode,
} from "../controllers/auth.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/CreateNewAccessCode", CreateNewAccessCode);
router.post("/ValidateAccessCode", ValidateAccessCode);
router.get("/getme", verifyToken, GetMe);

export default router;
