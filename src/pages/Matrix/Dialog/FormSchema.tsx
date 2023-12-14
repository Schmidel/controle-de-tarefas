import { z, string, boolean } from "zod";


export type TFormSchema = {
    id: number;
    task: string,
    description: string,
    important: boolean,
    urgent: boolean
  }

export const validationSchema = z.object({
    task: string().min(3, { message: 'Tamanho minimo 3 caracteres' }),
    description: string().min(1, { message: 'Campo necessário' }),
    important: boolean(),
    urgent: boolean()

  })