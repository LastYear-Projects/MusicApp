import mongoose from "mongoose"

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: The ID of the user who made the comment
 *         comment:
 *           type: string
 *           description: The content of the comment
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date and time when the comment was created
 */
const CommentScheme = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  date: {
    type: Date,
    default: function () {
      const now = new Date();
      now.setHours(now.getHours() + 3);
      return now;
    },
  },
});

module.exports = mongoose.model("comment", CommentScheme, "comments");
