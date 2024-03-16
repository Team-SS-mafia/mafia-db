import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({schema: 'example1', name: 'users'})
export class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  pw: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  nickname: string;
  
  @Column({ type: 'varchar', length: 50 })
  salt: string;
}