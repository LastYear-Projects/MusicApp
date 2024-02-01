import commentService from "../services/comments.service";
import songService from "../services/songs.service";
import jwt from "jsonwebtoken";
import {Request, Response} from "express";
import{ Types } from "mongoose";
import { IComment } from "../models/CommentScheme";
import Token from "../utils/tokenType";


const getCommentById = async (req:Request, res:Response) => {
  try {
    const id = req.params.id ;
    const comment = await commentService.getCommentById(id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCommentsBySongId = async (req:Request, res:Response) => {
  try {
    const { songId } = req.params;
    console.log("songId", songId);
    const comments = await commentService.getCommentsBySongId(songId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createComment = async (req:Request, res:Response) => {
  try {
    const { comment, songId, token } = req.body;
    const decodedToken = jwt.decode(token) as Token;
    const userId = new Types.ObjectId(decodedToken.id);
    const myComment :IComment = {
      comment,
      user: userId,
    };
    const newComment = await commentService.createComment(myComment);
    const song = await songService.getSongById(songId);
    song.comments.push(newComment._id);
    await songService.updateSong(songId, song);
    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCommentById = async (req:Request, res:Response) => {
  try {
    const id = req.params.id;
    const comment = { ...req.body };
    const updatedComment = await commentService.updateCommentById(id, comment);
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCommentById = async (req:Request, res:Response) => {
  try {
    const id = req.params.id;
    // Find the song that contains the comment
    const song = await songService.getSongByCommentId(id);
    // Remove the comment from the song
    song.comments = song.comments.filter((comment) => comment._id.toString() != id);
    // Update the song
    await songService.updateSong(song._id.toString(), song);
    const deletedComment = await commentService.deleteCommentById(id);
    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const deleteAllComments = async (req:Request, res:Response) => {
//   try {
//     const deletedComments = await commentService.deleteAllComments();
//     res.status(200).json(deletedComments);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getCommentsByUserId = async (req:Request, res:Response) => {
  try {
    const userId = req.params.userId;
    const comments = await commentService.getCommentsByUserId(userId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getCommentById,
  getCommentsBySongId,
  createComment,
  updateCommentById,
  deleteCommentById,
  // deleteAllComments,
  getCommentsByUserId,
};
