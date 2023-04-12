import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenSchema } from 'src/models/token.model';
import { UserSchema } from 'src/models/users.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// import * as bcrypt from 'bcrypt';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "user", schema: UserSchema },{ name:"token",schema:TokenSchema}]),
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
