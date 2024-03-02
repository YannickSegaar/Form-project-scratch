
import type { PageServerLoad, Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { superValidate, message } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { formSchema } from "./schema";
 
export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(formSchema)),
  };
};
 
export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		console.log(form);

		if (!form.valid) return fail(400, { form });

		return message(form, 'Form posted successfully!');
	}
};

//YRS: deze code hieronder werkt is used:

// import type { PageServerLoad, Actions } from "./$types";
// import { fail } from "@sveltejs/kit";
// import { superValidate } from "sveltekit-superforms";
// import { zod } from "sveltekit-superforms/adapters";
// import { formSchema } from "./schema";
 
// export const load: PageServerLoad = async () => {
//   return {
//     form: await superValidate(zod(formSchema)),
//   };
// };
 
// export const actions: Actions = {
//   default: async (event) => {
//     const form = await superValidate(event, zod(formSchema));
//     console.log(form);


//     if (!form.valid) {
//       return fail(400, {
//         form,
//       });
//     }
//     return {
//       form,
//     };
//   },
// };