import { expect } from 'chai';
import sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../Middleware/error/catalog';
import MotorcycleModel from '../../../models/Motorcycle.model';
import MotorcycleService from '../../../services/Motorcycle.services';
import mock from '../../mocks/motorcycle.mock';

describe('Testa a camada Motorcycle Service', () => {
  const motorcycleModel = new MotorcycleModel()
  const motorcycleService = new MotorcycleService(motorcycleModel);

  before(() => {
    sinon.stub(motorcycleService, 'create').resolves(mock.motorcycleMockWhitId);
    sinon.stub(motorcycleService, 'read').resolves([mock.motorcycleMockWhitId]);
    sinon.stub(motorcycleService, 'readOne').onCall(0).resolves(mock.motorcycleMockWhitId).onCall(1).resolves(null);
    sinon.stub(motorcycleService, 'update').onCall(0).resolves(mock.motorcycleMockWhitId).onCall(1).resolves(null);
    sinon.stub(motorcycleService, 'delete').onCall(0).resolves(mock.motorcycleMockWhitId).onCall(1).resolves(null);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Testa o método #create', async () => {
    it('Verifica se é criado um objeto com sucesso', async () => {
      const createdCar = await motorcycleService.create(mock.motorcycleMock);
      expect(createdCar).to.be.deep.equal(mock.motorcycleMockWhitId);
    });

    it('Deve retornar uma falhar', async () => {
      try {
        await motorcycleService.create(mock.motorcycleMockInvalid);
      } catch (error: any) {
				expect(error).to.be.instanceOf(ZodError);
      }
    });
  });

  describe('Testa o método #read', async () => {
    it('Verifica se é retornado um array de objetos', async () => {
      const carArray = await motorcycleService.read();
      expect(carArray).to.be.deep.equal([mock.motorcycleMockWhitId]);
    });
  });
  describe('Testa o método #readOne', async () => {
    it('Verifica se é retornado um objeto', async () => {
      const car = await motorcycleService.readOne(mock.motorcycleMockWhitId._id);
      expect(car).to.be.deep.equal(mock.motorcycleMockWhitId);
    });

    it('Verifica se é lançado um erro ao buscar um id invalido', async () => {
      try {
        await motorcycleService.readOne('any-id');
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.EntityNotFound);
      }
    });
  });

  describe('Testa o método #update', async () => {
    it('Verifica se é retornado um objeto atualizado', async () => {
      const updatedCar = await motorcycleService.update(mock.motorcycleMockWhitId._id, mock.motorcycleMock);
      expect(updatedCar).to.be.eql(mock.motorcycleMockWhitId);
    });

    it('Verifica se é lançado um erro ao atualizar um objeto inválido', async () => {
      try {
        await motorcycleService.update('any-id', mock.motorcycleMock);
      } catch (error: any ) {
				expect(error.message).to.be.eq(ErrorTypes.EntityNotFound);
      }
    });

    it('Testa se retorna o parsed error', async () => {
      try {
        await motorcycleService.update(mock.motorcycleMockWhitId._id, mock.motorcycleMockInvalid);
      } catch (error: any) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });
  });

  describe('Testa o método #delete', async () => {
    it('Verifica se é retornado um objeto deletado', async () => {
      const deletedCar = await motorcycleService.delete(mock.motorcycleMockWhitId._id);
      expect(deletedCar).to.be.deep.eq(mock.motorcycleMockWhitId);
    });

    it('Verifica se é lançado um erro ao deletar um objeto inválido', async () => {
      try {
        await motorcycleService.delete('any-id');
      } catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.EntityNotFound);
      }
    });
  });
});
