import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Strategy } from './Strategy';
import { Trade } from './Trade';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ nullable: true })
  twoFactorSecret: string;

  @Column({ default: false })
  isTwoFactorEnabled: boolean;

  @Column({ type: 'jsonb', nullable: true })
  exchangeApiKeys: {
    binance?: {
      apiKey: string;
      apiSecret: string;
    };
    alpaca?: {
      apiKey: string;
      apiSecret: string;
    };
  };

  @OneToMany(() => Strategy, strategy => strategy.user)
  strategies: Strategy[];

  @OneToMany(() => Trade, trade => trade.user)
  trades: Trade[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 