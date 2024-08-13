import { Router } from "express";
import {
  deleteReviewController,
  findAllReviewController,
  findSpecificReviewController,
  reviewController,
  updateReviewController,
} from "../controller/reviewController.js";
import { isAuthorized } from "../middleware/isAuthorized.js";

let reviewRouter = Router();
reviewRouter
  .route("/")
  .post(reviewController)
  .get(isAuthorized(["admin"]), findAllReviewController);

reviewRouter
  .route("/:id")
  .get(findSpecificReviewController)
  .patch(updateReviewController)
  .delete(deleteReviewController);

export default reviewRouter;
