import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { OfferResponseDto } from '../offers/dto/offer-reponse.dto';
import { OffersService } from '../offers/offers.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { Auction } from './entities/auction.entitiy';

@Injectable()
export class AuctionsService {
  constructor(
    @InjectRepository(Auction) private readonly auction: Repository<Auction>,
    private readonly offersService: OffersService,
  ) {}

  public getAll() {
    return this.auction.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  public getById(id: string) {
    return this.auction.findOneBy({ id });
  }

  public create(dto: CreateAuctionDto) {
    if (!dto.endDate) {
      const endDate = new Date(Date.now() + 24 * 60 * 60 * 3);
      dto.endDate = endDate;
    }
    const auction = this.auction.create({
      ...dto,
      currentPrice: dto.startingPrice,
    });
    return this.auction.save(auction);
  }

  public async createBid(
    auctionId: string,
    bidder: string,
    price: number,
  ): Promise<OfferResponseDto> {
    const auction = await this.auction.findOneBy({ id: auctionId });
    
    if (!auction) {
      throw new NotFoundException(`Auction with id ${auctionId} not found`);
    }
      
    if (price < auction.currentPrice) {
      throw new ConflictException(
        'Bid price must be higher than current or starting price',
      );
    }

    if (auction.endDate.getTime() < Date.now()) {
      throw new ConflictException('Auction has already ended');
    }
    const bid = await this.offersService.createBid(auctionId, bidder, price);
    return plainToInstance(OfferResponseDto, {
      ...bid,
      auction: { id: auctionId },
    });
  }
}
