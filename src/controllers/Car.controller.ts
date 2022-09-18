import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

export default class CarController {
  constructor(private _service: IService<ICar>) {}

  public async create(req: Request, res: Response<ICar>) {
    const car = await this._service.create(req.body);
    res.status(201).json(car);
  }

  public async read(_req: Request, res: Response<ICar[]>) {
    const cars = await this._service.read();
    res.status(200).json(cars);
  }

  public async readOne(req: Request, res: Response<ICar | null>) {
    const car = await this._service.readOne(req.params.id);
    res.status(200).json(car);
  }

  public async update(req: Request, res: Response<ICar | null>) {
    const car = await this._service.update(req.params.id, req.body);
    res.status(200).json(car);
  }

  public async delete(req: Request, res: Response<ICar | null>) {
    const car = await this._service.delete(req.params.id);
    res.status(204).json(car);
  }
}
