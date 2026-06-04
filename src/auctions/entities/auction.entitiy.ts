import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('auctions')
export class Auction {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 120 })
    title!: string;

    @Column({ type: 'varchar', length: 2000 })
    description!: string;

    @Column({ type: "float" })
    startingPrice!: number;
    
    @Column({ type: "float" })
    currentPrice!: number;

    @Column({ type: 'datetime' })
    endDate!: Date;

    @Column({ type: 'varchar', length: 40 })
    seller!: string

    @CreateDateColumn({ type: 'datetime' })
    createdAt!: Date;
}