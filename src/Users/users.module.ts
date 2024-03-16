import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])], //해방모듈에서 Users Entity를 사용하기 위해 Import
  exports: [TypeOrmModule], // 다름 모듈에서도 UsersModule의 데이터베이스 설정을 공유하기 위해 export
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}