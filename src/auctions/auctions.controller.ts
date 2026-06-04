import { Controller, Get } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AuctionsService } from './auctions.service';
import { ResponseAuctionDto } from './dto/response-auction.dto';

@Controller('auctions')
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) { }
  
  @Get('')
  async getAllAuctions() {
    const auctions = await this.auctionsService.getAll();
    return plainToInstance(ResponseAuctionDto, auctions);
  }
}
