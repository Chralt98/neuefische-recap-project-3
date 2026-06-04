import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AuctionsService } from './auctions.service';
import { ResponseAuctionDto } from './dto/response-auction.dto';
import { CreateAuctionDto } from './dto/create-auction.dto';

@Controller('auctions')
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) { }
  
  @Get('')
  async getAllAuctions() {
    const auctions = await this.auctionsService.getAll();
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
}
