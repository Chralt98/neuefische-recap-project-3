import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateBidDto {
  @ApiProperty({
    description: 'Offer price. Must be higher than the current auction price.',
    example: 125,
    minimum: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price!: number;
}
