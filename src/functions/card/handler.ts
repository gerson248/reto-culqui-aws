import { formatJSONResponse } from '@libs/api-gateway';
import type { APIGatewayProxyHandler } from 'aws-lambda';
import { middyfy } from '@libs/lambda';
import { Connect } from 'src/connect/connect';
import { generate, validatePKey, existPKey } from 'src/utils/utils';
import { CardSchemaManager } from '@functions/card/schemas/card.schemas';

const card: APIGatewayProxyHandler = async event => {
  await Connect.bdConnect();
  const key = String(event.headers.Authorization || '');
  if (existPKey(key)) {
    return formatJSONResponse({ message: 'No ingreso una pkey' }, 401);
  }
  if (validatePKey(key)) {
    return formatJSONResponse({ message: 'La pkey ingresada es invalida', key }, 401);
  }
  try {
    const data = <any>event.body;
    const key = generate(16);
    const CardModel = CardSchemaManager.getModel();
    const card = new CardModel({ ...data, token: key });
    const result = await card.save();
    return formatJSONResponse({ message: 'Se creo la tarjeta', token: result.token }, 200);
  } catch (error) {
    return formatJSONResponse({ message: 'Error al crear la tarjeta', error: error.message }, 400);
  }
};

const token: APIGatewayProxyHandler = async event => {
  await Connect.bdConnect();
  const key = String(event.headers.Authorization || '');
  if (existPKey(key)) {
    return formatJSONResponse({ message: 'No ingreso una pkey' }, 401);
  }
  if (validatePKey(key)) {
    return formatJSONResponse({ message: 'La pkey ingresada es invalida', key }, 401);
  }

  try {
    const { token } = event.multiValueQueryStringParameters;
    if (token.toString().length != 16) {
      return formatJSONResponse({ message: 'La token ingresado es invalido' }, 401);
    }
  } catch (error) {
    return formatJSONResponse({ message: 'No se ingreso el parametro token' }, 400);
  }

  const { token } = <any>event.multiValueQueryStringParameters;
  await Connect.bdConnect();
  const CardModel = CardSchemaManager.getModel();
  try {
    const result = await CardModel.findOne({ token: token }, { _id: 0, __v: 0, cvv: 0 });
    if (!result) {
      return formatJSONResponse({ message: 'La key ingresada no existe' }, 400);
    }
    return formatJSONResponse(
      {
        message: 'Informacion de la tarjeta',
        result: result,
      },
      200
    );
  } catch (error) {
    return formatJSONResponse({ message: 'El token expiro', error: error.message }, 400);
  }
};

export const cardService = middyfy(card);
export const tokenService = middyfy(token);

// export { cardService, tokenService };
