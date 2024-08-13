import mongoose from "mongoose";
import webuserSchema from "./webuserSchema.js";
import review from "./review.js";

export const WebUser = mongoose.model("WebUser", webuserSchema);
export const Review = mongoose.model("Review", review);
