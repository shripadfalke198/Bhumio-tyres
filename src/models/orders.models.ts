import * as mongoose from "mongoose"
const Schema = mongoose.Schema;
// dealerName  dealerId(O) tyreId quantity(N) total(N) modifiedBy(N) accepted
export const orderSchema = new mongoose.Schema({
    dealerName:{
        type:String,
        required:true
    },
    dealerId :{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    tyreId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    total:{
        type:Number,
        required:true
    },
    modifiedBy:{
        type:String,
    },
    accepted :{
        type: Boolean
    }
  },
  { timestamps: true })