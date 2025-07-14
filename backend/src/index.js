import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import indexRoutes from "./routes/index.js";
import { errorHandler, errorMiddleware } from "./middlewares/resHandler.js";

//if use socket.io, import server in /services/socket.js

const app = express();

const PORT = process.env.PORT;
export const corsOptions = {
  origin: [
    process.env.FRONTEND_URL,
    `http://localhost:${process.env.FRONTEND_PORT}`,
  ],
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/v1", indexRoutes);
app.get("/", (req, res) => {
  res.send("Server API is running...");
});
app.use((req, res, next) => {
  return next(errorHandler(404, "This route does not match."));
});

const start = async () => {
  app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
  });
};
start();

app.use(errorMiddleware);
