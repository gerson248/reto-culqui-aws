import { Document } from "mongoose";

export interface Card extends Document {
  create_date: Date;
  log_event: number;
  card_number: string;
  cvv: number;
  expiration_month: string;
  expiration_year: string;
  email: string;
  token: string;
}
