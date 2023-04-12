import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
const ObjectId = require('mongoose').Types.ObjectId; 


@Injectable()
export class TyreService {
    constructor(@InjectModel('tyre') private readonly tyreModel,
    @InjectModel('bill') private readonly billModel,
    @InjectModel('order') private readonly orderModel){ }

 // tyre  model  sp(N)  cp(N) type(TL,TT)

    async addTyre(tyre:string,model:string,sp:number,cp:number,type:string){
        const newTyre = await new this.tyreModel({
            tyre,model,sp,cp,type
        }).save();
        return newTyre
    }

    // Get tyre by id
    async getTyre(tyreId:string){
        const tyre = await this.tyreModel.findOne({ _id: new ObjectId(tyreId) })
        return tyre;
    }

    //Get all tyre
    async getAllTyre(){
        const tyres = await this.tyreModel.find()
        return tyres;
    }

    // customer mobile(N) dealerName tyre  sp(N) model type(TL,TT) quantity(N)  total(N)  
    async addBill(customer:string, mobile:number, dealerName :string,tyre:string ,sp:number ,
        model:string ,type:string ,quantity:number ,total:number){
        const bill = await new this.billModel({
            customer, mobile, dealerName ,tyre ,sp ,model ,type ,quantity ,total
        }).save()
        return bill;
    }
// dealerName  dealerId(O) tyreId quantity(N) total(N) modifiedBy(N) accepted
    async placeOrder(dealerName:string,dealerid:string,tyreid:string,quantity:number,total:number){
        const order = await this.orderModel({
            dealerName,dealerId:new ObjectId(dealerid),tyreId:new ObjectId(tyreid),quantity,total
        }).save()
        return order;
    }
    async acceptOrder(orderid,modifiedBy,accepted){
        const acceptedOrder = await this.orderModel.findOneAndUpdate({_id:new ObjectId(orderid)},{modifiedBy,accepted},{new: true})
        return acceptedOrder
    }

    async getOrders(){
        const orders = await this.orderModel.find()
        return orders
    }
}
