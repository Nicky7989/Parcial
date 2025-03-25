import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Transform } from 'class-transformer';

export enum PaymentStatus {
  PAID = 'paid',
  REFUNDED = 'refunded',
  FAILED = 'failed',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.purchase_history)
  @Transform(({ value }) => (typeof value === 'object' ? value.id : value)) //Solo devuelve el ID
  client: string;
  

  @Column('jsonb', {
    nullable: false
  })    //Almacenar objetos o arrays en formato json
  products: string[];

  @Column('decimal', {
    nullable: false
  })
  total_amount: number;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PAID })
  payment_status: PaymentStatus;
}

