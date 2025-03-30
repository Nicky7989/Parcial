import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './JwtStrategy';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  imports: [
    ConfigModule, // ✅ Add this to make ConfigService available
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      inject: [ConfigService], 
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('SECRET_KEY'),
        signOptions: {
          expiresIn: '1h'
        }
      })
    })
  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, UsersService],
})

export class UsersModule {}
