//YRS: shadcn-svelte docs form creation

import { z } from "zod";
 
export const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string({ required_error: "Kies uw daktype" }).email()
});
 
export type FormSchema = typeof formSchema;