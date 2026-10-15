import z from "zod";


export const schemaDidsCreate = z.object({
  dids: z.string().min(10).max(12),
  canais: z.number().positive(),
  data_ativacao: z.coerce.date(),
})

export type DidInput = z.infer<typeof schemaDidsCreate>;