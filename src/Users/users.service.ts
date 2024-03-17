import { Injectable, HttpStatus, HttpCode } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private jwtService: JwtService
  ) {}

  async getUser(userName: string, userPassword: string) {
    const searchResult = await this.usersRepository.findOne({ where: {name: userName}, select: ['name', 'pw', 'salt', 'nickname'] });
    
    if (searchResult === null){
      return null;
    }

    const hashedPw = await bcrypt.hash(userPassword, searchResult.salt);
    if(searchResult.pw === hashedPw){
      // login!
      const payload = { userId: searchResult.name, userNickname: searchResult.nickname };
      return {
        access_token: await this.jwtService.signAsync(payload),
        searchResult
      };
    }
    else{
      return null;
    }
  }

  async createUser(CreateUserDto: CreateUserDto ): Promise<Users> {
    try {
      // 솔트 값 생성
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);

      // 솔트 값을 포함하여 비밀번호 해싱
      const hashedPassword = await bcrypt.hash(CreateUserDto.pw, salt);

      // 사용자 객체 생성 및 값 할당
      const newUser = new Users();
      newUser.name = CreateUserDto.name;
      newUser.pw = hashedPassword;
      newUser.nickname = CreateUserDto.nickname;
      newUser.email = CreateUserDto.email;
      newUser.salt = salt;

      // 사용자 객체 저장
      const returnUser = await this.usersRepository.save(newUser);
      return returnUser;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }
}