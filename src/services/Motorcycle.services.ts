import { IMotorcycle, zodMotorcycle } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import VehicleService from './Vehicle.services';

export default class MotorcycleService extends VehicleService<IMotorcycle> {
  constructor(_model: IModel<IMotorcycle>, _zodSchema = zodMotorcycle) {
    super(_model, _zodSchema);
  }
}
