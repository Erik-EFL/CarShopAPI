import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';

export default class VehicleController<T> {
  constructor(private _service: IService<T>) {}

  public async create(req: Request, res: Response<T>) {
    const car = await this._service.create(req.body);
    res.status(201).json(car);
  }

  public async read(_req: Request, res: Response<T[]>) {
    const cars = await this._service.read();
    res.status(200).json(cars);
  }

  public async readOne(req: Request, res: Response<T | null>) {
    const car = await this._service.readOne(req.params.id);
    res.status(200).json(car);
  }

  public async update(req: Request, res: Response<T | null>) {
    const car = await this._service.update(req.params.id, req.body);
    res.status(200).json(car);
  }

  public async delete(req: Request, res: Response<T | null>) {
    await this._service.delete(req.params.id);
    return res.sendStatus(204);
  }
}
