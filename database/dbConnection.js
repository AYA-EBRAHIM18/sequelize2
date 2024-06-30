import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "bno6pwoa4ymgza4gr3ih",
  "uouw9eqawj3inaso",
  "2D2yultv390fVyVsG58H",
  {
    host: "bno6pwoa4ymgza4gr3ih-mysql.services.clever-cloud.com",
    dialect: "mysql",
  }
);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });

export default sequelize;
