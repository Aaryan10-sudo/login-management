import mongoose from "mongoose";
let webuserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email field is required"],
  },
  password: {
    type: String,
    required: [true, "password field is required"],
  },
  address: {
    type: String,
    required: [true, "address field is required"],
  },
  age: {
    type: Number,
    required: [true, "age field is required"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
  },
  isVerifiedEmail: {
    type: String,
    required: [true, "isVerified email field is required"],
  },
});

export default webuserSchema;
