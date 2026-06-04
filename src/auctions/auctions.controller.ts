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
  async getAllAuctions(@Query() filtersQueryDto: FiltersQueryDto) {
    const auctions = await this.auctionsService.getAll(filtersQueryDto);
    return plainToInstance(ResponseAuctionDto, auctions);
  }

  @Get(':id')
  async getAuctionById(@Param('id', ParseUUIDPipe) id: string) {
    const auction = await this.auctionsService.getById(id);
    return plainToInstance(ResponseAuctionDto, auction);
  }

  @Post()
  createAuction(@Body() dto: CreateAuctionDto): Promise<ResponseAuctionDto> {
    return this.auctionsService.create(dto);
  }

  @Post(':id/offers')
  createBid(
    @Param('auctionId', ParseUUIDPipe) auctionId: string,
    @Body() dto: CreateBidDto,
  ): Promise<OfferResponseDto> {
    const auction = this.auctionsService.getById(auctionId);
    if (!auction) {
      throw new NotFoundException(`Auction with id ${auctionId} not found`);
    }

    return this.auctionsService.createBid(auctionId, dto.bidder, dto.price);
  }
}
