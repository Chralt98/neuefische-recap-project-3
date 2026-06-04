import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuctionsModule } from './auctions/auctions.module';
import { Auction } from './auctions/entities/auction.entitiy';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './data/auctions.sqlite',
      entities: [Auction],
      synchronize: true,
      logging: false,
      enableWAL: true,
      statementCacheSize: 100,
    }),
    AuctionsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
