import * as sinon from 'sinon';
import chai, { use } from 'chai';
const { expect } = chai;
import MotorcycleModel from '../../../models/Motorcycle.model';
import { Model } from 'mongoose';
import { ErrorTypes } from '../../../Middleware/error/catalog';
import mock from '../../mocks/motorcycle.mock';
/* import chaiAsPromised from 'chai-as-promised';

use(chaiAsPromised); */

const notExistentId = '12345ERROR';

describe('Testa a camada Motorcycle Model', () => {
  const motorcycleModel = new MotorcycleModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(mock.motorcycleMockWhitId);
    sinon.stub(Model, 'findOne').resolves(mock.motorcycleMockWhitId);
    sinon.stub(Model, 'find').resolves([mock.motorcycleMockWhitId]);
    sinon.stub(Model, 'findOneAndUpdate').resolves(mock.motorcycleMockChangeWithId);
    sinon.stub(Model, 'findOneAndDelete').resolves(mock.motorcycleMockChangeWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Deve testar o método #create', async () => {
    it('Verifica se é criado um objeto com sucesso', async () => {
      const createdMotorcycle = await motorcycleModel.create(mock.motorcycleMock);
      expect(createdMotorcycle).to.be.eq(mock.motorcycleMockWhitId);
    });

    it('Verifica se é lançado um erro ao criar um objeto inválido', async () => {
      try {
        await motorcycleModel.create({} as any);
      } catch (error: any ) {
        expect(error).to.be.eq(ErrorTypes.EntityNotFound);
      }
    });
  });

  describe('Deve testar o método #read', async () => {
    it('Verifica se é retornado um array de objetos', async () => {
      const motorcycleArray = await motorcycleModel.read();
      expect(motorcycleArray).to.be.eql([mock.motorcycleMockWhitId]);
    });
  });

  describe('Deve testar o método #readOne', async () => {
    it('Verifica se é retornado um objeto', async () => {
      const motorcycle = await motorcycleModel.readOne('5f9f1b9b9b9b9b9b9b9b9b9b');
      expect(motorcycle).to.be.deep.equal(mock.motorcycleMockWhitId);
    });

    it('Verifica se é lançado um erro ao buscar um objeto inválido', async () => {
      try {
        await motorcycleModel.readOne('any-id');
      } catch (error: any ) {
        expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('Deve testar o método #update', async () => {
    it('Verifica se é retornado um objeto atualizado', async () => {
      const motorcycle = await motorcycleModel.update('5f9f1b9b9b9b9b9b9b9b9b9b', mock.motorcycleMockChange);
      expect(motorcycle).to.be.eq(mock.motorcycleMockChangeWithId);
    });

    it('Verifica se é lançado um erro ao atualizar um objeto inválido', async () => {
      try {
        await motorcycleModel.update('12345ERROR', mock.motorcycleMock);
      } catch (error: any ) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('Deve testar o método #delete', async () => {
    it('Verifica se é retornado um objeto deletado', async () => {
      const motorcycle = await motorcycleModel.delete('5f9f1b9b9b9b9b9b9b9b9b9b');
      expect(motorcycle).to.be.eq(mock.motorcycleMockChangeWithId);
    });

    it('Verifica se é lançado um erro ao deletar um objeto inválido', () => {
      expect(motorcycleModel.delete(notExistentId)).to.be.rejectedWith(ErrorTypes.InvalidMongoId);
    });
  });
});
