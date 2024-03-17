import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post('/login')
  async login(@Body() body: any, @Res() res: Response) {
    try {
      if (body.userName === null || body.userPassword === null){
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Input Error',
        });
      }

      const users = await this.usersService.getUser(body.userName, body.userPassword);
      if (users === null) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'User not found',
        });
      } 
      else if (users !== null){
        return res.status(HttpStatus.OK).json({
          access_token: users.access_token,
          message: 'User found',
        });
      }
    } catch (e){}
  }

  @Post('/create')
  async create(@Body() body: any, @Res() res: Response) {
    try {
      const newUser = new CreateUserDto();
        {
          newUser.name = body.userName;
          newUser.pw = body.userPassword;
          newUser.nickname = body.userNickname;
          newUser.email = body.userEmail;
        }
      
      await this.usersService.createUser(newUser);
      return res.status(HttpStatus.OK).json({
        message: 'User Created',
      });
    } catch (error) {
      console.error('Error while getting users:', error);
      throw new Error('Internal Server Error');
    }
  }
}