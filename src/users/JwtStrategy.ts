import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload } from 'src/interface/JwtPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,

    @InjectRepository(User) // Asegurar que el repositorio se inyecte correctamente
    private readonly usersRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow<string>('SECRET_KEY')
    });
  }

  async validate(payload: JwtPayload) {
    const { email } = payload;
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
