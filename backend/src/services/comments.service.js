const Comment = require("../models/CommentScheme");
const {
  Types: { ObjectId },
} = require("mongoose");
const Song = require("../models/SongScheme");

const getCommentsByUserId = async (id) => {
  const comments = await Comment.find({ user: id });
  return comments;
};

const getCommentsBySongId = async (id) => {
  const comments = await Song.findById(id)
    .populate("comments")
    .populate({ path: "comments", populate: { path: "user" } })
    .select("comments");
  return comments;
};

const getCommentById = async (id) => {
  const comment = await Comment.findById(id);
  return comment;
};

const createComment = async (comment) => {
  console.log("comment", comment);
  const newComment = new Comment(comment);
  await newComment.save();
  return newComment;
};

const updateCommentById = async (id, comment) => {
  const updatedComment = await Comment.findByIdAndUpdate(id, comment);
  return updatedComment;
};

const deleteCommentById = async (id) => {
  const comment = await Comment.findByIdAndDelete(id);
  return comment;
};

const deleteAllComments = async () => {
  const comments = await Comment.deleteMany();
  return comments;
};

module.exports = {
  getCommentsByUserId,
  getCommentsBySongId,
  getCommentById,
  createComment,
  updateCommentById,
  deleteCommentById,
  deleteAllComments,
};
