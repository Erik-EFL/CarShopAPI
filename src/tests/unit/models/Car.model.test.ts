import * as sinon from 'sinon';
import chai, { use } from 'chai';
const { expect } = chai;
import CarModel from '../../../models/Car.model';
import { Model } from 'mongoose';
import { ErrorTypes } from '../../../Middleware/error/catalog';
import mock from '../../mocks/car.mock';
import chaiAsPromised from 'chai-as-promised';

use(chaiAsPromised);

const existentId = '5f9f1b9b9b9b9b9b9b9b9b9b';
const notExistentId = '12345ERROR';

describe('Testa a camada Car Model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(mock.carMockWhitId);
    sinon.stub(Model, 'findOne').resolves(mock.carMockWhitId);
    sinon.stub(Model, 'find').resolves([mock.carMockWhitId]);
    sinon.stub(Model, 'findOneAndUpdate').resolves(mock.carMockChangeWithId);
    sinon.stub(Model, 'findOneAndDelete').resolves(mock.carMockChangeWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Deve testar o método #create', async () => {
    it('Verifica se é criado um objeto com sucesso', async () => {
      const createdCar = await carModel.create(mock.carMock);
      expect(createdCar).to.be.eq(mock.carMockWhitId);
    });

    it('Verifica se é lançado um erro ao criar um objeto inválido', async () => {
      try {
        await carModel.create({} as any);
      } catch (error: any ) {
        expect(error).to.be.eq(ErrorTypes.EntityNotFound);
      }
    });
  });

  describe('Deve testar o método #read', async () => {
    it('Verifica se é retornado um array de objetos', async () => {
      const carArray = await carModel.read();
      expect(carArray).to.be.eql([mock.carMockWhitId]);
    });
  });

  describe('Deve testar o método #readOne', async () => {
    it('Verifica se é retornado um objeto', async () => {
      const car = await carModel.readOne('5f9f1b9b9b9b9b9b9b9b9b9b');
      expect(car).to.be.deep.equal(mock.carMockWhitId);
    });

    it('Verifica se é lançado um erro ao buscar um objeto inválido', async () => {
      try {
        await carModel.readOne('any-id');
      } catch (error: any ) {
        expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('Deve testar o método #update', async () => {
    it('Verifica se é retornado um objeto atualizado', async () => {
      const car = await carModel.update('5f9f1b9b9b9b9b9b9b9b9b9b', mock.carMockChange);
      expect(car).to.be.eq(mock.carMockChangeWithId);
    });

    it('Verifica se é lançado um erro ao atualizar um objeto inválido', async () => {
      try {
        await carModel.update('12345ERROR', mock.carMock);
      } catch (error: any ) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('Deve testar o método #delete', async () => {
    it('Verifica se é retornado um objeto deletado', async () => {
      const car = await carModel.delete('5f9f1b9b9b9b9b9b9b9b9b9b');
      expect(car).to.be.eq(mock.carMockChangeWithId);
    });

    it('Verifica se é lançado um erro ao deletar um objeto inválido', () => {
      expect(carModel.delete(notExistentId)).to.be.rejectedWith(ErrorTypes.InvalidMongoId);
    });
  });
});
