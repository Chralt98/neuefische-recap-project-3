import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { OfferResponseDto } from '../../offers/dto/offer-reponse.dto';

export class ResponseAuctionDto {
  @ApiProperty({
    description: 'The text content of the message',
    example: 'Hello, world!',
  })
  @Expose()
  id!: string;

  @ApiProperty({
    description: 'The title of the auction',
    example: 'Vintage Camera',
  })
  @Expose()
  title!: string;
  @ApiProperty({
    description: 'The description of the auction',
    example: 'A beautiful vintage camera in excellent condition.',
  })
  @Expose()
  description!: string;
  @ApiProperty({
    description: 'The starting price of the auction',
    example: 100.0,
  })
  @Expose()
  startingPrice!: number;

  @ApiProperty({
    description: 'The current price of the auction',
    example: 150.0,
  })
  @Expose()
  currentPrice!: number;

  @ApiProperty({
    description: 'Should be a date in ISO format in the future',
    example: '2023-12-31T23:59:59.999Z',
  })
  @Expose()
  @Type(() => Date)
  endDate!: Date;
  @ApiProperty()
  @Expose()
  seller!: string;

  @ApiProperty({
    description: 'List of offers placed on this auction',
    type: () => [OfferResponseDto], //offer not visible in swagger
  })
  @Expose()
  @Type(() => OfferResponseDto)
  offers!: OfferResponseDto[];
}
