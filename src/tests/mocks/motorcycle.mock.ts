import { IMotorcycle } from "../../interfaces/IMotorcycle";

const motorcycleMock: IMotorcycle = {
  model: "Honda CB300",
  year: 2022,
  color: "black",
  buyValue: 30510,
  category: "Street",
  engineCapacity: 300
}

const motorcycleMockWhitId: IMotorcycle & { _id:string }  = {
  _id: "632372178499fa4f1bb6144b",
  model: "Honda CB300",
  year: 2022,
  color: "black",
  buyValue: 30510,
  category: "Street",
  engineCapacity: 300
}

const motorcycleMockInvalid: any = {
  model: "Honda CB300",
  year: 2026,
  color: "b",
  buyValue: 30510,
  category: "Street",
  engineCapacity: 300
}

const motorcycleMockWhitIdInvalid: IMotorcycle & { _id:string }  = {
  _id: "632372178499fa4f1bb6144b",
  model: "Honda CB300",
  year: 2026,
  color: "b",
  buyValue: 30510,
  category: "Street",
  engineCapacity: 300,
  status: true,
}

const motorcycleMockChange: IMotorcycle = {
  model: "Honda CB300",
  year: 2026,
  color: "red",
  buyValue: 30510,
  category: "Street",
  engineCapacity: 300,
  status: true,
}

const motorcycleMockChangeWithId: IMotorcycle & { _id:string } = {
  _id: "632372178499fa4f1bb6144b",
  model: "Honda CB300",
  year: 2026,
  color: "red",
  buyValue: 30510,
  category: "Street",
  engineCapacity: 300,
  status: true,
}

export default {
  motorcycleMock,
  motorcycleMockInvalid,
  motorcycleMockWhitId,
  motorcycleMockWhitIdInvalid,
  motorcycleMockChange,
  motorcycleMockChangeWithId,
};
