import mongoose from "mongoose";
let connectDB = () => {
  mongoose.connect("*********************");
  console.log("Connect to Database mernbackend");
};
export default connectDB;
