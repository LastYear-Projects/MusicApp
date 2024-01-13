import mongoose,{ObjectId,Types} from "mongoose"
export interface IComment{
 user:Types.ObjectId,
 comment:string,
  date?:Date
}

const CommentScheme = new mongoose.Schema<IComment>({
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

const Comment = mongoose.model<IComment>("comment", CommentScheme, "comments");
export default Comment