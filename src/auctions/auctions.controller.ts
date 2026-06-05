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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { AuthUser } from '../auth/auth.service';
import { Public } from '../common/decorators/public.decorator';
import { CreateBidDto } from '../offers/dto/create-bid.dto';
import { OfferResponseDto } from '../offers/dto/offer-reponse.dto';
import { FiltersQueryDto } from '../shared/filters-query.dto';
import { AuctionsService } from './auctions.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import {
  AuctionsResponseDto,
  ResponseAuctionDto,
} from './dto/response-auction.dto';
import { ApiCreateOffer } from './swagger/api-create-offer.decorator';

@Controller('auctions')
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) {}

  @Get()
  @Public()
  @ApiOkResponse({ type: AuctionsResponseDto })
  async getAllAuctions(
    @Query() filtersQueryDto: FiltersQueryDto,
  ): Promise<AuctionsResponseDto> {
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
  @ApiCreatedResponse({ type: ResponseAuctionDto })
  async createAuction(
    @Req() req: Request & { user: AuthUser },
    @Body() dto: CreateAuctionDto,
  ): Promise<ResponseAuctionDto> {
    return await this.auctionsService.create(dto, req.user.username);
  }

  @Post(':id/offers')
  @ApiCreateOffer()
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
