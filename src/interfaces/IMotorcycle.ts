import { z } from 'zod';
import { zodVehicle } from './IVehicle';

const zodMotorcycle = zodVehicle.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number({
    required_error: 'engineCapacity is required',
    invalid_type_error: 'engineCapacity must be a number',
  }).int().positive().lte(2500),
});

type IMotorcycle = z.infer<typeof zodMotorcycle>;

export { zodMotorcycle, IMotorcycle };
