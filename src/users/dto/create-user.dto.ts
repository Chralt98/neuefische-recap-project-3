import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'alice', maxLength: 80 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  username!: string;

  @ApiProperty({
    example: 'correct-horse-battery-staple',
    format: 'password',
    maxLength: 120,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  password!: string;
}
