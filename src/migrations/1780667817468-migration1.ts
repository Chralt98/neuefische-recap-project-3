import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration11780667817468 implements MigrationInterface {
  name = 'Migration11780667817468';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "offers" ("id" varchar PRIMARY KEY NOT NULL, "bidder" varchar(40) NOT NULL, "price" float NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "auctionId" varchar)`,
    );
    await queryRunner.query(
      `CREATE TABLE "auctions" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(120) NOT NULL, "description" varchar(2000) NOT NULL, "startingPrice" float NOT NULL, "currentPrice" float NOT NULL, "endDate" datetime NOT NULL, "seller" varchar(40) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar(30) NOT NULL, "passwordHash" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_offers" ("id" varchar PRIMARY KEY NOT NULL, "bidder" varchar(40) NOT NULL, "price" float NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "auctionId" varchar, CONSTRAINT "FK_9efdf260cd45b23f2d03808a435" FOREIGN KEY ("auctionId") REFERENCES "auctions" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_offers"("id", "bidder", "price", "createdAt", "auctionId") SELECT "id", "bidder", "price", "createdAt", "auctionId" FROM "offers"`,
    );
    await queryRunner.query(`DROP TABLE "offers"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_offers" RENAME TO "offers"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "offers" RENAME TO "temporary_offers"`,
    );
    await queryRunner.query(
      `CREATE TABLE "offers" ("id" varchar PRIMARY KEY NOT NULL, "bidder" varchar(40) NOT NULL, "price" float NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "auctionId" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "offers"("id", "bidder", "price", "createdAt", "auctionId") SELECT "id", "bidder", "price", "createdAt", "auctionId" FROM "temporary_offers"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_offers"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "auctions"`);
    await queryRunner.query(`DROP TABLE "offers"`);
  }
}
