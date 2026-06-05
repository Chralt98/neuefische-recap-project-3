import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateBidDto } from '../offers/dto/create-bid.dto';
import { OfferResponseDto } from '../offers/dto/offer-reponse.dto';
import { OffersService } from '../offers/offers.service';
import { FiltersQueryDto } from '../shared/filters-query.dto';
import { AuctionsService } from './auctions.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { ResponseAuctionDto } from './dto/response-auction.dto';

@Controller('auctions')
export class AuctionsController {
  constructor(
    private readonly auctionsService: AuctionsService,
    private readonly offersService: OffersService,
  ) {}

  @Get()
  async getAllAuctions(@Query() filtersQueryDto: FiltersQueryDto): Promise<{
    data: ResponseAuctionDto[];
    meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  }> {
    return await this.auctionsService.getAll(filtersQueryDto);
  }

  @Get(':id')
  async getAuctionById(@Param('id', ParseUUIDPipe) id: string) {
    const auction = await this.auctionsService.getById(id);
    return plainToInstance(ResponseAuctionDto, auction);
  }

  @Post()
  async createAuction(
    @Body() dto: CreateAuctionDto,
  ): Promise<ResponseAuctionDto> {
    return await this.auctionsService.create(dto);
  }

  @Post(':id/offers')
  createBid(
    @Param('id', ParseUUIDPipe) auctionId: string,
    @Body() dto: CreateBidDto,
  ): Promise<OfferResponseDto> {
    const auction = this.auctionsService.getById(auctionId);
    if (!auction) {
      throw new NotFoundException(`Auction with id ${auctionId} not found`);
    }
    return this.auctionsService.createBid(auctionId, dto.bidder, dto.price);
  }
}
