<!-- YRS: shadcn-svelte docs form creation -->

<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import * as Select from "$lib/components/ui/select"; // Import Select from shadcn-svelte
    import { formSchema, type FormSchema } from "./schema";
    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { toast } from "svelte-sonner"; // Import toast for notifications
    import { Textarea } from "$lib/components/ui/textarea";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import SuperDebug from "sveltekit-superforms";



    export let data: SuperValidated<Infer<FormSchema>>;

    const form = superForm(data, {
        validators: zodClient(formSchema),
        onUpdated: ({ form: f }) => {
            if (f.valid) {
                toast.success("Form submission successful.");
            } else {
                toast.error("Please fix the errors in the form.");
            }
        },
    });

    const { form: formData, enhance } = form;
    // $: selectedEmail = $formData.email ? { label: $formData.email, value: $formData.email } : undefined; //YRS: email select heb ik gemute
    $: selectedDakType = $formData.dakType ? { label: $formData.dakType, value: $formData.dakType } : undefined;
    $: selectedStroomAansluiting = $formData.stroomAansluiting ? { label: $formData.stroomAansluiting, value: $formData.stroomAansluiting } : undefined;
    
    // YRS: zorg dat dakoppervlak input goed wordt gevalideerd

    let dakOppervlakInput = '';
            $: $formData.dakOppervlak = Number(dakOppervlakInput);

</script>

<!-- YRS: SuperDebug zorgt voor window met JSON formatting van display form input -->
<div class="mx-auto flex max-w-md flex-col">
    <SuperDebug data={$formData} />
</div>
  

