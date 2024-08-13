import mongoose from "mongoose";
let connectDB = () => {
  mongoose.connect("mongodb://localhost:27017/mernbackend");
  console.log("Connect to Database mernbackend");
};
export default connectDB;
