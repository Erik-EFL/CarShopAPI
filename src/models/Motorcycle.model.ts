import { model as mongooseCreateModel, Schema } from 'mongoose';
import MongoModel from './Mongo.model';
import { IMotorcycle } from '../interfaces/IMotorcycle';

const motorcycleMongooseSchema = new Schema<IMotorcycle>({
  status: Boolean,
  model: String,
  color: String,
  year: Number,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

export default class MotorcycleModel extends MongoModel<IMotorcycle> {
  constructor() {
    super(mongooseCreateModel('Motorcycle', motorcycleMongooseSchema));
  }
}
