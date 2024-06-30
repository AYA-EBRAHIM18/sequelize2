import sequelize from "../dbConnection.js";
import { DataTypes } from "sequelize";

export const commentModel = sequelize.define(
  "comment",
  {
    content: {
      type: DataTypes.STRING(100),
    },
  },
  { createdAt: false }
);
