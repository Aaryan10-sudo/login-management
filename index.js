import connectDB from "./src/connectDatabase/connectMongo.js";
import express, { json } from "express";
import webUserRouter from "./src/router/webUserRouter.js";
import review from "./src/schema/review.js";
import reviewRouter from "./src/router/reviewRouter.js";
connectDB();
const app = express();
const port = 9761;
app.use(json());

app.use("/web-user", webUserRouter);
app.use("/verify-mail", webUserRouter);
app.use("/review", reviewRouter);

app.listen(port, () => {
  console.log(`Express is running at port ${port}`);
});
