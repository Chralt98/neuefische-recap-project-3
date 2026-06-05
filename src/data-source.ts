import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Auction } from './auctions/entities/auction.entitiy';
import { Offer } from './offers/entities/offer.entity';
import { User } from './users/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: './data/darkbay.sqlite',
  entities: [User, Offer, Auction],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // Absolutely critical to disable this here
});
