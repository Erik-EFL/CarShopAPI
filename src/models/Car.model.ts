import { model as mongooseCreateModel, Schema } from 'mongoose';
import MongoModel from './Mongo.model';
import { ICar } from '../interfaces/ICar';

const carMongooseSchema = new Schema<ICar>({
  status: Boolean,
  model: String,
  color: String,
  year: Number,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

export default class CarModel extends MongoModel<ICar> {
  constructor() {
    super(mongooseCreateModel('Car', carMongooseSchema));
  }
}
