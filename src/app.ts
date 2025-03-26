import express, { Application, Request, Response } from "express";

const app: Application = express();
const port: number = 4000;
import * as dotenv from "dotenv";
dotenv.config();

import "./database/connection";

import userRoute from "./routes/userRoute";
import adminSeeder from "./adminSeeder";
import productRoute from "./routes/productRoute";
import categoryController from "./controllers/category.controller";

import categoryRouter from "./routes/CategoryRoute";
app.use(express.json());
adminSeeder();
app.use("/", userRoute);
app.use("/admin/product", productRoute);
app.use("/admin/category", categoryRouter);

app.listen(port, () => {
  categoryController.seedCategory();
  console.log("server running at ", port);
});
