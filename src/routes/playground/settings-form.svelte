<!-- YRS: LET OP DIT IS EEN PLAYGROUND FILE
 -->
<!-- YRS: Deze code gebruik ik om afzonderlijke form componenten te testen zonder de settings-form.svelte code
te veranderen. Dit is een kopie van de settings-form.svelte code, maar dan met maar één enkele form component -->

<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import * as Select from "$lib/components/ui/select"; // Import Select from shadcn-svelte
    import { formSchema, type FormSchema } from "../settings/schema";
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
    import { roofsizeDrawing } from "../settings/TESTroofsizeDrawing"; // YRS: Import roofsizeDrawing.ts for dynamic roofSize
    import spinner from '$lib/spinner.svg';
    import  { message } from "sveltekit-superforms"; // YRS: Import message for success message

    export let data: SuperValidated<Infer<FormSchema>>;
    
        // YRS: Reactieve variabele toe om de form submission status bij te houden
    let isSubmitted = false;

        const form = superForm(data, {
        validators: zodClient(formSchema),
        delayMs: 50, // Start showing the loading spinner after ...ms, adjust to your needs
        timeoutMs: 8000, // Consider as timeout after ...ms, adjust to your needs
        onUpdated: ({ form: f }) => {
            if (f.valid) {
                toast.success("Form submission successful.");
                isSubmitted = true; // YRS: Verander is submitted naar true
            } else {
                toast.error("Please fix the errors in the form.");
            }
        },
    });

    const { form: formData, enhance, delayed } = form; // Add 'delayed' here
    $: selectedDakType = $formData.dakType ? { label: $formData.dakType, value: $formData.dakType } : undefined;
    $: selectedStroomAansluiting = $formData.stroomAansluiting ? { label: $formData.stroomAansluiting, value: $formData.stroomAansluiting } : undefined;
    
    // YRS: Zorg dat dakOppervlak goed gevalideerd wordt van string naar nummer en dat manual override mogelijk is
    // dakOppervlakInput starts as a string for input binding
    let dakOppervlakInput = '';
    let manualOverride = false;

    // Function to handle manual input, converting input to number and setting manual override
    function handleInput(event: InputEvent) {
        let inputElement = event.target as HTMLInputElement;
        dakOppervlakInput = inputElement.value;
        manualOverride = true;
    }

    // Reactive statement for handling automatic updates or manual overrides
    $: {
        if (!manualOverride && roofsizeDrawing !== undefined) {
            dakOppervlakInput = roofsizeDrawing.toString();
        }
        $formData.dakOppervlak = Number(dakOppervlakInput);
    }
    
</script>

<!-- YRS: SuperDebug zorgt voor window met JSON formatting van display form input -->
<div class="mx-auto flex max-w-md flex-col">
    <SuperDebug data={$formData} />
</div>
  

<form method="POST" class="mx-auto flex max-w-md flex-col" use:enhance>


                    <!-- YRS DAKOPPERVLAK MUTED (TEST OF DIT LUKT) -->            

        <Form.Field {form} name="dakOppervlak" class="form-field">
            <Form.Control let:attrs>
                <div class="flex flex-col"> <!-- Use flex-col for vertical stacking -->
                    <div class="flex items-center mb-2"> <!-- Flex container for icon and label -->
                        <span class="material-symbols-outlined icon">lock</span>
                        <Form.Label>Dakoppervlak in m²</Form.Label>
                    </div>
                        <Input {...attrs} class="placeholder-custom" type="number" bind:value={dakOppervlakInput} placeholder="2500 m²" on:input={handleInput} disabled />
                </div>
            </Form.Control>
            <Form.Description>
                <p>Volgens de teken tool is de dakgrootte {roofsizeDrawing} m²</p>
                <p>Klopt dit niet? Gebruik dan de schakelaar om dit handmatig in te vullen.</p>
            </Form.Description>
            <Form.FieldErrors />
            </Form.Field>

<!-- Checkbox Component Privacyverklaring -->
<Form.Field {form} name="privacyAkkoord" class="form-field">
    <Form.Control let:attrs>
        <Checkbox {...attrs} bind:checked={$formData.privacyAkkoord} />
        <Form.Label style="font-size: 12px;">&nbsp;&nbsp;Ik ga akkoord met de verwerking van de bovenstaande gegevens</Form.Label> 
        <Form.Description style="font-size: 12px;">
            <!-- Wij gebruiken deze gegevens enkel om je van informatie over zakelijke zonnepanelen te voorzien. -->
            Voor meer informatie bekijk onze
            <a href="https://protium.nl/privacy-policy" target="_blank" rel="noopener noreferrer" style="color: blue; text-decoration: underline;">privacyverklaring</a>.
        </Form.Description>
        <input name={attrs.name} value={$formData.privacyAkkoord} hidden />
    </Form.Control>
    <!-- <Form.FieldErrors /> YRS: Default error messages uitgezet. NL foutmeldingen zijn gedefineerd in schema.ts file -->
</Form.Field>

<!-- loading spinner vlak voor submit button -->
{#if $delayed}<img src={spinner} alt="Loading..." class="spinner" />{/if}

<Form.Button class="special-button">
    Verzenden
    <img src="/Protium_logo.png" alt="Protium Logo" class="logo-inside-special-button-right" />
    <img src="/Protium_logo.png" alt="Protium Logo" class="logo-inside-special-button-left" />
  </Form.Button>

  <!-- Display success message after submission -->
{#if isSubmitted}
<div class="success-banner">
    Uw Quickscan gegevens zijn succesvol opgeslagen, een expert van Protium neemt contact met u op ☀️
</div>
{/if}

</form>