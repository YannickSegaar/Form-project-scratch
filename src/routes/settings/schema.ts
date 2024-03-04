import { z } from "zod";

const postalCodeRegex = /^\d{4}[A-Z]{2}$/;

export const formSchema = z.object({
    naam: z.string().min(2, "Wat is uw naam?").max(50, "Naam mag maximaal 50 karakters bevatten"),
    email: z.string().min(8, "Voer een geldig e-mailadres in"),
    telefoonNummer: z.string().min(9, "Voer een geldig telefoonnummer in" ).max(15, "Telefoonnummer mag uit maximaal 15 karakters bestaan"),
    dakOppervlak: z.number().min(2500, "Het dakoppervlak moet minimaal 2500m² zijn"),
    dakType: z.string().refine(value => value !== '', { message: "Kies uw daktype" }),
    stroomAansluiting: z.string().refine(value => value !== '', { message: "Kies uw type stroomaansluiting" }),
    klantOpmerkingen: z.string().optional(),
    privacyAkkoord: z.boolean().refine(value => value),
    postcode: z.string().refine(value => postalCodeRegex.test(value), { message: "Ongeldige postcode" }),
    huisnummer: z.string().min(1, "Voer een geldig huisnummer in").max(10, "Voer een geldig huisnummer in"),
    postalCode: z.string().refine(value => postalCodeRegex.test(value), { message: "Ongeldige postcode" }),

});

export type FormSchema = typeof formSchema;
