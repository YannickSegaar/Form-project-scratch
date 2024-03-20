// <!-- YRS: LET OP DIT IS EEN DAKOPPERVLAK DIRECTORY FILE -->

import type { PageServerLoad, Actions } from './$types';
import { json } from '@sveltejs/kit'; // Import json for creating response bodies
import { superValidate, actionResult } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';

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

        if (!form.valid) {
            // Use actionResult for consistency in returning responses
            return actionResult('failure', {
                error: 'Form validation failed',
                form: form.data // Ensure form data is returned for client-side handling
            });
        }

        // Prepare the data for Airtable
        const airtableData = {
            records: [
                {
                    fields: {
                        'First Name': form.data.naam,
                        'Telefoon': form.data.telefoonNummer,
                        'Postcode': form.data.postcode,
                        'Huisnummer': form.data.huisnummer,
                        'Email': form.data.email,
                        'Dakoppervlak': form.data.dakOppervlak,
                        'Dakoppervlak Manual': form.data.dakoppervlakManual,
                        'Dakoppervlak Toggle': form.data.dakoppervlak_toggle,
                        // 'Roofsize Drawing': roofsizeDrawing,
                        'Daktype': form.data.dakType,
                        'Stroomaansluiting': form.data.stroomAansluiting,
                        'Klantvragen': form.data.klantOpmerkingen,
                        'Privacy': form.data.privacyAkkoord, // Use straight quotes
                    },
                },
            ],
        };

        // Send the data to Airtable
        try {
            const response = await fetch('https://api.airtable.com/v0/appiUhN3UTNOzb1v3/Svelte%20Contactform', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${airtableApiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(airtableData),
            });

            if (!response.ok) {
                throw new Error(`Airtable API request failed: ${response.status}`);
            }

            // Assuming the request is successful:
            // Use json() from '@sveltejs/kit' to create the response body correctly
            return json({
                form: form.data, // Make sure to return form data under 'form' key
                message: 'Gegevens succesvol ontvangen!' // Success message
            }, {
                status: 200 // HTTP status code for success
            });

} catch (error) {
	console.error('Failed to send data to Airtable', error);
	// Use actionResult for error handling as well
	return actionResult('error', 'Failed to send data to Airtable', {
		status: 500,
		form: form.data, // Return form data for client-side handling
	} as { status: number, form: typeof form.data });
}
    },
};
