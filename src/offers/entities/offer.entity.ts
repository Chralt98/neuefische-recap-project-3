import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Auction } from '../../auctions/entities/auction.entitiy';

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Auction, (auction) => auction.offers)
  auction!: Auction;

  @Column({ type: 'varchar', length: 40 })
  bidder!: string;

  @Column({ type: 'float' })
  price!: number;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;
}
