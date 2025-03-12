import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { Strategy } from './Strategy';

export enum TradeType {
  BUY = 'buy',
  SELL = 'sell'
}

export enum TradeStatus {
  PENDING = 'pending',
  EXECUTED = 'executed',
  CANCELLED = 'cancelled',
  FAILED = 'failed'
}

@Entity('trades')
export class Trade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: TradeType
  })
  type: TradeType;

  @Column({
    type: 'enum',
    enum: TradeStatus,
    default: TradeStatus.PENDING
  })
  status: TradeStatus;

  @Column()
  symbol: string;

  @Column('decimal', { precision: 18, scale: 8 })
  quantity: number;

  @Column('decimal', { precision: 18, scale: 8 })
  price: number;

  @Column('decimal', { precision: 18, scale: 8, nullable: true })
  executedPrice: number;

  @Column('decimal', { precision: 18, scale: 8, nullable: true })
  executedQuantity: number;

  @Column({ type: 'jsonb', nullable: true })
  metadata: {
    exchange: string;
    orderId: string;
    commission: number;
    slippage: number;
  };

  @ManyToOne(() => User, user => user.trades)
  user: User;

  @ManyToOne(() => Strategy, strategy => strategy.trades)
  strategy: Strategy;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 