import * as mongoose from "mongoose"
export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email:{
        type:String,
        required:true
    },
    password: {
      type: String,
      // required: true
    },
    otp:{
      type: Number,
    },
    role:{
      type : String,
      required:true,
      enum: ['admin', 'distributor','dealer','support']
    }
  },
  { timestamps: true }
)

export interface User extends mongoose.Document {
  _id: string;
  username: string;
  email:string;
  password: string;
  role :Role
}

export enum Role {
  Admin = 'admin',
  Dealer ='dealer',
  Distributor = 'distributor',
  Support ='support'
}