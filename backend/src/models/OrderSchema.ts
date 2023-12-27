import mongoose from "mongoose"

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: The ID of the user placing the order
 *         songs:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of song IDs included in the order
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date and time when the order was created
 */

export type OrderDocument = mongoose.Document & {
  user: mongoose.Types.ObjectId;
  songs: mongoose.Types.ObjectId[];
  date: Date;
};

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "song",
      required: true,
    },
  ],
  date: {
    type: Date,
    default: function () {
      const now = new Date();
      now.setHours(now.getHours() + 3);
      return now;
    },
  },
});

const Order = mongoose.model<OrderDocument>("order", OrderSchema);
export default Order;


