// YRS: LET OP DIT IS EEN PLAYGROUND FILE

import type { PageServerLoad, Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { superValidate, message} from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { formSchema } from "./schema";

// Assuming VITE_AIRTABLE_API_KEY is stored in your .env file
const airtableApiKey = import.meta.env.VITE_AIRTABLE_API_KEY;

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema)),
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));

		if (!form.valid) return fail(400, { form });

		// Prepare the data for Airtable
		const airtableData = {
			records: [
				{
					fields: {
						"First Name": form.data.naam,
						"Telefoon": form.data.telefoonNummer,
						"Postcode": form.data.postcode,
						"Huisnummer": form.data.huisnummer,
						"Email": form.data.email,
						"Dakoppervlak": form.data.dakOppervlak,
						"Daktype": form.data.dakType,
						"Stroomaansluiting": form.data.stroomAansluiting,
						"Klantvragen": form.data.klantOpmerkingen,
						"Privacy": form.data.privacyAkkoord, // Use straight quotes
					},
				},
			],
		};

		// Send the data to Airtable
		try {
			const response = await fetch('https://api.airtable.com/v0/appiUhN3UTNOzb1v3/Svelte%20Contactform', {
				method: "POST",
				headers: {
					Authorization: `Bearer ${airtableApiKey}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(airtableData),
			});

			if (!response.ok) {
				// If the request failed, throw to catch block
				throw new Error(`Airtable API request failed: ${response.status}`);
			}

			// You can do something with the response if needed
			const responseData = await response.json();
			console.log(responseData);

			// Log all form fields
			console.log(form);
		} catch (error) {
			console.error("Failed to send data to Airtable", error);
			// Handle the error appropriately in your application
			return fail(500, { error: "Failed to send data to Airtable" });
		}

		// If everything went well, send a success message
		return message(form, 'Gegevens succesvol ontvangen!');
	}
};