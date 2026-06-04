import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class CreateAuctionDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(120)
    title!: string;
    
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(2000)
    description!: string;
    
    @IsNumber()
    @Min(0)
    startingPrice!: number;
        
    @IsNumber()
    @Min(0)
    currentPrice!: number;
    
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    endDate!: Date;
    
    @IsString()
    seller!: string;
}