import { asyncErrorHandler, Error, Response } from "express-error-catcher";
import { COLLECTIONS } from "../config.js";
import models from "../models/index.js";
import {
  isValidEmail,
  isValidMobile,
} from "../helpers/functions.js";


export const createUser = asyncErrorHandler(async (req, res) => {
  let { name, email, mobile, country, password } = req.body;

  if (isNull(name)) throw new Error("Name required", 400);
  if (isNull(email)) throw new Error("Email required", 400);
  if (isNull(mobile)) throw new Error("Mobile required", 400);
  if (isNull(country)) throw new Error("Country required", 400);
  if (isNull(password)) throw new Error("Password required", 400);
  if (!isValidEmail(email)) throw new Error("Invalid email", 400);
  if (!isValidMobile(mobile)) throw new Error("Invalid mobile", 400);

  let isExists = await models.User.findOne({
    $or: [
      { email: { $regex: `^${email}$`, $options: "i" } },
      { mobile },
    ],
    status: 0,
  });

  if (isExists) {
    if (isExists.email?.toLowerCase() === email?.toLowerCase()) throw new Error("Email already exists", 400);
    if (isExists.mobile == mobile) throw new Error("Mobile already exists", 400);
  }

  let user = new models.User({
    email,
    mobile,
    name,
    country
  });

  user.password = user.generatePasswordHash(password);
  user = await user.save();

  res.cookie("user",  user?._id, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: "none",
  });
  return new Response("User created successfully", { data: { user: user?._id } }, 201);
});