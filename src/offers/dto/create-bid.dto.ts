import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateBidDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  bidder!: string;

  @IsNumber()
  @Min(0)
  price!: number;
}
