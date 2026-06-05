import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

export class UserResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @Expose()
  id!: string;

  @ApiProperty({ example: 'alice' })
  @Expose()
  username!: string;

  @Exclude()
  passwordHash!: string;

  @ApiProperty({ example: '2026-06-05T12:00:00.000Z' })
  @Expose()
  @Type(() => Date)
  createdAt!: Date;
}
