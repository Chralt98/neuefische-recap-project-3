# neuefische-recap-project-3

## Recap Project 3 - DarkBay
### Overview

Welcome to DarkBay, an underground marketplace API where users list items for sale and bid against each other. You will build this backend entirely from scratch. There is no frontend; Everything happens via a RESTful API using JSON payloads.

A seller posts an auction for an item with a starting price and an end date. Other users compete by posting offers. The core business logic lives in your service layer: a valid bid must meet the initial starting price and strictly exceed any existing bids. Naturally, the auction must still be open. If a request breaks these rules, your API rejects it with an appropriate HTTP status code instead of failing silently or throwing a generic server error.

Your data model centers around a one-to-many relationship. The auctions table stores the listings – titles, descriptions, starting prices, and end dates. The end date of an auction defaults to three days after the auction was created if not set. The offers table records the bids, linking back to the auction via a foreign key. You will leverage this relationship to calculate the current active price, fetch the highest offer, or retrieve an entire bid history.

This project simulates a realistic transition, a refactoring every real backend eventually goes through. Initially, you will trust the client. This means a request body containing `"seller": "z3r0c00l"` or `"bidder": "ac1dburn"` dictates the identity. This gets your core features running quickly. Later, you strip out this blind trust and implement proper authentication. The `seller` and `bidder` fields disappear from the API payloads. The database continues linking users to their auctions and bids, but the API will extract that identity exclusively from a verified JWT. Clients lose the ability to spoof their identity because the server validates the token signature on every protected request.

Before writing your first line of code, set up a Git repository. Version control your work, try to commit often, write descriptive commit messages, and push your progress to GitHub.

### Project Scope

The work breaks down into six parts:

1. Project Setup & Database
2. The Auction Module
3. The Offer Module & Bidding Logic
4. RESTful Polish
5. Authentication
6. API Documentation with Swagger

## Recap Project 3 - Challenges
### Overview

This is the recap project for the NestJS module. You build the DarkBay auction API described in the introduction: a NestJS application where users post auctions, bid on them with offers, and where a bid is only accepted if it beats the current highest price. Authentication acts as the final layer, added on top of a working core.

### 1. Project Setup and Database Integration

Your first objective is establishing the foundation of a running NestJS application connected to a local SQLite database.

- Initialize a new NestJS workspace and structure your feature modules.
- Wire up the database using TypeORM.
- Architectural thought: During early development, how do you configure your database connection so that tables are automatically generated from your entities on startup, avoiding manual schema changes?
- Resource: `NestJS Database Integration`

### 2. The Auction Module

Create the core resource of the API. Sellers need a way to create an auction, list all available auctions, and fetch specific listings.

- Model the `Auction` entity. Define the necessary properties to track the item’s details, `title` and `description`, pricing, `starting price` and `current price`, lifecycle, `end date`, and the seller’s identity.
- Design the endpoints to handle creation and retrieval.
- Design question: Look at your request payload. Which fields must the client provide, and which should the server generate independently?
- Business rule: If a client omits an end date during creation, how do you enforce a default duration of three days within your service logic?
- Resource: `NestJS TypeORM Entities`

### 3. The Offer Module and Bidding Logic

This module handles the core mechanic of DarkBay. Users submit offers, and the system evaluates them against strict rules.

- Model the `Offer` entity and establish its relationship with the `Auction`. How do you link multiple bids to a single listing to track the complete bid history?
- Implement the bidding service. Before saving an offer, your application must validate the state of the auction.

### Edge Cases to Handle

- What happens if the auction is already closed?
- What if the bid fails to exceed the current price, or the starting price if it is the very first bid?
- HTTP semantics: Rejecting a bid because the amount is too low is a business rule violation, not a malformed request syntax. Which HTTP status code best communicates a conflict with the current state of the resource?
- Resource: `TypeORM Relations`

### 4. RESTful Polish

Elevate your API to professional standards without altering the core functionality.

- Enforce global validation. How do you guarantee that incoming payloads match your DTO shapes and automatically reject extraneous fields?
- Protect your database architecture from leaking. Define specific response models, DTOs, so clients only receive the data they are meant to see.

### Filtering and Pagination

Implement pagination and the following filtering options for your auction list:

- `?status=open|closed`
- `?min-price` and `?max-price`
- sorting the auctions by end date, with the most recent first

Implementation detail: How do you handle clients requesting a specific page size or filtering auctions by their current status, open vs. closed? Make sure to include metadata, total items and total pages, in your paginated responses.

- Resource: `NestJS Validation`

### 5. Authentication & Authorization

Replace the plaintext seller and bidder strings with a secure identity system. The API will now extract the user’s identity from a verified token rather than trusting the request body.

- Introduce a `User` model with securely hashed passwords.
- Implement a JWT-based login flow.
- Security challenge: How do you lock down your API so that creating auctions or placing bids requires authentication, while browsing the auction list remains completely public?
- Refactor your auction and offer creation services. Strip the `seller` and `bidder` fields from your incoming DTOs and pull the identity directly from the verified token.
- Business logic upgrade: With real authentication in place, how do you prevent a seller from placing a bid on their own listing?
- Resource: `NestJS Authentication`

### 6. API Documentation with Swagger

Generate live, interactive documentation directly from your code. Developers should be able to understand your endpoints and test them from the browser.

- Mount Swagger and configure it to recognize your DTOs.
- How do you configure the documentation to handle authenticated routes? Ensure the UI provides an Authorize dialog so users can paste their JWT and test protected endpoints.
- Enrich your schema. Where the inferred types are ambiguous, use decorators to provide clear descriptions and realistic examples, for example demonstrating the expected date format.
- Resource: `NestJS OpenAPI`

### Bonus Challenges

Pick one or more if you complete the main requirements early.

- Watchlists: Implement a user’s ability to add and remove an auction to their own watchlist and retrieve it.
- Database Migrations: Turn off automatic synchronization. Write an initial migration that manually creates your tables. This is the only safe way to evolve a schema in production.
- Derived State: Expose a computed status field, `open` or `closed`, on the auction response based on the current timestamp, saving the client from doing date math.
- Role-Based Access Control: Introduce an admin role. Implement a guard that allows admins to delete any auction, whereas standard users can only delete their own listings.
- Rate Limiting: Track offer submissions. Reject sudden bursts of bids from the same user within a short time window using a `429 Too Many Requests` status.