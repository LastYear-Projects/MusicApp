import Comment,{IComment} from "../models/CommentScheme";
import {ObjectId} from "mongoose"
import Song from "../models/SongScheme";

const getCommentsByUserId = async (id:string) => {
  const comments = await Comment.find({ user: id });
  return comments;
};

const getCommentsBySongId = async (id:string) => {
  const comments = await Song.findById(id)
    .populate("comments")
    .populate({ path: "comments", populate: { path: "user" } })
    .select("comments");
  return comments;
};

const getCommentById = async (id:string) => {
  const comment = await Comment.findById(id);
  return comment;
};

const createComment = async (comment:IComment) => {
  console.log("comment", comment);
  const newComment = new Comment(comment);
  await newComment.save();
  return newComment;
};

const updateCommentById = async (id:string, comment:IComment) => {
  const updatedComment = await Comment.findByIdAndUpdate(id, comment);
  return updatedComment;
};

const deleteCommentById = async (id:string) => {
  const comment = await Comment.findByIdAndDelete(id);
  return comment;
};

// const deleteAllComments = async () => {
//   const comments = await Comment.deleteMany();
//   return comments;
// };

export default {
  getCommentsByUserId,
  getCommentsBySongId,
  getCommentById,
  createComment,
  updateCommentById,
  deleteCommentById,
  // deleteAllComments,
};
