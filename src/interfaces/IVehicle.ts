import { z } from 'zod';

const zodVehicle = z.object({
  id: z.string({
    invalid_type_error: 'id must be a string',
  }).optional(),
  model: z.string({
    required_error: 'Model is required',
    invalid_type_error: 'Model must be a string',
  }).min(3, { message: 'Model must be at least 3 characters long' }),
  year: z.number({
    required_error: 'Year is required',
    invalid_type_error: 'Year must be a number',
  }).min(1900, { message: 'Year must be at least 1900' })
    .max(2022, { message: 'Year must be at most 2022' }),
  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  }).min(3, { message: 'Color must be at least 3 characters long' }),
  status: z.boolean({
    invalid_type_error: 'Status must be a boolean',
  }).optional(),
  buyValue: z.number({
    required_error: 'Buy value is required',
    invalid_type_error: 'Buy value must be a number',
  }),
});

type IVehicle = z.infer<typeof zodVehicle>;

export { IVehicle, zodVehicle };
