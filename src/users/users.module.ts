import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User]),
  PassportModule.register({defaultStrategy:'jwt'}),
  JwtModule.registerAsync({
    imports:[],
    inject:[],
    useFactory:()=>{
      return{
        secret:process.env.SECRET_KEY,
        signOptions:{
          expiresIn:'1h'
        }
      }
    }
  })],
  exports: [TypeOrmModule, UsersService]
})
export class UsersModule {}
