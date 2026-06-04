import { Expose, Type } from 'class-transformer';

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
}
