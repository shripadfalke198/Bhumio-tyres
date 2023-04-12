import * as mongoose from "mongoose"
const Schema = mongoose.Schema;
// customer mobile(N) dealerName tyre  sp(N) model type(TL,TT) quantity(N)  total(N)  
export const billSchema = new mongoose.Schema({
    customer: {
      type: String,
      required: true,
    },
    mobile:{
        type:Number,
        required:true
    },
    dealerName:{
        type:String,
        required:true
    },
    tyre:{
      type: String,
      required: true
    },
    sp:{
        type: Number,
        required: true
    },
    model:{
        type:String,
        required:true
    },
    type:{
        type: String,
        required: true,
        enum: ['TL', 'TT','TTF','Tyre','Tube']
    },
    quantity:{
        type: Number,
        required: true
    },
    total:{
        type:Number,
        required:true
    }
  },
  { timestamps: true })