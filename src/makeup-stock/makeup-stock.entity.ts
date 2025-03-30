import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductTest } from '../product-tests/product-test.entity';

@Entity()
export class MakeupStock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: 0 })
  stock: number;

  @Column({ nullable: true })
  category?: string;

  @Column({ nullable: true })
  storageLocation?: string;

  @Column({ default: 0 })
  durability: number;

  @Column({ default: false })
  isIllegal: boolean;

  @Column({ default: 0 })
  stolenQuantity: number;

  @OneToMany(() => ProductTest, (test) => test.product)
  tests: ProductTest[];
}

