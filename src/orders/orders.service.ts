import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private usersService: UsersService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const client = await this.usersService.findOne(createOrderDto.client_id);
  
    if (!client) {
      throw new BadRequestException('Cliente no encontrado');
    }
  
    if (client.role !== 'client') {
      throw new BadRequestException('Solo los clientes pueden hacer pedidos');
    }
  
    const order = new Order();
    order.client = client.id; // 🔥 Solo almacenamos el ID
    order.products = createOrderDto.products;
    
    // 🔥 Aplica descuento si el usuario es VIP
    order.total_amount = client.isVIP ? createOrderDto.total_amount * 0.9 : createOrderDto.total_amount;
    order.payment_status = createOrderDto.payment_status;
  
    await this.ordersRepository.save(order);
    await this.usersService.updateVIPStatus(client.id); // 🔥 Verifica si se vuelve VIP
    
    return order;    
  }  
  
  async findAll() {
    const orders = await this.ordersRepository.find({ relations: ['client'] });
  
    return orders.map(order => ({
      ...order,
      client: order.client,
    }));
  }
  

  async findOne(id: string) {
    return this.ordersRepository.findOneBy({ id }); 
  }
}
