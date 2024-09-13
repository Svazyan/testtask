import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import initializeRoutes from "./router";

const app = express();
const port = 5001;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

initializeRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const mongoURI = "mongodb://localhost:27017/mydatabase";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
