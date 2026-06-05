import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuctionsModule } from './auctions/auctions.module';
import { Auction } from './auctions/entities/auction.entitiy';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OffersModule } from './offers/offers.module';
import { Offer } from './offers/entities/offer.entity';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './data/auctions.sqlite',
      entities: [Auction, Offer, User],
      synchronize: true,
      logging: false,
      enableWAL: true,
      statementCacheSize: 100,
    }),
    AuctionsModule,
    UsersModule,
    AuthModule,
    OffersModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
