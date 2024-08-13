import mongoose from "mongoose";
let review = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "userId field is required"],
  },
  productId: {
    type: String,
    required: [true, "productId field is required"],
  },
  description: {
    type: String,
    required: [true, "Description field is required"],
  },
  role: {
    type: String,
    required: [true, "This field is required"],
  },
});
export default review;
