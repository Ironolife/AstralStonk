import { AxiosResponse } from 'axios';
import { ZodSchema } from 'zod';

export const onResponse =
  <T>(schema: ZodSchema<any>) =>
  (res: AxiosResponse<T>) => {
    const result = schema.safeParse(res.data);

    if (result.success) return result.data;

    console.warn(result.error);
    return res.data;
  };
