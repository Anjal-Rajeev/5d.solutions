import { Types } from "mongoose";

global.isNull = (field) => {
  return (
    field === undefined ||
    field === "undefined" ||
    field === "" ||
    field === null ||
    field === "null"
  );
};


global.ObjectId = (obj) => new Types.ObjectId(obj);
