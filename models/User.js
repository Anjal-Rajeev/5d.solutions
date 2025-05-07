import { Schema, model } from "mongoose";
import moment from "moment";
import { COLLECTIONS } from "../config.js";
import bcrypt from "bcryptjs";

const schema = new Schema(
  {
    name: String,
    email: String,
    mobile: String,
    password: String,
    country: String,
    status: { type: Number, default: 0, enum: [0, 1] }, // 0- Active, 1- Deleted

    date: { type: String, default: () => moment().format("YYYY-MM-DD") },
    time: { type: String, default: () => moment().format("HH:mm:ss") },
  },
  { timestamps: true, collection: COLLECTIONS.USERS }
);

schema.methods.generatePasswordHash = (password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

schema.methods.validatePassword = (password, hashedPassword) => {
  const res = bcrypt.compareSync(password, hashedPassword);
  return res;
};

export default model(COLLECTIONS.USERS, schema)