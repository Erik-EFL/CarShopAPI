import { expect } from 'chai';
import sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../Middleware/error/catalog';
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/Car.services';
import mock from '../../mocks/car.mock';

describe('Testa a camada Car Service', () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel);

  before(() => {
    /* Danillo Gonçalves me deu uma luz de que esta passando o parâmetro errado para o stub */
    sinon.stub(carModel, 'create').resolves(mock.carMockWhitId);
    sinon.stub(carModel, 'read').resolves([mock.carMockWhitId]);
    sinon.stub(carModel, 'readOne').onCall(0).resolves(mock.carMockWhitId).onCall(1).resolves(null);
    sinon.stub(carModel, 'update').onCall(0).resolves(mock.carMockWhitId).onCall(1).resolves(null);
    sinon.stub(carModel, 'delete').onCall(0).resolves(mock.carMockWhitId).onCall(1).resolves(null);
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
				expect(error).to.be.instanceOf(ZodError);
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
        await carService.readOne('any-id');
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.EntityNotFound);
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
				expect(error.message).to.be.eq(ErrorTypes.EntityNotFound);
      }
    });

    it('Testa se retorna o parsed error', async () => {
      try {
        await carService.update(mock.carMockWhitId._id, mock.carMockInvalid);
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
        await carService.delete('any-id');
      } catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.EntityNotFound);
      }
    });
  });
});
