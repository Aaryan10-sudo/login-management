import { Router } from "express";
import {
  forgetPassword,
  login,
  myProfile,
  resetPassword,
  updatePassword,
  updateProfile,
  verifyMailController,
  webUserController,
} from "../controller/webUserController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

let webUserRouter = Router();
webUserRouter.route("/web-user").post(webUserController);
webUserRouter.route("/").post(verifyMailController);
webUserRouter.route("/login").post(login);
webUserRouter.route("/my-profile").post(isAuthenticated, myProfile);
webUserRouter.route("/update-profile").post(isAuthenticated, updateProfile);
webUserRouter.route("/update-password").post(isAuthenticated, updatePassword);
webUserRouter.route("/forgot-password").post(forgetPassword);
webUserRouter.route("/reset-password").post(isAuthenticated, resetPassword);
export default webUserRouter;
