import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TyreModule } from './tyre/tyre.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/bhumio'),
    UsersModule,
    AuthModule,
    TyreModule    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