<form method="POST" class="mx-auto flex max-w-md flex-col" use:enhance>

        <!-- YRS: POSTAL CODE VALIDATION TRY OUT -->

        <Form.Field {form} name="postalCode">
            <Form.Control let:attrs>
                <div class="flex flex-col"> <!-- Use flex-col for vertical stacking -->
                    <div class="flex items-center mb-2"> <!-- Flex container for icon and label -->
                        <span class="material-symbols-outlined icon">warning</span>
                        <Form.Label>Postal Code Restriction</Form.Label>
                    </div>
                    <Input {...attrs} class="placeholder-custom" type="postcode" bind:value={$formData.postalCode} placeholder="1234 AA" />
                </div>
            </Form.Control>
            <!-- <Form.Description>Wat is uw postcode?</Form.Description>YRS: omschrijving is overbodig -->
            <Form.FieldErrors /> 
        </Form.Field>


    <!-- NAAM -->

    <Form.Field {form} name="naam">
        <Form.Control let:attrs>
            <div class="flex flex-col"> <!-- Use flex-col for vertical stacking -->
                <div class="flex items-center mb-2"> <!-- Flex container for icon and label -->
                    <span class="material-symbols-outlined icon" style="margin-bottom: 0.1rem; font-size: 1.55rem;">person</span> <!-- Inline style for vertical adjustment -->
                    <Form.Label>Naam</Form.Label>
                </div>
                <Input {...attrs} class="placeholder-custom" type="naam" bind:value={$formData.naam} placeholder="Jan Jansen" />
            </div>
        </Form.Control>
        <!-- <Form.Description>Wat is uw naam?</Form.Description> YRS: omschrijving is overbodig -->
        <Form.FieldErrors />
    </Form.Field>

        <!-- TELEFOONNUMMER -->

        <Form.Field {form} name="telefoonNummer">
            <Form.Control let:attrs>
                <div class="flex flex-col"> <!-- Use flex-col for vertical stacking -->
                    <div class="flex items-center mb-2"> <!-- Flex container for icon and label -->
                        <span class="material-symbols-outlined icon">call</span>
                        <Form.Label>Telefoonnummer</Form.Label>
                    </div>
                    <Input {...attrs} class="placeholder-custom" type="tel" bind:value={$formData.telefoonNummer} placeholder=" " />
                </div>
            </Form.Control>
            <!-- <Form.Description>Wat is uw telefoonnummer?</Form.Description> YRS: omschrijving is overbodig -->
            <Form.FieldErrors /> 
        </Form.Field>
    
    <!-- EMAIL -->

    <Form.Field {form} name="email">
        <Form.Control let:attrs>
            <div class="flex flex-col"> <!-- Use flex-col for vertical stacking -->
                <div class="flex items-center mb-2"> <!-- Flex container for icon and label -->
                    <span class="material-symbols-outlined icon">mail</span>
                    <Form.Label>E-mail</Form.Label>
                </div>
                <Input {...attrs} class="placeholder-custom" type="email" bind:value={$formData.email} placeholder="janjansen@email.nl" />
            </div>
        </Form.Control>
        <!-- <Form.Description>Wat is uw email?</Form.Description> YRS: omschrijving is overbodig -->
        <Form.FieldErrors /> 
    </Form.Field>

        <!-- DAKOPPERVLAK -->            

        <Form.Field {form} name="dakOppervlak">
            <Form.Control let:attrs>
                <div class="flex flex-col"> <!-- Use flex-col for vertical stacking -->
                    <div class="flex items-center mb-2"> <!-- Flex container for icon and label -->
                        <span class="material-symbols-outlined icon">fullscreen</span>
                        <Form.Label>Dakoppervlak</Form.Label>
                    </div>
                        <Input {...attrs} class="placeholder-custom" type="number" bind:value={dakOppervlakInput} placeholder="2500 m²" />
                </div>
            </Form.Control>
            <Form.Description>Wat is het dakoppervlak?</Form.Description>
            <Form.FieldErrors />
        </Form.Field>


        <!-- DAKTYPE -->
        <Form.Field {form} name="dakType">
            <Form.Control let:attrs>
                <div class="flex flex-col"> <!-- Use flex-col for vertical stacking -->
                    <div class="flex items-center mb-2"> <!-- Flex container for icon and label -->
                        <!-- Icon next to the label -->
                        <span class="material-symbols-outlined icon">roofing</span>  
                        <Form.Label>Daktype</Form.Label>
                    </div>
                    <Select.Root selected={selectedDakType} onSelectedChange={(v) => { v && ($formData.dakType = v.value); }} required>
                        <Select.Trigger {...attrs} class="flex items-center"> <!-- Use flex and items-center to align icon with text inside the select -->
                            <!-- Icon inside the select trigger -->
                            <!-- <span class="material-symbols-outlined icon">roofing</span> -->
                            <Select.Value placeholder="Kies uw daktype" />
                        </Select.Trigger>
                        <Select.Content>
                            <Select.Item value="Plat" label="Plat" />
                            <Select.Item value="Schuin" label="Schuin" />
                            <Select.Item value="Kas" label="Kas" />
                        </Select.Content>
                    </Select.Root>
                    <input hidden bind:value={$formData.dakType} name={attrs.name} />
                </div>
            </Form.Control>
            <!-- <Form.Description>Kies uw daktype.</Form.Description> YRS: omschrijving is overbodig -->
            <Form.FieldErrors />
        </Form.Field>
    
    <!-- STROOMAANSLUITING -->
    <Form.Field {form} name="stroomAansluiting">
        <Form.Control let:attrs>
            <div class="flex flex-col"> <!-- Use flex-col for vertical stacking -->
                <div class="flex items-center mb-2"> <!-- Flex container for icon and label -->
                    <!-- Icon next to the label -->
                    <span class="material-symbols-outlined icon">electrical_services</span>  
                    <Form.Label>Stroomaansluiting</Form.Label>
                </div>
                <Select.Root selected={selectedStroomAansluiting} onSelectedChange={(v) => { v && ($formData.stroomAansluiting = v.value); }} required>
                    <Select.Trigger {...attrs} class="flex items-center"> <!-- Use flex and items-center to align icon with text inside the select -->
                        <!-- Icon inside the select trigger -->
                        <!-- <span class="material-symbols-outlined icon">electrical_services</span> -->
                        <Select.Value placeholder="Kies uw type stroomaansluiting" style="text-align: left; padding-left: 1rem;" />
                    </Select.Trigger>
                    <Select.Content>
                        <Select.Item value="<630 KVA" label="< 630 KVA" />
                        <Select.Item value="630 KVA" label="630 KVA" />
                        <Select.Item value=">630 KVA" label="> 630 KVA" />
                    </Select.Content>
                </Select.Root>
                <input hidden bind:value={$formData.stroomAansluiting} name={attrs.name} />
            </div>
        </Form.Control>
        <!-- <Form.Description>Kies uw stroomaansluiting.</Form.Description> YRS: omschrijving is overbodig -->
        <Form.FieldErrors /> 
    </Form.Field>
    

    <!-- POSTCODE -->

    <Form.Field {form} name="postcode">
        <Form.Control let:attrs>
            <div class="flex flex-col"> <!-- Use flex-col for vertical stacking -->
                <div class="flex items-center mb-2"> <!-- Flex container for icon and label -->
                    <span class="material-symbols-outlined icon">home</span>
                    <Form.Label>Postcode</Form.Label>
                </div>
                <Input {...attrs} class="placeholder-custom" type="postcode" bind:value={$formData.postcode} placeholder="1234 AA" />
            </div>
        </Form.Control>
        <!-- <Form.Description>Wat is uw postcode?</Form.Description>YRS: omschrijving is overbodig -->
        <Form.FieldErrors /> 
    </Form.Field>

    <!-- HUISNUMMER -->

    <Form.Field {form} name="huisnummer">
        <Form.Control let:attrs>
            <div class="flex flex-col"> <!-- Use flex-col for vertical stacking -->
                <div class="flex items-center mb-2"> <!-- Flex container for icon and label -->
                    <span class="material-symbols-outlined icon">tag</span>
                    <Form.Label>Huisnummer</Form.Label>
                </div>
                <Input {...attrs} class="placeholder-custom" type="huisnummer" bind:value={$formData.huisnummer} placeholder="1 " />
            </div>
        </Form.Control>
        <!-- <Form.Description>Wat is uw huisnummer?</Form.Description>YRS: omschrijving is overbodig -->
        <Form.FieldErrors />
    </Form.Field>


    <!-- KLANTVRAGEN EN/OF OPMERKINGEN TEXTAREA -->

    <Form.Field {form} name="klantOpmerkingen">
        <Form.Control let:attrs>
            <div class="flex flex-col"> <!-- Use flex-col for vertical stacking -->
                <div class="flex items-center mb-2"> <!-- Flex container for icon and label -->
                    <span class="material-symbols-outlined icon">description</span>
                    <Form.Label>Klantvragen en/of opmerkingen</Form.Label>
                </div>
                <Textarea
                    {...attrs}
                    placeholder="Zijn er nog vragen of opmerkingen over uw Quickscan?"
                    class="resize-none h-32 placeholder-custom"
                    bind:value={$formData.klantOpmerkingen}
                />
            </div>
            <!-- <Form.Description>
                Zijn er nog belangrijke dingen die wij moeten weten?
            </Form.Description> YRS: omschrijving is overbodig -->
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    

