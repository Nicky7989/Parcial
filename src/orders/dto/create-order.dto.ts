import { IsNotEmpty, IsUUID, IsArray, IsNumber, IsEnum } from 'class-validator';
import { PaymentStatus } from '../entities/order.entity';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  client_id: string;

  @IsArray()
  @IsNotEmpty()
  products: string[];

  @IsNumber()
  @IsNotEmpty()
  total_amount: number;

  @IsEnum(PaymentStatus)
  payment_status: PaymentStatus;
}

