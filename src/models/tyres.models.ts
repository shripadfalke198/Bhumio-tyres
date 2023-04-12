import * as mongoose from "mongoose"
export const TyreSchema = new mongoose.Schema(
  {
    tyre: {
      type: String,
      required: true,
    },
    model:{
        type:String,
        required:true
    },
    sp:{
      type: String,
      required: true
    },
    cp:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true,
        enum: ['TL', 'TT','TTF','Tyre','Tube']
    }
  },
  { timestamps: true }
)