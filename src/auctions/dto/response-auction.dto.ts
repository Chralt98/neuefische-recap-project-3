import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { OfferResponseDto } from '../../offers/dto/offer-reponse.dto';

export class ResponseAuctionDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @Expose()
  id!: string;

  @ApiProperty({ example: 'Vintage Camera' })
  @Expose()
  title!: string;

  @ApiProperty({
    example: 'A fully working 35mm camera with original leather case.',
  })
  @Expose()
  description!: string;

  @ApiProperty({ example: 100 })
  @Expose()
  startingPrice!: number;

  @ApiProperty({ example: 150 })
  @Expose()
  currentPrice!: number;

  @ApiProperty({ example: '2026-06-08T12:00:00.000Z' })
  @Expose()
  @Type(() => Date)
  endDate!: Date;

  @ApiProperty({ example: 'alice' })
  @Expose()
  seller!: string;

  @ApiProperty({
    type: () => [OfferResponseDto],
  })
  @Expose()
  @Type(() => OfferResponseDto)
  offers!: OfferResponseDto[];
}

class AuctionsMetaDto {
  @ApiProperty({ example: 42 })
  totalItems!: number;

  @ApiProperty({ example: 10 })
  itemCount!: number;

  @ApiProperty({ example: 10 })
  itemsPerPage!: number;

  @ApiProperty({ example: 5 })
  totalPages!: number;

  @ApiProperty({ example: 1 })
  currentPage!: number;
}

export class AuctionsResponseDto {
  @ApiProperty({ type: () => [ResponseAuctionDto] })
  data!: ResponseAuctionDto[];

  @ApiProperty({ type: () => AuctionsMetaDto })
  meta!: AuctionsMetaDto;
}
