import bcrypt from "bcrypt";
import { userModel } from "./../../database/model/user.model.js";
import { postModel } from "../../database/model/post.model.js";
import { commentModel } from "../../database/model/comment.model.js";

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "success" });
  } catch {
    res.status(400).json({ message: "Email must be Unique" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "password is incorrect" });
  }
  res.status(200).json({ message: "login..token" });
};

const logOut = async (req, res) => {
  try {
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(400).json({ message: "Logout failed " });
  }
};
const getUserWithPostAndComments = async (req, res) => {
  const { userId, postId } = req.params;
  const user = await userModel.findByPk(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const post = await postModel.findOne({
    where: { id: postId, userId: userId },
    include: [
      { model: userModel, attributes: ["id", "name"] },
      {
        model: commentModel,
        attributes: ["id", "content"],
        include: { model: userModel, attributes: ["id", "name"] },
      },
    ],
  });
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.status(200).json({ user, post });
};

export { signUp, signIn, logOut, getUserWithPostAndComments };
