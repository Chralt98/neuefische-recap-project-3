import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { OffersService } from './offers.service';

//should offer have it's own module?
@Module({
  imports: [TypeOrmModule.forFeature([Offer])],
  exports: [OffersService],
  providers: [OffersService],
})
export class OffersModule {}
