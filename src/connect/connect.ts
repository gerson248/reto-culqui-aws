import * as mongoose from "mongoose";

export class Connect {
  static async bdConnect(): Promise<any> {
    mongoose.connect(
      "mongodb+srv://admin:3TBLEe9w1UKH41pF@cluster0.lkkm95e.mongodb.net/?retryWrites=true&w=majority"
    );
  }
}
