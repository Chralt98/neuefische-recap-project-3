import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { OfferResponseDto } from '../../offers/dto/offer-reponse.dto';

export function ApiCreateOffer() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Create an offer',
      description:
        'The offer must be higher than the current price. Sellers cannot offer on their own auctions, and closed auctions reject new offers.',
    }),
    ApiCreatedResponse({
      description: 'Offer created successfully.',
      type: OfferResponseDto,
    }),
    ApiConflictResponse({
      description:
        'The bidder is the seller, the offer is too low, or the auction has ended.',
    }),
  );
}
