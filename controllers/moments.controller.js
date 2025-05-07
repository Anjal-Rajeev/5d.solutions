import { asyncErrorHandler, Error, Response } from "express-error-catcher";
import models from "../models/index.js";

// Function to create moments
export const createMoment = asyncErrorHandler(async (req) => {
  
  let { title, comment, image, tags } = req.body;
  let user = req.cookies.user

  if (isNull(user)) throw new Error("User not found", 400);
  if (isNull(title)) throw new Error("Title required", 400);
  if (isNull(image)) throw new Error("Image required", 400);
  if (tags && !Array.isArray(tags)) throw new Error("Invalid Tags", 400);
  if(!isNull(comment) && comment.length > 100) throw new Error("Comment should be less than 100 characters.")

  let data = await models.Moments({
    title,
    comment,
    image,
    tags,
    user,
  }).save();

  if (!data) throw new Error("Failed to create, Please try again", 400);
  return new Response("Moment created successfully", null, 200);
});