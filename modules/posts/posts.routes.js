import { Router } from "express";
import * as posts from "./posts.controllers.js";
const postsRouter = Router();
postsRouter.route("/").post(posts.addPost).get(posts.readPost);
postsRouter.route("/:postId").put(posts.updatePost).delete(posts.deletePost);

postsRouter.get("/:userId/posts", posts.getPostByAuthor);
export default postsRouter;
