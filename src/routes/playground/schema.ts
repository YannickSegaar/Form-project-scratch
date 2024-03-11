

import { z } from "zod";
 
export const formSchema = z.object({
  dakoppervlak_toggle: z.boolean().default(false).optional(),
  lockedField: z.number().default(5).optional(),
});
 
export type FormSchema = typeof formSchema;
