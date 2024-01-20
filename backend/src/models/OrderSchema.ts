import mongoose,{ObjectId} from "mongoose"


export interface IOrder {
  user: ObjectId;
  songs: ObjectId[];
  date: Date;
}
const OrderSchema = new mongoose.Schema<IOrder>({
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

const Order = mongoose.model<IOrder>("order", OrderSchema, "orders");
export default Order;
