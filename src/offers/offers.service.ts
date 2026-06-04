import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Offer } from './entities/offer.entity';
import { OfferResponseDto } from './dto/offer-reponse.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer) private readonly offers: Repository<Offer>,
  ) {}

  async createBid(
    auctionId: string,
    bidder: string,
    price: number,
  ): Promise<OfferResponseDto> {
    const offer = this.offers.create({
      auction: { id: auctionId },
      bidder,
      price,
    });
    await this.offers.save(offer);
    return plainToInstance(OfferResponseDto, offer, {
      excludeExtraneousValues: true,
    });
  }
}
