// YRS: LET OP DIT IS EEN PLAYGROUND FILE

import { z } from "zod";

// YRS: postalCodeRegex staat 1234 AB, 1234AB, 1234 ab, 1234 ab, 1234  ab, 1234  AB toe
const postalCodeRegex = /^\d{4}\s*[A-Za-z]{2}\s*$/; 

export const formSchema = z.object({
    naam: z.string().min(2, "Wat is uw naam?").max(50, "Naam mag maximaal 50 karakters bevatten"),
    email: z.string().min(8, "Voer een geldig e-mailadres in"),
    telefoonNummer: z.string().min(9, "Voer een geldig telefoonnummer in" ).max(15, "Telefoonnummer mag uit maximaal 15 karakters bestaan"),
    dakOppervlak: z.number().min(2500, "Het dakoppervlak moet minimaal 2500 m² zijn"),
    dakOppervlakMuted: z.number().min(2500, "Het dakoppervlak moet minimaal 2500 m² zijn"),
    dakType: z.string().refine(value => value !== '', { message: "Kies uw daktype" }),
    stroomAansluiting: z.string().refine(value => value !== '', { message: "Kies uw type stroomaansluiting" }),
    klantOpmerkingen: z.string().optional(),
    privacyAkkoord: z.boolean().refine(value => value),
    postcode: z.string().refine(value => postalCodeRegex.test(value), { message: "Ongeldige postcode" }),
    huisnummer: z.string().min(1, "Voer een geldig huisnummer in").max(10, "Voer een geldig huisnummer in"),
    roofsizeSwitch: z.boolean().refine(value => value), //YRS: This is the switch that will be used to determine if the roofsize is drawn or not
    roofsizeManual: z.number().min(2500, "Het dakoppervlak moet minimaal 2500 m² zijn"), //YRS: Dit is de manual input voor de dakgrootte
});

export type FormSchema = typeof formSchema;
