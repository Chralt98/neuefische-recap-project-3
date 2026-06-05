import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class FiltersQueryDto {
  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @ApiPropertyOptional({
    default: 10,
    enum: [1, 2, 3, 10, 20, 30, 50, 100],
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @IsIn([1, 2, 3, 10, 20, 30, 50, 100], {
    message: 'limit must be one of: 10, 20, 30, 50, 100',
  })
  @Type(() => Number)
  limit: number = 10;

  @ApiPropertyOptional({ enum: ['open', 'closed'] })
  @IsOptional()
  @IsString()
  @IsIn(['open', 'closed'], {
    message: 'status must be either open or closed',
  })
  status!: string;

  @ApiPropertyOptional({ example: 50 })
  @IsOptional()
  @IsNumber()
  minPrice!: number;

  @ApiPropertyOptional({ example: 500 })
  @IsOptional()
  @IsNumber()
  maxPrice!: number;
}
