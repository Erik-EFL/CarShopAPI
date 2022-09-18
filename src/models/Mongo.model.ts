import { Model, UpdateQuery, isValidObjectId } from 'mongoose';
import { ErrorTypes } from '../Middleware/error/catalog';
import { IModel } from '../interfaces/IModel';

export default abstract class MongoModel<T> implements IModel<T> {
  constructor(protected _model: Model<T>) {}

  public async create(obj: T): Promise<T> {
    return this._model.create(obj);
  }

  public async read(): Promise<T[]> {
    return this._model.find();
  }

  public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);
    return this._model.findById(_id);
  }

  public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);
    return this._model.findByIdAndUpdate(
      _id,
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }

  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);
    return this._model.findByIdAndDelete(_id);
  }
}
