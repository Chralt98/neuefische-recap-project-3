import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { Auction } from './entities/auction.entitiy';

@Injectable()
export class AuctionsService {

    constructor(@InjectRepository(Auction) private readonly auction: Repository<Auction>){}

    public getAll() {
       return  this.auction.find({
            order: {
                createdAt: 'DESC'
            }
        })
    }

    public getById(id: string) {
        return this.auction.findOneBy({id})
    }

    public create(dto: CreateAuctionDto) {
        if (!dto.endDate) {
            const endDate = new Date(Date.now() + 24 * 60 * 60 * 3)
            dto.endDate = endDate
        }
        const auction = this.auction.create(dto);
        return this.auction.save(auction);
    }
}