<!-- Checkbox Component Privacyverklaring -->
<Form.Field {form} name="privacyAkkoord">
    <Form.Control let:attrs>
        <Checkbox {...attrs} bind:checked={$formData.privacyAkkoord} />
        <Form.Label style="font-size: 12px;">Ik ga akkoord met de verwerking van de bovenstaande gegevens</Form.Label>
        <Form.Description style="font-size: 12px;">
            <!-- Wij gebruiken deze gegevens enkel om je van informatie over zakelijke zonnepanelen te voorzien. -->
            Voor meer informatie bekijk onze
            <a href="https://protium.nl/privacy-policy" target="_blank" rel="noopener noreferrer" style="color: blue; text-decoration: underline;">privacyverklaring</a>.
        </Form.Description>
        <input name={attrs.name} value={$formData.privacyAkkoord} hidden />
    </Form.Control>
    <!-- <Form.FieldErrors /> YRS: Default error messages uitgezet. NL foutmeldingen zijn gedefineerd in schema.ts file -->
</Form.Field>

<Form.Button>Submit</Form.Button>
</form>



    <!-- YRS: Deze code component is voor select dropdown menu voor email, ik heb deze gemute, maar gebruik hem als referentie -->
    <!-- Select Component Integration for Email
    <Form.Field {form} name="email">
        <Form.Control let:attrs>
            <Form.Label>Email</Form.Label>
            <Select.Root selected={selectedEmail} onSelectedChange={(v) => { v && ($formData.email = v.value); }}>
                <Select.Trigger {...attrs}>
                    <Select.Value placeholder="Select a verified email to display" />
                </Select.Trigger>
                <Select.Content>
                    <Select.Item value="m@example.com" label="m@example.com" />
                    <Select.Item value="m@google.com" label="m@google.com" />
                    <Select.Item value="m@support.com" label="m@support.com" />
                </Select.Content>
            </Select.Root>
            <input hidden bind:value={$formData.email} name={attrs.name} />
        </Form.Control>
        <Form.Description>You can manage email address in your email settings.</Form.Description>
        <Form.FieldErrors />
    </Form.Field> -->


    <!-- TO DO:
    - Placeholder text font color lichter maken
    - Postcode restrictive input (dat je alleen cijfers en letters kan invoeren)
    - Icon kleuren aanpassen
    - Select dropdown menu's aanpassen (left alignment)
    - Success message, spinners/loaders/toast notifications
 -->
