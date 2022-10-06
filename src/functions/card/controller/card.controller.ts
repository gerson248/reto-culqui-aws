import { formatJSONResponse } from '@libs/api-gateway';
import type { Context } from 'aws-lambda';
// import { Connect } from 'src/connect/connect';
import { generate, validatePKey, existPKey } from 'src/utils/utils';
import { CardSchemaManager } from '@functions/card/schemas/card.schemas';
let dummyCache = {};
export class CardController {
  async createCard(event: any, context: Context) {
    //check if the request has been cached already.
    if (event.headers['x-idempotence-key'] == undefined) {
      return formatJSONResponse({ message: 'No se encontro x-indempotence-key como header' }, 404);
    }
    // console.log('dummyCache', dummyCache);
    // console.log("event.headers['x-idempotence-key']", dummyCache[event.headers['x-idempotence-key']]);
    if (dummyCache[event.headers['x-idempotence-key']]) {
      return formatJSONResponse({ message: 'Tarjeta ya enviada' }, 304);
    }
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
      dummyCache[event.headers['x-idempotence-key']] = result;
      return formatJSONResponse({ message: 'Se creo la tarjeta', token: result.token }, 200);
    } catch (error) {
      return formatJSONResponse({ message: 'Error al crear la tarjeta', error: error.message }, 400);
    }
  }

  async getCard(event: any, context: Context) {
    if (event.headers['x-idempotence-key'] == undefined) {
      return formatJSONResponse({ message: 'No se encontro x-indempotence-key como header' }, 404);
    }
    if (dummyCache[event.headers['x-idempotence-key']]) {
      return formatJSONResponse({ message: 'Tarjeta ya enviada' }, 304);
    }
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

    try {
      const { token } = <any>event.multiValueQueryStringParameters;
      const CardModel = CardSchemaManager.getModel();
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
      dummyCache[event.headers['x-idempotence-key']] = result;
    } catch (error) {
      return formatJSONResponse({ message: 'El token expiro', error: error.message }, 400);
    }
  }
}
