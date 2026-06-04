import { Expose } from 'class-transformer';

export class OfferResponseDto {
  @Expose()
  id!: string;

  @Expose()
  bidder!: string;

  @Expose()
  price!: number;
}
