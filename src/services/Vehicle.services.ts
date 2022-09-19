import { ZodSchema } from 'zod';
import { ICar } from '../interfaces/ICar';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';
import { ErrorTypes } from '../Middleware/error/catalog';

export default class VehicleService <T extends ICar | IMotorcycle> implements IService<T> {
  constructor(protected _model: IModel<T>, protected _zodSchema: ZodSchema<T>) {}

  public async create(obj: T): Promise<T> {
    const parsed = this._zodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    return this._model.create(obj);
  }

  public async read(): Promise<T[]> {
    const allCars = await this._model.read();
    return allCars;
  }

  public async readOne(_id: string): Promise<T | null> {
    const car = await this._model.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async update(_id: string, obj: T): Promise<T | null> {
    const parsed = this._zodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const updatedCar = await this._model.update(_id, obj);
    if (!updatedCar) throw new Error(ErrorTypes.EntityNotFound);

    return updatedCar;
  }

  public async delete(_id: string): Promise<T | null> {
    const deletedCar = await this._model.delete(_id);
    if (!deletedCar) throw new Error(ErrorTypes.EntityNotFound);
    return deletedCar;
  }
}
