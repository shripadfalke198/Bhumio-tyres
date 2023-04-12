import { Body, Controller, Post, Request, UseGuards, Get,NotFoundException} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from 'src/auth/guards/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/roles decorator/roles.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Roles('admin')
    @UseGuards(AuthenticatedGuard,RoleGuard)
    @Post('/adduser')
    async addUser(@Body('username') username:string,@Body('email') email:string,
     @Body('role') role :string ,@Request() req){
        const saltOrRounds = 10;
        const token = await bcrypt.hash(username,saltOrRounds)
        const otp =  Math.floor(100000 + Math.random() * 900000);
        const result =  await this.usersService.insertUser(username,otp,email,role)
        const tokenRes = await this.usersService.insertToken(result._id,token);
        // from fromemail,toemail,otp,username
        const res = await this.usersService.sendEmail(req.user.userEmail,result.email,otp,result.username)
        return {
            msg :'user created successfully',
            emailresponce :res,
            userId : result._id,
            userName:result.username,
            email : result.email,
            role : result.role,
            token:tokenRes,
            emailRes : res
        }
    }

    @Post('/setpassword')
    async setpassword(@Body('username') username:string, @Body('password') password:string,@Body('otp') otp:number){
        const user =await this.usersService.getUser(username)
        if(!user){
            return new NotFoundException('user not found')
        }else if(user && user.otp != otp){
            return {  error : 'otp doesnt match'  }
        }
        const token = await this.usersService.getToken(user._id)
        if(!token){
            return { message :'token expired,please request admin to create new user' };
            // new NotFoundException('token expired,please request admin to create new user')
        }
        const setpass = await this.usersService.resetPassword(username,password)
        if(!setpass){
            return { msg :'failed to update password'}
        }
        return {
            msg:'password updated successfully',
            username :setpass.username,
            email : setpass.email,
            role : setpass.role
        };
    }

    @Post('/addAdmin')
    async addAdmin(@Body('adminname') adminname:string,@Body('email') email:string, @Body('password') password:string,
     @Body('role') role :string ,@Request() req){
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltOrRounds);
        const result = await this.usersService.insertAdmin(adminname,hashedPassword,email,role) 
        return {
            msg :'user created successfully',
            result
        }
    }
    
    @UseGuards(LocalAuthGuard)
    @Post('/login')
      login(@Request() req): any {
        return {
            User: req.user,
            msg: 'User logged in'
        };
    }

    @Roles('admin')
    @UseGuards(AuthenticatedGuard,RoleGuard)
    @Get('/protected')
    getHello(@Request() req): any {
        return req.user; /// see below for difference what session object returns
        // return req.user.userEmail
    }

    @Roles('dealer')
    @UseGuards(AuthenticatedGuard,RoleGuard)
    @Get('/get1')
    get1(@Request() req): string{
        return req.user.userEmail
    }

    @Get('/logout')
    logout(@Request() req): any {
        req.session.destroy();
        return { msg: 'The user session has ended' }
    }

}
