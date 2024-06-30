import express from "express";
import sequelize from "./database/dbConnection.js";
import cors from "cors";
import { userRouter } from "./modules/users/users.routes.js";
import postsRouter from "./modules/posts/posts.routes.js";
import commentRouter from "./modules/comments/comments.routes.js";
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

sequelize.sync({ alter: true });
app.use("/users", userRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentRouter);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
