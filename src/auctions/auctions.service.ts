import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
