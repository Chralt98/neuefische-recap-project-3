import { Expose, Type } from 'class-transformer';
import { OfferResponseDto } from '../../offers/dto/offer-reponse.dto';

export class ResponseAuctionDto {
  @Expose()
  id!: string;

  @Expose()
  title!: string;

  @Expose()
  description!: string;

  @Expose()
  startingPrice!: number;

  @Expose()
  currentPrice!: number;

  @Expose()
  @Type(() => Date)
  endDate!: Date;

  @Expose()
  seller!: string;

  @Expose()
  @Type(() => OfferResponseDto)
  offers!: OfferResponseDto[];
}
