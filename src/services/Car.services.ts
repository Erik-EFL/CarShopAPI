import { ICar, zodCar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';
import { ErrorTypes } from '../Middleware/error/catalog';

export default class CarService implements IService<ICar> {
  constructor(protected _car: IModel<ICar>) {}

  public async create(obj: ICar): Promise<ICar> {
    const parsed = zodCar.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    return this._car.create(obj);
  }

  public async read(): Promise<ICar[]> {
    const allCars = await this._car.read();
    return allCars;
  }

  public async readOne(_id: string): Promise<ICar | null> {
    const car = await this._car.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async update(_id: string, obj: ICar): Promise<ICar | null> {
    const parsed = zodCar.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const updatedCar = await this._car.update(_id, obj);
    if (!updatedCar) throw new Error(ErrorTypes.EntityNotFound);

    return updatedCar;
  }

  public async delete(_id: string): Promise<ICar | null> {
    const deletedCar = await this._car.delete(_id);
    if (!deletedCar) throw new Error(ErrorTypes.EntityNotFound);
    return deletedCar;
  }
}
