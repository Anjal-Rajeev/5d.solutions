import { Schema, model } from "mongoose";
import moment from "moment";
import { COLLECTIONS } from "../config.js";

const schema = new Schema(
  {
    title: String,
    image: String,
    comment: String,
    tags: [String],
    status: { type: Number, default: 0, enum: [0, 1] }, // 0- Active, 1- Deleted
    user: { type: Schema.Types.ObjectId, ref: COLLECTIONS.USERS },

    date: { type: String, default: () => moment().format("YYYY-MM-DD") },
    time: { type: String, default: () => moment().format("HH:mm:ss") },
    upDate: String,
    upTime: String,
  },
  { timestamps: true, collection: COLLECTIONS.MOMENTS }
);

export default model(COLLECTIONS.MOMENTS, schema);
