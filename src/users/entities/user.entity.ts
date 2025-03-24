import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Transform } from 'class-transformer';

//Lo que se conecta a la base de datos
//El ID se genera automáticamente

export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
  TESTER = 'tester',
  EMPLOYEE = 'employee',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable:false
  })
  name: string;

  @Column({ unique: true,
    nullable:false
   })
  email: string;

  @Column('text',
    {nullable:false}
  )
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
  role: UserRole;
  
  @OneToMany(() => Order, (order) => order.client)
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map((order: Order) => order.id) : []
  )
  purchase_history: string[];


  @Column({ type: 'boolean', default: false })
  test_subject_status: boolean;

  @Column({ type: 'text', nullable: true })
  allergic_reactions: string;

  @Column({ type: 'boolean', default: false })
  isVIP: boolean;

}
