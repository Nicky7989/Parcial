import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { MakeupStock } from '../makeup-stock/makeup-stock.entity';

@Entity('Tests')
export class ProductTest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  testerId: string;

  @ManyToOne(() => MakeupStock, (product) => product.tests, { onDelete: 'CASCADE' })
  product: MakeupStock;

  @Column('text')
  reaction: string;

  @Column()
  rating: number;

  @Column({ default: false })
  survivalStatus: boolean;
}