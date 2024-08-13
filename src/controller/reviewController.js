import { Review } from "../schema/model.js";

export const reviewController = async (req, res, next) => {
  try {
    let result = await Review.create(req.body);
    res.status(200).json({
      success: true,
      message: "Review added successflly",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const findAllReviewController = async (req, res, next) => {
  try {
    let result = await Review.find({});
    res.status(200).json({
      success: true,
      message: "All review found successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const findSpecificReviewController = async (req, res, next) => {
  try {
    let result = await Review.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Specific Review found successfully",
      data: result,
    });
  } catch (error) {
    res.staus(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateReviewController = async (req, res, next) => {
  try {
    let result = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: result,
    });
  } catch (error) {
    res.staus(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteReviewController = async (req, res, next) => {
  try {
    let result = await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: result,
    });
  } catch (error) {
    res.staus(400).json({
      success: false,
      message: error.message,
    });
  }
};
