
import { z } from "zod";
 
export const formSchema = z.object({
  naam: z.string().min(2).max(50),
  email: z.string().email(),
  dakType: z.string().min(1).max(50).refine(value => value !== '', { message: "Kies uw daktype" }),
  stroomAansluiting: z.string().min(1).max(50).refine(value => value !== '', { message: "Kies uw type aansluiting" }),
  klantOpmerkingen: z.string().optional(), //YRS: text area waarin klant eventuele opmerkingen kan toevoegen
});
 
export type FormSchema = typeof formSchema;


