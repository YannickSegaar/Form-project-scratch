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
    
</script>

<!-- YRS: SuperDebug zorgt voor window met JSON formatting van display form input -->
<div class="mx-auto flex max-w-md flex-col">
    <SuperDebug data={$formData} />
</div>

<form method="POST" class="mx-auto flex max-w-md flex-col" use:enhance>

    <Form.Field {form} name="naam">
                <Form.Control let:attrs>
                    <div class="flex flex-col"> <!-- Changed to flex-col for vertical stacking -->
                        <div class="flex items-center mb-2"> <!-- Added mb-2 for spacing between label/icon and input -->
                            <span class="material-symbols-outlined icon">person</span>
                            <Form.Label>Naam</Form.Label>
                        </div>
                        <div class="flex-1">
                    <Input {...attrs} type="naam" bind:value={$formData.naam} placeholder="Jan Jansen" />
                </Form.Control>
        <Form.Description>Wat is uw naam?</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="email">
        <Form.Control let:attrs>
            <div class="flex flex-col"> <!-- Changed to flex-col for vertical stacking -->
                <div class="flex items-center mb-2"> <!-- Added mb-2 for spacing between label/icon and input -->
                    <span class="material-symbols-outlined icon">mail</span>
                    <Form.Label>Email</Form.Label>
                </div>
                <div class="flex-1">
            <Input {...attrs} type="email" bind:value={$formData.email} placeholder="janjansen@email.nl" />
        </Form.Control>
<Form.Description>Wat is uw emailadres?</Form.Description>
<Form.FieldErrors />
</Form.Field>
    
    <!-- <Form.Field {form} name="email">
        <Form.Control let:attrs>
            <span class="material-symbols-outlined">mail</span>  
            <Form.Label>Email</Form.Label>
            <Input {...attrs} type="email" bind:value={$formData.email} placeholder="janjansen@email.nl" />
        </Form.Control>
        <Form.Description>Wat is uw emailadres?</Form.Description>
        <Form.FieldErrors />
    </Form.Field> -->

    <!-- Select Component Integration for Roof Type -->
    <Form.Field {form} name="dakType">
        <Form.Control let:attrs>
            <Form.Label>Daktype</Form.Label>
            <Select.Root selected={selectedDakType} onSelectedChange={(v) => { v && ($formData.dakType = v.value); }} required>
                <Select.Trigger {...attrs}>
                    <!-- YRS: Hieronder wordt Google icon toegevoegd, zorg dat styling nog wordt aangepast -->
                    <span class="material-symbols-outlined">roofing</span>  
                    <Select.Value placeholder="Kies uw daktype" />
                </Select.Trigger>
                <Select.Content>
                    <Select.Item value="Plat" label="Plat" />
                    <Select.Item value="Schuin" label="Schuin" />
                    <Select.Item value="Kas" label="Kas" />
                </Select.Content>
            </Select.Root>
            <input hidden bind:value={$formData.dakType} name={attrs.name} />
        </Form.Control>
        <Form.Description>Kies uw daktype.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>
    
    <!-- Select Component Integration for stroomAansluiting -->
    <Form.Field {form} name="stroomAansluiting">
        <Form.Control let:attrs>
            <Form.Label>Stroomaansluiting</Form.Label>
            <Select.Root selected={selectedStroomAansluiting} onSelectedChange={(v) => { v && ($formData.stroomAansluiting = v.value); }} required>
                <Select.Trigger {...attrs}>
                    <!-- YRS: Hieronder wordt Google icon toegevoegd, zorg dat styling nog wordt aangepast -->
                    <span class="material-symbols-outlined">electrical_services</span>  
                    <Select.Value placeholder="Kies uw type stroomaansluiting" />
                </Select.Trigger>
                <Select.Content>
                    <Select.Item value="<630 KVA" label="< 630 KVA" />
                    <Select.Item value="630 KVA" label="630 KVA" />
                    <Select.Item value=">630 KVA" label="> 630 KVA" />
                </Select.Content>
            </Select.Root>
            <input hidden bind:value={$formData.stroomAansluiting} name={attrs.name} />
        </Form.Control>
        <Form.Description>Kies uw stroomaansluiting.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="postcode">
        <Form.Control let:attrs>
            <span class="material-symbols-outlined">home</span>  
            <Form.Label>Postcode</Form.Label>
            <Input {...attrs} type="postcode" bind:value={$formData.postcode} placeholder="1234 AA" />
        </Form.Control>
        <Form.Description>Wat is uw postcode?</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="huisnummer">
        <Form.Control let:attrs>
            <span class="material-symbols-outlined">tag</span>  
            <Form.Label>Huisnummer</Form.Label>
            <Input {...attrs} type="huisnummer" bind:value={$formData.huisnummer} placeholder="1 " />
        </Form.Control>
        <Form.Description>Wat is uw huisnummer?</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <!-- Klantopmerkingen text area box -->
     <Form.Field {form} name="klantOpmerkingen">
        <Form.Control let:attrs>
            <span class="material-symbols-outlined">description</span>  
            <Form.Label>Klantvragen en/of opmerkingen</Form.Label>
            <Textarea
                {...attrs}
                placeholder="Zijn er nog vragen of opmerkingen over uw Quickscan?"
                class="resize-none h-32"
                bind:value={$formData.klantOpmerkingen}
            />
            <Form.Description>
                Zijn er nog belangrijke dingen die wij weten moeten weten?
            </Form.Description>
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>

<!-- Checkbox Component Privacyverklaring -->
<Form.Field {form} name="privacyAkkoord">
    <Form.Control let:attrs>
            <Checkbox {...attrs} bind:checked={$formData.privacyAkkoord} />
                <Form.Label>Ik ga akkoord met de verwerking van de bovenstaande gegevens</Form.Label>
                <Form.Description style="font-size: 12px;">
                    <!-- Wij gebruiken deze gegevens enkel om je van informatie over zakelijke zonnepanelen te voorzien. -->
                    Voor meer informatie bekijk onze
                    <a href="https://protium.nl/privacy-policy" target="_blank" rel="noopener noreferrer" style="color: blue; text-decoration: underline;">privacyverklaring</a>.                </Form.Description>
            <input name={attrs.name} value={$formData.privacyAkkoord} hidden />
    </Form.Control>
    <Form.FieldErrors />
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