import { BadRequestException, Body, Controller, NotFoundException, NotImplementedException, Post, Request} from '@nestjs/common';
import { Get, Param, UseGuards } from '@nestjs/common';
import { Put } from '@nestjs/common/decorators';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/roles decorator/roles.decorator';
import { TyreService } from './tyre.service';

@Controller('tyre')
export class TyreController {
    constructor(private readonly tyreService: TyreService) {}

    // tyre  model  sp(N)  cp(N) type(TL,TT)
    @Roles('distributor')
    @UseGuards(AuthenticatedGuard,RoleGuard)
    @Post('/addtyre')
    async addTyre(@Body('tyre') tyre:string, @Body('model') model:string, @Body('sp') sp:number,
    @Body('cp') cp:number,@Body('type') type:string){
        const tyre1 = await this.tyreService.addTyre(tyre,model,sp,cp,type)
        if(!tyre1){
            return new BadRequestException()
        }
        return tyre1;
    }

    @Roles('distributor','dealer')
    @UseGuards(AuthenticatedGuard,RoleGuard)
    @Get('alltyres')
    async getAllTyre(){
        const tyres = await this.tyreService.getAllTyre()
        if(!tyres){
            return new NotFoundException('tyre list empty')
        }
        return tyres;
    }
    
    @Roles('distributor','dealer')
    @UseGuards(AuthenticatedGuard,RoleGuard)
    @Get('gettyre/:id')
    async gettyre(@Param('id') id:string){
        const tyre = await this.tyreService.getTyre(id)
        if(!tyre){
            return new NotFoundException('no tyre found')
        }
        return tyre;
    }
    
    // customer mobile(N) dealerName tyre  sp(N) model type(TL,TT) quantity(N)  total(N)  
    // tyre  model  sp(N)  cp(N) type(TL,TT)
    @Roles('dealer')
    @UseGuards(AuthenticatedGuard,RoleGuard)
    @Post('addbill')
    async addBill(
        @Body('customer') customer:string,@Body('mobile') mobile:number,@Body('tyre') tyre:string, 
        @Body('sp') sp:number,@Body('model') model:string,@Body('type') type:string,
        @Body('quantity') quantity:number,@Body('total') total:number,@Request() req
    ){
        const dealerName = req.user.userName  /// dealername from session object
        const bill = await this.tyreService.addBill(customer, mobile, dealerName ,tyre ,sp ,model ,type ,quantity ,total)
        if(!bill){
            return new Error('could not enter bill,please try again')
        }
        return bill;
    }

// dealerName  dealerId(O) tyreId quantity(N) total(N) modifiedBy(N) accepted
    @Roles('dealer')
    @UseGuards(AuthenticatedGuard,RoleGuard)
    @Put('/placeorder')
    async placeOrder(
        @Request() req,@Body('tyreId') tyreId:string,@Body('quantity') quantity:number,@Body('total') total:number
    ){
        const dealerName = req.user.userName
        const dealerId = req.user.userId
        const order = await this.tyreService.placeOrder(dealerName,dealerId,tyreId,quantity,total)
        return order;
    }

    // dealerName  dealerId(O) tyreId quantity(N) total(N) modifiedBy(N) accepted
    @Roles('distributor')
    @UseGuards(AuthenticatedGuard,RoleGuard)
    @Post('/modifyorder/order/:id')
    async modifyOrder(@Request() req,@Param('id') orderId:string,@Body('accepted') accepted:boolean){
        const modifiedBy = req.user.userName
        // const accepted = true
        const order = await this.tyreService.acceptOrder(orderId,modifiedBy,accepted)
        if(!order){
            return new NotImplementedException('unable to update')
        }
        return order;
    }

    @Roles('support','distributor','dealer')
    @UseGuards(AuthenticatedGuard,RoleGuard)
    @Get('/getAllOrders')
    async getAllOrders(){
        const orders = await this.tyreService.getOrders()
        if(!orders){
            return new NotFoundException('no orders in database')
        }
        return orders;
    }

}
