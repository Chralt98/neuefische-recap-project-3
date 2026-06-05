import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateBidDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price!: number;
}
