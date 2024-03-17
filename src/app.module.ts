import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Users } from './Users/users.entity';
import { UsersController } from './Users/users.controller';
import { UsersService } from './Users/users.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Users],
      synchronize: false,
      autoLoadEntities: true,
      charset: 'utf8mb4',
      logging: true,
      keepConnectionAlive: true,
    }),
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: 'secretkey123!asdf', // JWT를 서명하는 데 사용할 비밀 키
      signOptions: { expiresIn: '30m' }, // 토큰의 만료 시간 설정 (예: 1일)
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
