import { z } from "zod";

const postalCodeRegex = /^\d{4}\s[A-Z]{2}$/;

export const formSchema = z.object({
    naam: z.string().min(2).max(50),
    email: z.string().email(),
    telefoonNummer: z.string().min(10).max(15).refine(value => value !== '', { message: "Voer een geldig telefoonnummer in" }),
    dakOppervlak: z.number().min(2500, "Minimaal 2500 m2").optional(),
    dakType: z.string().min(1).max(50).refine(value => value !== '', { message: "Kies uw daktype" }),
    stroomAansluiting: z.string().min(1).max(50).refine(value => value !== '', { message: "Kies uw type aansluiting" }),
    klantOpmerkingen: z.string().optional(),
    privacyAkkoord: z.boolean().refine(value => value, { message: "U moet akkoord gaan met de privacy policy" }),
    postcode: z.string().refine(value => postalCodeRegex.test(value), { message: "Ongeldige postcode" }),
    huisnummer: z.string().min(1).max(10),
});

export type FormSchema = typeof formSchema;