import { Router } from 'express';
import CarController from '../controllers/Car.controller';
import CarModel from '../models/Car.model';
import CarService from '../services/Car.services';

const car = Router();

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

car.post('/', (req, res) => carController.create(req, res));
car.get('/:id', (req, res) => carController.readOne(req, res));
car.get('/', (req, res) => carController.read(req, res));
car.put('/:id', (req, res) => carController.update(req, res));
car.delete('/:id', (req, res) => carController.delete(req, res));

export default car;
