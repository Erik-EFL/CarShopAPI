import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../Middleware/error/catalog';

export default abstract class MongoModel<T> implements IModel<T> {
  constructor(protected _model: Model<T>) {}

  public async create(_obj: T): Promise<T> {
    const created = await this._model.create(_obj);
    return created;
  }

  public async read(): Promise<T[]> {
    const carArray = await this._model.find();
    return carArray;
  }

  public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) {
      throw new Error(ErrorTypes.InvalidMongoId);
    }
    const foundedCar = await this._model.findById({ _id });
    return foundedCar;
  }

  public async update(_id: string, _obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) {
      throw new Error(ErrorTypes.InvalidMongoId);
    }
    const updated = await this._model.findByIdAndUpdate(
      { _id },
      { ..._obj } as UpdateQuery<T>,
      { new: true },
    );
    return updated;
  }

  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId({ _id })) {
      throw new Error(ErrorTypes.InvalidMongoId);
    }
    const deleted = await this._model.findByIdAndDelete({ _id });
    return deleted;
  }
}
