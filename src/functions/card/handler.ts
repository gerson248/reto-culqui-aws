export * from '@connect/connect';
import type { APIGatewayProxyHandler, APIGatewayEvent, Context } from 'aws-lambda';
import { middyfy } from '@libs/lambda';
import { CardController } from './controller/card.controller';

const cardController = new CardController();

const card: APIGatewayProxyHandler = async (event: APIGatewayEvent, context: Context) => {
  return cardController.createCard(event, context);
};

const token: APIGatewayProxyHandler = async (event: APIGatewayEvent, context: Context) => {
  return cardController.getCard(event, context);
};

export const cardService = middyfy(card);
export const tokenService = middyfy(token);

// export { cardService, tokenService };
