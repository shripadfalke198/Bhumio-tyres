import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { billSchema } from 'src/models/bills.model';
import { orderSchema } from 'src/models/orders.models';
import { TyreSchema } from 'src/models/tyres.models';
import { TyreController } from './tyre.controller';
import { TyreService } from './tyre.service';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'tyre',schema:TyreSchema},{name:'bill',schema:billSchema},
    {name:'order',schema:orderSchema}])
  ],
  controllers: [TyreController],
  providers: [TyreService]
})
export class TyreModule {}
