import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'; // Para encriptar
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/interface/JwtPayload';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService, // 🔥 Inyectamos JwtService
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.usersRepository.create({
        ...createUserDto,
        password: createUserDto.password ? bcrypt.hashSync(createUserDto.password, 10) : '', // 🔥 Validamos `password`
      });

      await this.usersRepository.save(user);
      return user;
    } catch (error) {
      throw new BadRequestException(error.message || 'Error creating user');
    }
  }

  private getJwtToken(jwtPayload: JwtPayload) {
    return this.jwtService.sign(jwtPayload); 
  }

  async login(loginDTO: LoginDTO) {
    const { email, password } = loginDTO;
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      throw new NotFoundException('Invalid credentials');
    }

    const jwtPayload: JwtPayload = { email, role: user.role };
    const token = this.getJwtToken(jwtPayload);
    return { user, token };
  }

  async findAll() {
    return this.usersRepository.find({ relations: ['purchase_history'] });
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['purchase_history'],
    });

    if (!user) {
      return null;
    }

    user.purchase_history = user.purchase_history.map((order: any) => order.id);
    return user;
  }

  async updateVIPStatus(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['purchase_history'],
    });

    if (!user) return;

    const totalSpent = user.purchase_history.reduce((sum, order: any) => sum + Number(order.total_amount), 0);
    user.isVIP = totalSpent >= 500;  // 🔥 Si gastó más de $500, se vuelve VIP

    await this.usersRepository.save(user);
  }
}
