import { Router } from "express";
import * as comments from "./comments.controllers.js";
const commentRouter = Router();
commentRouter
  .route("/:commentId")
  .put(comments.updateComment)
  .delete(comments.deleteComment);

commentRouter
  .route("/:postId")
  .post(comments.addComment)
  .get(comments.readComment);
export default commentRouter;
