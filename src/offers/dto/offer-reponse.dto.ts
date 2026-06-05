import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class OfferResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @Expose()
  id!: string;

  @ApiProperty({ example: 'bob' })
  @Expose()
  bidder!: string;

  @ApiProperty({ example: 125 })
  @Expose()
  price!: number;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @Expose()
  auctionId!: string;
}
