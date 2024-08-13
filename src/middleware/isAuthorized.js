import { WebUser } from "../schema/model.js";

export const isAuthorized = (roles) => {
  return async (req, res, next) => {
    try {
      let id = req.id;
      let result = await WebUser.findById(id);
      let tokenRole = result.role;
      if (roles.includes(tokenRole)) {
        next();
      } else {
        throw new Error("You are not authenticated!!");
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
};
