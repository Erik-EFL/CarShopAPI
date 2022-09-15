import { z } from 'zod';
import { zodVehicle } from './IVehicle';

/* export interface ICar extends IVehicle {
  doorsQty:number,
  seatsQty:number,
} */

const zodCar = z.object({
  ...zodVehicle.shape,
  doorsQty: z.number({
    required_error: 'Doors quantity is required',
    invalid_type_error: 'Doors quantity must be a number',
  }).min(2, { message: 'Doors quantity must be at least 2' })
    .max(4, { message: 'Doors quantity must be at most 4' }),
  seatsQty: z.number({
    required_error: 'Seats quantity is required',
    invalid_type_error: 'Seats quantity must be a number',
  }).min(2, { message: 'Seats quantity must be at least 2' })
    .max(4, { message: 'Seats quantity must be at most 4' }),
});

type ICar = z.infer<typeof zodCar>;

export { zodCar, ICar };
