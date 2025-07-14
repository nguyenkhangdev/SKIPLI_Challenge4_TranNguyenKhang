import express from "express";
import {
  CreateNewAccessCode,
  ValidateAccessCode,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/CreateNewAccessCode", CreateNewAccessCode);
router.post("/ValidateAccessCode", ValidateAccessCode);

export default router;
