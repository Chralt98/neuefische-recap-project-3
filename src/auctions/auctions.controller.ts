import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { AuthUser } from '../auth/auth.service';
import { Public } from '../common/decorators/public.decorator';
import { CreateBidDto } from '../offers/dto/create-bid.dto';
import { OfferResponseDto } from '../offers/dto/offer-reponse.dto';
import { FiltersQueryDto } from '../shared/filters-query.dto';
import { AuctionsService } from './auctions.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { ResponseAuctionDto } from './dto/response-auction.dto';

@Controller('auctions')
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) {}

  @Get()
  @Public()
  @ApiOkResponse({ type: [ResponseAuctionDto] })
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
  @Public()
  @ApiOkResponse({ type: ResponseAuctionDto })
  async getAuctionById(@Param('id', ParseUUIDPipe) id: string) {
    const auction = await this.auctionsService.getById(id);
    return plainToInstance(ResponseAuctionDto, auction);
  }

  @ApiBearerAuth()
  @Post()
  async createAuction(
    @Req() req: Request & { user: AuthUser },
    @Body() dto: CreateAuctionDto,
  ): Promise<ResponseAuctionDto> {
    return await this.auctionsService.create(dto, req.user.username);
  }

  @ApiBearerAuth()
  @Post(':id/offers')
  @ApiOkResponse({ type: OfferResponseDto })
  async createBid(
    @Req() req: Request & { user: AuthUser },
    @Param('id', ParseUUIDPipe) auctionId: string,
    @Body() dto: CreateBidDto,
  ): Promise<OfferResponseDto> {
    console.log('Received bid:', { auctionId, ...dto });
    const auction = await this.auctionsService.getById(auctionId);
    if (!auction) {
      throw new NotFoundException(`Auction with id ${auctionId} not found`);
    }
    return this.auctionsService.createBid(
      auctionId,
      req.user.username,
      dto.price,
    );
  }
}
