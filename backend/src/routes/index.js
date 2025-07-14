import express from "express";
import authRoutes from "./auth.js";
import employeeRoutes from "./employee.js";

const router = express.Router();

router.use("/", authRoutes); //auth
router.use("/", employeeRoutes); //employee

export default router;
