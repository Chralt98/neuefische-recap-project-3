import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionsController } from './auctions.controller';
import { AuctionsService } from './auctions.service';
import { Auction } from './entities/auction.entitiy';
import { OffersModule } from '../offers/offers.module';
import { OffersService } from '../offers/offers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Auction]), OffersModule],
  controllers: [AuctionsController],
  providers: [AuctionsService, OffersService],
})
export class AuctionsModule {}
