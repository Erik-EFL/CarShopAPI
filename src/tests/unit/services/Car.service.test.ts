import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../Middleware/error/catalog';
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/Car.services';
import mock from '../../mocks/car.mock';

describe('Testa a camada Car Service', () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carService, 'create').resolves(mock.carMockWhitId);
    sinon.stub(carService, 'read').resolves([mock.carMockWhitId]);
    sinon.stub(carService, 'readOne').onCall(0).resolves(mock.carMockWhitId).onCall(1).resolves(null);
    sinon.stub(carService, 'update').onCall(0).resolves(mock.carMockWhitId).onCall(1).resolves(null);
    sinon.stub(carService, 'delete').onCall(0).resolves(mock.carMockWhitId).onCall(1).resolves(null);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Testa o método #create', async () => {
    it('Verifica se é criado um objeto com sucesso', async () => {
      const createdCar = await carService.create(mock.carMock);
      expect(createdCar).to.be.deep.equal(mock.carMockWhitId);
    });

    it('Deve retornar uma falhar', async () => {
      try {
        await carService.create(mock.carMockInvalid);
      } catch (error: any) {
				const err = error as Error;
				expect(err.message).to.be.instanceOf(ZodError);
      }
    });
  });

  describe('Testa o método #read', async () => {
    it('Verifica se é retornado um array de objetos', async () => {
      const carArray = await carService.read();
      expect(carArray).to.be.deep.equal([mock.carMockWhitId]);
    });
  });
  describe('Testa o método #readOne', async () => {
    it('Verifica se é retornado um objeto', async () => {
      const car = await carService.readOne(mock.carMockWhitId._id);
      expect(car).to.be.deep.equal(mock.carMockWhitId);
    });

    it('Verifica se é lançado um erro ao buscar um id invalido', async () => {
      try {
        await carService.readOne('123');
      } catch (error: any) {
        const err = error as Error;
        expect(err.message).to.be.equal(ErrorTypes.EntityNotFound);
      }
    });
  });

  describe('Testa o método #update', async () => {
    it('Verifica se é retornado um objeto atualizado', async () => {
      const updatedCar = await carService.update(mock.carMockWhitId._id, mock.carMock);
      expect(updatedCar).to.be.eql(mock.carMockWhitId);
    });

    it('Verifica se é lançado um erro ao atualizar um objeto inválido', async () => {
      try {
        await carService.update('any-id', mock.carMock);
      } catch (error: any ) {
				const err = error as Error;
				expect(err.message).to.be.eq(ErrorTypes.EntityNotFound);
      }

      it('Items of object not conform.', async () => {
        try {
          await carService.update('any-id', mock.carMock);
        } catch (error: any ) {
          expect(error).to.be.instanceOf(ZodError);
        }
      });
    });

    it('Failure - Zod Fails', async () => {
      try {
        await carService.update('any-id', mock.carMockWhitIdInvalid);
      } catch (error: any) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });
  });

  describe('Testa o método #delete', async () => {
    it('Verifica se é retornado um objeto deletado', async () => {
      const deletedCar = await carService.delete(mock.carMockWhitId._id);
      expect(deletedCar).to.be.deep.eq(mock.carMockWhitId);
    });

    it('Verifica se é lançado um erro ao deletar um objeto inválido', async () => {
      try {
        await carService.delete('123');
      } catch (error ) {
				const err = error as Error;
				expect(err.message).to.be.eq(ErrorTypes.EntityNotFound);
      }
    });
  });
});
