import express from "express";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Server API is running...");
});
app.use((req, res) => {
  res.status(404).send("This route does not match.");
});

const start = async () => {
  app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
  });
};
start();
