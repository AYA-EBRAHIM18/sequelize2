import { Router } from "express";
import * as user from "./users.controllers.js";

export const userRouter = Router();

userRouter.post("/signUp", user.signUp);
userRouter.post("/signIn", user.signIn);
userRouter.get("/logOut", user.logOut);
userRouter.get("/:userId/post/:postId", user.getUserWithPostAndComments);
