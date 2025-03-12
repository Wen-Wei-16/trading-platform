import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Trade } from './Trade';

export enum StrategyStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  PAUSED = 'paused',
  STOPPED = 'stopped'
}

@Entity('strategies')
export class Strategy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  code: string;

  @Column({
    type: 'enum',
    enum: StrategyStatus,
    default: StrategyStatus.DRAFT
  })
  status: StrategyStatus;

  @Column({ type: 'jsonb' })
  parameters: {
    entryConditions: any[];
    exitConditions: any[];
    riskManagement: {
      stopLoss: number;
      takeProfit: number;
      maxPositionSize: number;
    };
  };

  @Column({ type: 'jsonb', nullable: true })
  performance: {
    totalTrades: number;
    winningTrades: number;
    losingTrades: number;
    winRate: number;
    profitLoss: number;
    maxDrawdown: number;
  };

  @ManyToOne(() => User, user => user.strategies)
  user: User;

  @OneToMany(() => Trade, trade => trade.strategy)
  trades: Trade[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 