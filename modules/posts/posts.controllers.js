import { postModel } from "../../database/model/post.model.js";
import { userModel } from "../../database/model/user.model.js";

const addPost = async (req, res) => {
  await postModel.create(req.body);
  res.json({ message: "Post Added Successfully" });
};

const readPost = async (req, res) => {
  let { count, rows } = await postModel.findAndCountAll({
    include: {
      model: userModel,
      attributes: { exclude: ["password", "updatedAt"] },
    },
  });

  res.json({ message: "success", AllPosts: count, posts: rows });
};
const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { title, content, author } = req.body;
  let post = await postModel.findByPk(postId);
  if (!post) {
    res.json({ message: "post Not Found" });
  }
  const updatedPost = await post.update({ title, content, author });
  res.status(200).json({ message: "success", updatedPost });
};
const deletePost = async (req, res) => {
  const { postId } = req.params;

  let x = await postModel.destroy({
    where: { id: postId },
  });

  res.json({ message: "success" });
};
const getPostByAuthor = async (req, res) => {
  const { userId } = req.params;
  const user = await userModel.findByPk(userId, {
    include: [
      { model: postModel, as: "posts", attributes: ["id", "title", "content"] },
    ],
  });
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  res.json({ message: "success", user });
};
export { addPost, readPost, updatePost, deletePost, getPostByAuthor };
