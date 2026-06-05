import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateAuctionDto {
  @ApiProperty({ example: 'Vintage Camera', maxLength: 120 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title!: string;

  @ApiProperty({
    example: 'A fully working 35mm camera with original leather case.',
    maxLength: 2000,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  description!: string;

  @ApiProperty({ example: 100, minimum: 0 })
  @IsNumber()
  @Min(0)
  startingPrice!: number;

  @ApiPropertyOptional({
    description: 'Defaults to 3 days after creation when omitted.',
    example: '2026-06-08T12:00:00.000Z',
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate!: Date;
}
