

import { z } from "zod";
 
export const formSchema = z.object({
  username: z.string().min(2).max(50),
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean().default(true),
});
 
export type FormSchema = typeof formSchema;

// import { z } from "zod";

// export const formSchema = z.object({
//   marketing_emails: z.boolean().default(false).optional(),
//   security_emails: z.boolean().default(true),
//   notities: z.string().optional(),
// });
// export type FormSchema = typeof formSchema;