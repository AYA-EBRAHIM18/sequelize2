import { commentModel } from "./../../database/model/comment.model.js";
import { postModel } from "./../../database/model/post.model.js";
import { userModel } from "./../../database/model/user.model.js";

const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, userId } = req.body;
    const post = await postModel.findByPk(postId);
    const user = await userModel.findByPk(userId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    } else if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const comment = await commentModel.create({
      content,
      postId,
      userId,
    });
    res.status(201).json({ message: "Comment Added Successfully", comment });
  } catch {
    res.status(400).json({ message: "failed " });
  }
};

const readComment = async (req, res) => {
  const { postId } = req.params;
  let { count, rows } = await commentModel.findAndCountAll({
    where: { postId },
    include: {
      model: userModel,
      attributes: { exclude: ["password", "updatedAt", "email"] },
    },
  });

  res.json({ message: "success", AllComments: count, comments: rows });
};
const updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  let comment = await commentModel.findByPk(commentId);
  if (!comment) {
    res.json({ message: "comment Not Found" });
  }
  const updatedComment = await comment.update({ content });
  res.status(200).json({ message: "success", updatedComment });
};
const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  let x = await commentModel.destroy({
    where: { id: commentId },
  });

  res.json({ message: "success" });
};
export { addComment, readComment, updateComment, deleteComment };
