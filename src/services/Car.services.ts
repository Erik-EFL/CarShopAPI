import { ICar, zodCar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import VehicleService from './Vehicle.services';

export default class CarService extends VehicleService<ICar> {
  constructor(_model: IModel<ICar>, _zodSchema = zodCar) {
    super(_model, _zodSchema);
  }
}
