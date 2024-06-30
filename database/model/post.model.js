import sequelize from "./../dbConnection.js";
import { DataTypes } from "sequelize";
import { commentModel } from "./comment.model.js";
export const postModel = sequelize.define(
  "post",
  {
    title: {
      type: DataTypes.STRING(100),
    },
    content: {
      type: DataTypes.STRING(100),
    },
    author: {
      type: DataTypes.STRING(100),
    },
  },
  { createdAt: false }
);

postModel.hasMany(commentModel);
commentModel.belongsTo(postModel);
