import sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Request, Response } from 'express';
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/Car.services';
import CarController from '../../../controllers/Car.controller';
import mock from '../../mocks/car.mock';

describe('Testa a camada Car Controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create').resolves(mock.carMockWhitId);
    sinon.stub(carService, 'read').resolves([mock.carMock]);
    sinon.stub(carService, 'readOne').resolves(mock.carMock);
    sinon.stub(carService, 'update').resolves(mock.carMockWhitId);
    sinon.stub(carService, 'delete').resolves(mock.carMockWhitId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.sendStatus = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Testa o método #create', async () => {
    it('should create a car', async () => {
      req.body = mock.carMock;
      await carController.create(req, res);

      const status = res.status as sinon.SinonStub;
      const json = res.json as sinon.SinonStub;

      expect(status.calledWith(201)).to.be.true;
      expect(json.calledWith(mock.carMockWhitId)).to.be.true;
    });
  });

  describe('Testa o método #read', async () => {
    it('should read all cars', async () => {
      await carController.read(req, res);

      const status = res.status as sinon.SinonStub;
      const json = res.json as sinon.SinonStub;

      expect(status.calledWith(200)).to.be.true;
      expect(json.calledWith([mock.carMock])).to.be.true;
    });
  });
  describe('Testa o método #readOne', async () => {
    it('should read one car', async () => {
      req.params = { id: mock.carMockWhitId._id };
      await carController.readOne(req, res);

      const status = res.status as sinon.SinonStub;
      const json = res.json as sinon.SinonStub;

      expect(status.calledWith(200)).to.be.true;
      expect(json.calledWith(mock.carMock)).to.be.true;
    });
  });

  describe('Testa o método #update', async () => {
    it('should update a car', async () => {
      req.params = { id: mock.carMockWhitId._id };
      req.body = mock.carMock;
      await carController.update(req, res);

      const status = res.status as sinon.SinonStub;
      const json = res.json as sinon.SinonStub;

      expect(status.calledWith(200)).to.be.true;
      expect(json.calledWith(mock.carMockWhitId)).to.be.true;
    });
  });
  describe('Testa o método #delete', async () => {
    it('should delete a car', async () => {

      req.params = { id: mock.carMockWhitId._id };

      await carController.delete(req, res);

      const status = res.sendStatus as sinon.SinonStub;

      expect(status.calledWith(204)).to.be.true;
    });
  });
});
