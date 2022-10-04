import * as mongoose from "mongoose";
import { Card } from "../interfaces/card.interface";

export class CardSchemaManager {
  static getModel(): mongoose.Model<Card> {
    let CardModel: mongoose.Model<Card>;
    const cardSchema = new mongoose.Schema({
      create_date: { type: Date, expires: 15 * 60, default: Date.now },
      log_event: { type: Number },
      card_number: {
        type: Number,
        required: true,
        validate: {
          validator: (card: number) => {
            return 13 <= card.toString().length && card.toString().length <= 16;
          },
          message: "El numero de tarjeta debe contener entre 13 y 16 numeros",
        },
      },
      cvv: {
        type: Number,
        required: true,
        min: [100, "El cvv debe contener entre 3 y 4 numeros"],
        max: [999, "El cvv debe contener entre 3 y 4 numeros"],
      },
      expiration_month: {
        type: String,
        required: true,
        validate: {
          validator: (month: string) => {
            return 1 <= parseInt(month) && parseInt(month) <= 12;
          },
          message: "El mes de expiracion debe estar entre 1 y 12",
        },
        minlength: 1,
        maxlength: 2,
      },
      expiration_year: {
        type: String,
        required: true,
        validate: {
          validator: (year: string) => {
            const year_current = new Date().getFullYear();
            return (
              year_current <= parseInt(year) &&
              parseInt(year) <= year_current + 5
            );
          },
          message:
            "El año de expiracion debe estar entre el actual y como maximo 5 años",
        },
        length: [4, "El año debe contener 4 numeros"],
      },
      email: {
        type: String,
        required: true,
        minlength: [5, "El email debe contener entre 5 y 100 numeros"],
        maxlength: [100, "El email debe contener entre 5 y 100 numeros"],
        match: [/(.*)@(gmail|hotmail|yahoo)\.com$/, "Correo invalido"],
      },
      token: {
        type: String,
        required: true,
        validate: {
          validator: (token_current: string) => {
            return token_current.length == 16;
          },
          message: "El token debe tener un longitud de 16 numeros",
        },
      },
    });
    CardModel =
      mongoose.models.Card || mongoose.model<Card>("Card", cardSchema);
    return CardModel;
  }
}
