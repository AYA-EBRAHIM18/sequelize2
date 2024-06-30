import sequelize from "./../dbConnection.js";
import { DataTypes } from "sequelize";
import { commentModel } from "./comment.model.js";
import { postModel } from "./post.model.js";

export const userModel = sequelize.define(
  "user",
  {
    name: {
      type: DataTypes.STRING(100),
    },
    email: {
      type: DataTypes.STRING(100),
    },
    password: {
      type: DataTypes.STRING(100),
    },
  },
  { createdAt: false }
);

userModel.hasMany(postModel);
postModel.belongsTo(userModel);
userModel.hasMany(commentModel);
commentModel.belongsTo(userModel);
