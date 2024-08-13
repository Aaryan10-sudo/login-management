import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { WebUser } from "../schema/model.js";
import { secretKey } from "../utils/constant.js";
import { sendEmail } from "../utils/sendEmail.js";

export const webUserController = async (req, res, next) => {
  try {
    //hashing the password and storing hashed password in database
    let data = req.body;
    let hashedPassword = await bcrypt.hash(data.password, 10);
    data = {
      ...data,
      password: hashedPassword,
      isVerifiedEmail: false,
    };

    let result = await WebUser.create(data);

    //generating token
    let infoObj = {
      id: result._id,
    };
    let expiryInfo = {
      expiresIn: "100d",
    };

    let token = await jwt.sign(infoObj, secretKey, expiryInfo);

    await sendEmail({
      to: data.email,
      subject: "Account Registration Successfull",
      html: `<h1>Account Registration</h1>
        <p>Please use the following link to verify your account</p><br>
        <a href="http://localhost:5000/verify-mail?token=${token}">
        href=http://localhost:5000/verify-mail?token=${token}</a>`,
    });
    res.json({
      success: true,
      message: `Mail sent to ${data.email}.`,
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyMailController = async (req, res, next) => {
  try {
    let tokenString = req.headers.authorization;
    let tokenArray = tokenString.split(" ");
    let token = tokenArray[1];

    let user = await jwt.verify(token, secretKey);
    let id = user.id;

    let result = await WebUser.findByIdAndUpdate(id, { isVerifiedEmail: true });
    res.status(200).json({
      success: true,
      message: `${result.email} verified successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res, next) => {
  try {
    let email = req.body.email;
    let password = req.body.password;

    let user = await WebUser.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid Credentials");
    }
    if (!user.isVerifiedEmail) {
      throw new Error("Email has not verified yet");
    }

    let isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("Invalid Credentials");
    }

    let infoObj = {
      id: user.id,
    };
    let expiryInfo = {
      expiresIn: "100d",
    };

    let token = await jwt.sign(infoObj, secretKey, expiryInfo);

    res.status(200).json({
      success: true,
      message: "Login Successfull",
      data: user,
      token: token,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const myProfile = async (req, res, next) => {
  try {
    let id = req.id;
    let result = await WebUser.findById(id);
    res.json({
      status: true,
      message: `Hello ${result.email}.`,
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    let id = req.id;
    let data = req.body;
    delete data.email;
    delete data.password;

    let result = await WebUser.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json({
      success: true,
      message: `${data.email} have been successfully updated`,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    let id = req.id;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    let confirmPassword = req.body.confirmPassword;
    let data = await WebUser.findById(id);
    let hashedPassword = data.password;

    let isValidPassword = await bcrypt.compare(oldPassword, hashedPassword);
    if (isValidPassword) {
      let newHashedPassword = await bcrypt.hash(newPassword, 10);
      let result = await WebUser.findByIdAndUpdate(
        id,
        { password: newHashedPassword },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: `${oldPassword} have been successfully updated to ${newPassword}`,
        data: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgetPassword = async (req, res, next) => {
  try {
    let email = req.body.email;
    let result = await WebUser.findOne({ email: email });
    if (!result) {
      throw new Error("Invalid Credentials");
    }
    let infoObj = {
      infoId: result._id,
    };
    let expiryInfo = {
      expiresIn: "1d",
    };
    let token = await jwt.sign(infoObj, secretKey, expiryInfo);

    await sendEmail({
      to: email,
      subject: "Reset Your Password",
      html: `<h1>Reset Link</h1><p>Please use the following link to reset your password </p> 
    <a href="http://localhost:9761/reset-password?token=${token}">
    href=http://localhost:9761/reset-password?token=${token}</a>`,
    });

    res.status(200).json({
      success: true,
      message: `Reset link sent to ${email}`,
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    let id = req.id;
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    let result = await WebUser.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
