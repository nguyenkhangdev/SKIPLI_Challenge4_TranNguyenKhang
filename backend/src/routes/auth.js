import express from "express";
import { CreateNewAccessCode } from "../controllers/auth.js";

const router = express.Router();

router.post("/CreateNewAccessCode", CreateNewAccessCode);

export default router;
