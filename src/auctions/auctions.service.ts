import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Between, FindOptionsWhere, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { OfferResponseDto } from '../offers/dto/offer-reponse.dto';
import { OffersService } from '../offers/offers.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { ResponseAuctionDto } from './dto/response-auction.dto';
import { Auction } from './entities/auction.entitiy';
import { FiltersQueryDto } from '../shared/filters-query.dto';

@Injectable()
export class AuctionsService {
  constructor(
    @InjectRepository(Auction) private readonly auction: Repository<Auction>,
    private readonly offersService: OffersService,
  ) {}

    public async getAll(filtersQueryDto: FiltersQueryDto) {
        const { page, limit, status, minPrice, maxPrice } = filtersQueryDto;

        let where: FindOptionsWhere<Auction> = {};
        if (minPrice && !maxPrice) {
            where.currentPrice = MoreThanOrEqual(minPrice);
        } 

        if (maxPrice && !minPrice) {
            where.currentPrice = LessThanOrEqual(maxPrice)
        }

        if (maxPrice && minPrice) {
            where.currentPrice = Between(minPrice, maxPrice)
        }

        if (status === 'open') {
            where.endDate = MoreThan(new Date())
        }

        if (status === 'closed') {
            where.endDate = LessThan(new Date())
        }

      const [auctions, totalItems] = await this.auction.findAndCount({
        
      order: {
        createdAt: 'DESC',
        },
        relations: {
            offers: true
          },
          where,
        skip: (page - 1) * limit,
      take: limit,
      });
        
        const responseAuctions = plainToInstance(ResponseAuctionDto, auctions);

        return {
            data: responseAuctions,
            meta: {
                totalItems,
                itemCount: auctions.length,
                  itemsPerPage: limit,
             totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
            }
        }
    
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

    if (this.isAuctionClosed(auction.endDate)) {
      throw new ConflictException('Auction has already ended');
    }
    const bid = await this.offersService.createBid(auctionId, bidder, price);
    return plainToInstance(OfferResponseDto, {
      ...bid,
      auction: { id: auctionId },
    });
  }
    
    private isAuctionClosed(endDate: Date) {
      return endDate.getTime() < Date.now()
  }
}
