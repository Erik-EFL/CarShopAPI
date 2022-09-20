import sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Request, Response } from 'express';
import MotorcycleModel from '../../../models/Motorcycle.model';
import MotorcycleService from '../../../services/Motorcycle.services';
import MotorcycleController from '../../../controllers/Motorcycle.controller';
import mock from '../../mocks/motorcycle.mock';

describe('Testa a camada Motorcycle Controller', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);
  const motorcycleController = new MotorcycleController(motorcycleService);

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(motorcycleService, 'create').resolves(mock.motorcycleMockWhitId);
    sinon.stub(motorcycleService, 'read').resolves([mock.motorcycleMock]);
    sinon.stub(motorcycleService, 'readOne').resolves(mock.motorcycleMock);
    sinon.stub(motorcycleService, 'update').resolves(mock.motorcycleMockWhitId);
    sinon.stub(motorcycleService, 'delete').resolves(mock.motorcycleMockWhitId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.sendStatus = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Testa o método #create', async () => {
    it('should create a car', async () => {
      req.body = mock.motorcycleMock;
      await motorcycleController.create(req, res);

      const status = res.status as sinon.SinonStub;
      const json = res.json as sinon.SinonStub;

      expect(status.calledWith(201)).to.be.true;
      expect(json.calledWith(mock.motorcycleMockWhitId)).to.be.true;
    });
  });

  describe('Testa o método #read', async () => {
    it('should read all cars', async () => {
      await motorcycleController.read(req, res);

      const status = res.status as sinon.SinonStub;
      const json = res.json as sinon.SinonStub;

      expect(status.calledWith(200)).to.be.true;
      expect(json.calledWith([mock.motorcycleMock])).to.be.true;
    });
  });
  describe('Testa o método #readOne', async () => {
    it('should read one car', async () => {
      req.params = { id: mock.motorcycleMockWhitId._id };
      await motorcycleController.readOne(req, res);

      const status = res.status as sinon.SinonStub;
      const json = res.json as sinon.SinonStub;

      expect(status.calledWith(200)).to.be.true;
      expect(json.calledWith(mock.motorcycleMock)).to.be.true;
    });
  });

  describe('Testa o método #update', async () => {
    it('should update a car', async () => {
      req.params = { id: mock.motorcycleMockWhitId._id };
      req.body = mock.motorcycleMock;
      await motorcycleController.update(req, res);

      const status = res.status as sinon.SinonStub;
      const json = res.json as sinon.SinonStub;

      expect(status.calledWith(200)).to.be.true;
      expect(json.calledWith(mock.motorcycleMockWhitId)).to.be.true;
    });
  });
  describe('Testa o método #delete', async () => {
    it('should delete a car', async () => {

      req.params = { id: mock.motorcycleMockWhitId._id };

      await motorcycleController.delete(req, res);

      const status = res.sendStatus as sinon.SinonStub;

      expect(status.calledWith(204)).to.be.true;
    });
  });
});
