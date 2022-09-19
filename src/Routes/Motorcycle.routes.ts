import { Router } from 'express';
import MotorcycleController from '../controllers/Motorcycle.controller';
import MotorcycleModel from '../models/Motorcycle.model';
import MotorcycleService from '../services/Motorcycle.services';

const motorcycle = Router();

const Model = new MotorcycleModel();
const Service = new MotorcycleService(Model);
const Controller = new MotorcycleController(Service);

motorcycle.post('/', (req, res) => Controller.create(req, res));
motorcycle.get('/:id', (req, res) => Controller.readOne(req, res));
motorcycle.get('/', (req, res) => Controller.read(req, res));
motorcycle.put('/:id', (req, res) => Controller.update(req, res));
motorcycle.delete('/:id', (req, res) => Controller.delete(req, res));

export default motorcycle;
