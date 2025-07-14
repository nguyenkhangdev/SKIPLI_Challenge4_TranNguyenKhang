import express from "express";
import {
  CreateEmployee,
  DeleteEmployee,
  GetEmployee,
  GetEmployees,
} from "../controllers/employee.js";
import { verifyAdmin } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/GetEmployee", GetEmployee);
router.get("/GetEmployees", GetEmployees);
router.post("/CreateEmployee", verifyAdmin, CreateEmployee);
router.delete("/DeleteEmployee/:employeeId", verifyAdmin, DeleteEmployee);

export default router;
