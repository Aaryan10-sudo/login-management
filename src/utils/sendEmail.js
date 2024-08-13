import nodemailer from "nodemailer";

let transporterInfo = {
  host: "smtp.gmail.com",
  post: 587,
  secure: false,
  auth: {
    user: "lazyfox916@gmail.com",
    pass: "**** **** **** ****",
  },
};

export const sendEmail = async (mailInfo) => {
  try {
    let transporter = nodemailer.createTransport(transporterInfo);
    let info = await transporter.sendMail(mailInfo);
  } catch (error) {
    console.log("Error Detected", error.message);
  }
};
