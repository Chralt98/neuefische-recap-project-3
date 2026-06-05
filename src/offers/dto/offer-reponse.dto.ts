import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class OfferResponseDto {
  @ApiProperty({
    description: 'The unique identifier for the offer',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  id!: string;

  @ApiProperty({
    description: 'The username of the bidder',
    example: 'john_doe',
  })
  @Expose()
  bidder!: string;

  @ApiProperty({
    description: 'The price of the offer',
    example: 100.0,
  })
  @Expose()
  price!: number;

  @ApiProperty({
    description: 'The unique identifier for the auction',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  auctionId!: string;
}
