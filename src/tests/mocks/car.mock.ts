import { ICar } from "../../interfaces/ICar";

const carMock: ICar = {
  model: "Mazda Miata",
  year: 1989,
  color: "red",
  buyValue: 80000,
  seatsQty: 2,
  doorsQty: 2
}

const carMockWhitId: ICar & { _id:string }  = {
  _id: "632372178499fa4f1bb6144b",
  model: "Mazda Miata",
  year: 1989,
  color: "red",
  buyValue: 80000,
  seatsQty: 2,
  doorsQty: 2,
}

const carMockInvalid: any = {
  model: "Audi A4",
  year: 2019,
  color: "b",
  buyValue: 10000,
  doorsQty: 10,
  seatsQty: 5,
  status: true,
}

const carMockWhitIdInvalid: ICar & { _id:string }  = {
  _id: "5f9f1b9b9b9b9b9b9b9b9b9b",
  model: "Audi A4",
  year: 2019,
  color: "b",
  buyValue: 10000,
  doorsQty: 430,
  seatsQty: 5,
  status: true,
}

const carMockChange: ICar = {
  model: "Celta",
  year: 2019,
  color: "black",
  buyValue: 10000,
  doorsQty: 2,
  seatsQty: 5,
  status: true,
}

const carMockChangeWithId: ICar & { _id:string } = {
  _id: "5f9f1b9b9b9b9b9b9b9b9b9b",
  model: "Celta",
  year: 2019,
  color: "black",
  buyValue: 10000,
  doorsQty: 2,
  seatsQty: 5,
  status: true,
}

export default {
  carMock,
  carMockInvalid,
  carMockWhitId,
  carMockWhitIdInvalid,
  carMockChange,
  carMockChangeWithId,
};
