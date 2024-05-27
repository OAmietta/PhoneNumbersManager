import express from "express";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import { apiRouter } from "./routes";
import { setupSwagger } from "./swagger";

const app = express();
const port = process.env.PORT ?? 3000;
const databaseUrl = process.env.DATABASE_URL ?? "mongodb://localhost:27017";

app.use(cors()); // To avoid problems with the frontend and backend folders being separated.

app.use(apiRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

//Swagger Documentation

setupSwagger(app);

//MongoDB Connection

mongoose.connect(databaseUrl, {} as ConnectOptions);

mongoose.connection.on("error", () => {
  throw new Error("Failed to connect to database.");
});

mongoose.connection.once("open", () => {
  console.log("Connected to database.");
});
