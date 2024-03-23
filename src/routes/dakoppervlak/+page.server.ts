import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';

const airtableApiKey = import.meta.env.VITE_AIRTABLE_API_KEY;

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(formSchema));
	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));

		console.log('POST', form);

		// If form validation fails, return the form with errors
		if (!form.valid) {
			return fail(400, { form });
		}

		// Prepare the data for Airtable
		const airtableData = {
			records: [
				{
					fields: {
						'First Name': form.data.naam,
						Telefoon: form.data.telefoonNummer,
						Postcode: form.data.postcode,
						Huisnummer: form.data.huisnummer,
						Email: form.data.email,
						Dakoppervlak: form.data.dakOppervlak,
						'Dakoppervlak Manual': form.data.dakoppervlakManual,
						'Dakoppervlak Toggle': form.data.dakoppervlak_toggle,
						Daktype: form.data.dakType,
						Stroomaansluiting: form.data.stroomAansluiting,
						Klantvragen: form.data.klantOpmerkingen,
						Privacy: form.data.privacyAkkoord
					}
				}
			]
		};

		try {
			const response = await fetch(
				'https://api.airtable.com/v0/appiUhN3UTNOzb1v3/Svelte%20Contactform',
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${airtableApiKey}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(airtableData)
				}
			);

			if (!response.ok) {
				// Handle Airtable API errors specifically
				// Log the error or send it back to the client for specific handling
				console.error('Airtable API request failed:', response.statusText);
				// Consider using a custom error message or status to inform the user
				// This retains the form data on the client side
				return message(form, 'Failed to save data to Airtable.', { status: 400 });
			}

			// Process successful response from Airtable
		} catch (error) {
			console.error('Failed to send data to Airtable', error);
			// Handle network or other errors in contacting Airtable
			return message(form, 'Failed to communicate with Airtable.', { status: 500 });
		}

		// If everything went well
		return message(
			form,
			'Uw Quickscan gegevens zijn succesvol opgeslagen, een expert van Protium neemt contact met u op ☀️'
		);

		/*
		return {
			form: form, // This is necessary for sveltekit-superforms to function correctly
			message: 'Gegevens succesvol ontvangen!' // Custom success message
		};
        */
	}
};
