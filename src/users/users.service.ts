import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
const ObjectId = require('mongoose').Types.ObjectId; 
import * as bcrypt from 'bcrypt';
import { User } from 'src/models/users.model';
const nodemailer = require('nodemailer');


@Injectable()
export class UsersService {
    constructor(@InjectModel('user') private readonly userModel: Model<User>,
    @InjectModel('token') private readonly tokenModel){ }

    // get user based on username which must be unique
    async getUser(userName:string):Promise<any>{
        const username = userName.toLowerCase();
        const user = await this.userModel.findOne({username});
        return user;
    }

    // inster user withour password->accessed by admin only
    async insertUser(userName: string,otp: number,email: string,role: string){
        const username = userName.toLowerCase();
        const newUser = new this.userModel({
            username, email, otp ,role
        })

        await newUser.save()
        return newUser;
    }

    //   add amdin to databse without token as he dont need token to reset password  
    async insertAdmin(userName: string,password: string,email: string,role: string){
        const username = userName.toLowerCase();
        const newUser = new this.userModel({
            username, email, password ,role
        })
        await newUser.save()
        return newUser;
    }

    ///  Insert Token in database and userid =>tokan expires in 1 hour
    async insertToken(userId:string,token:string){
        const newToken = new this.tokenModel({
            userId,token
        })
        const tokenn = await newToken.save()
        return tokenn
    }

    async getToken(userId:string){
        const token = await this.tokenModel.findOne({ userId: new ObjectId(userId) })
        return token;
    }

    async resetPassword(username:string,password:string){
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltOrRounds);
        await this.userModel.findOneAndUpdate({username},{$unset: {otp:1}})
        const result =await this.userModel.findOneAndUpdate({username},{$set:{password:hashedPassword}}, {new: true})
        return result;
    }

    // fromemail,toemail,otp,username  Send email
    async sendEmail(fromEmail:string,toEmail:string,otp:number,username:string){
        let mailTransporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: fromEmail ,
                pass: ''
            }
        });
        const otp1 = otp;
        let mailDetails = {
            from: fromEmail || 'shripadfalke198@gmail.com',
            to: toEmail,
            subject: 'otp for resetting password',
            text: `Hello ${username}${'\n'}${otp1} is the OTP for resetting password,link will expire within one hour${'\n'}Thank You`
        };
        await mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                return err;
            } else {
                return  `otp recieved by ${toEmail}`
            }
        });
    }

    async deleteuser(id:string){
        const user= await this.userModel.deleteOne({_id: new ObjectId(id)})
        return user
    }
}
