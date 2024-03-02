
import { z } from "zod";
 
export const formSchema = z.object({
  naam: z.string().min(2).max(50),
  dakType: z.string().min(1).max(50).refine(value => value !== '', { message: "Kies uw daktype" }),
  stroomAansluiting: z.string().min(1).max(50).refine(value => value !== '', { message: "Kies uw type aansluiting" }),
});
 
export type FormSchema = typeof formSchema;


