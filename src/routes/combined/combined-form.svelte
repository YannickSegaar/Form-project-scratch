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
    import { roofsizeDrawing } from "./TESTroofsizeDrawing"; // YRS: Import roofsizeDrawing.ts for dynamic roofSize
    import spinner from '$lib/spinner.svg';
    import  { message } from "sveltekit-superforms"; // YRS: Import message for success message
    import { Switch } from "$lib/components/ui/switch"; // YRS: Import Switch from shadcn-svelte
    import HoverCard from './hovercard.svelte'; // YRS: Import HoverCard from hovercard.svelte voor testen van hovercard in form
    import { browser } from "$app/environment";
    import { page } from "$app/stores";

export let data: SuperValidated<Infer<FormSchema>> = $page.data.switch;
    
    // export let data: SuperValidated<Infer<FormSchema>>;
    
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
        
    // Reactive assignment based on toggle and manual input
        $: if ($formData.dakoppervlak_toggle && $formData.dakoppervlakManual !== undefined) {
        // If toggle is enabled and manual input is provided, use it
        $formData.dakOppervlak = $formData.dakoppervlakManual;
    } else {
        // Otherwise, fallback to the roofsizeDrawing value
        $formData.dakOppervlak = roofsizeDrawing;
    }



    // // YRS: Zorg dat dakOppervlak goed gevalideerd wordt van string naar nummer en dat manual override mogelijk is
    // // dakOppervlakInput starts as a string for input binding
    // let dakOppervlakInput = '';
    // let manualOverride = false;

    // // Function to handle manual input, converting input to number and setting manual override
    // function handleInput(event: InputEvent) {
    //     let inputElement = event.target as HTMLInputElement;
    //     dakOppervlakInput = inputElement.value;
    //     manualOverride = true;
    // }

    // // Reactive statement for handling automatic updates or manual overrides
    // $: {
    //     if (!manualOverride && roofsizeDrawing !== undefined) {
    //         dakOppervlakInput = roofsizeDrawing.toString();
    //     }
    //     $formData.dakOppervlak = Number(dakOppervlakInput);
    // }
    
</script>
  
   <!-- YRS: SuperDebug zorgt voor window met JSON formatting van display form input -->

   <div class="mx-auto flex max-w-md flex-col">
    {#if browser}
    <SuperDebug data={$formData} />
    {/if}
</div>

<form method="POST" class="mx-auto flex max-w-md flex-col" use:enhance>

    <!-- NAAM -->

    <Form.Field {form} name="naam" class="form-field">
        <Form.Control let:attrs>
            <div class="flex flex-col"> <!-- Use flex-col for vertical stacking -->
                <div class="flex items-center mb-2"> <!-- Flex container for icon and label -->
                    <span class="material-symbols-outlined icon" style="margin-bottom: 0.1rem; font-size: 1.55rem;">person</span> <!-- Inline style for vertical adjustment -->
                    <Form.Label>Naam</Form.Label>
                </div>
                <Input {...attrs} class="placeholder-custom" type="naam" bind:value={$formData.naam} placeholder="Protium NL" />
            </div>
        </Form.Control>
        <!-- <Form.Description>Wat is uw naam?</Form.Description> YRS: omschrijving is overbodig -->
        <Form.FieldErrors />
    </Form.Field>

        <!-- TELEFOONNUMMER -->

        <Form.Field {form} name="telefoonNummer" class="form-field">
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

    <Form.Field {form} name="email" class="form-field">
        <Form.Control let:attrs>
            <div class="flex flex-col"> <!-- Use flex-col for vertical stacking -->
                <div class="flex items-center mb-2"> <!-- Flex container for icon and label -->
                    <span class="material-symbols-outlined icon">mail</span>
                    <Form.Label>E-mail</Form.Label>
                </div>
                <Input {...attrs} class="placeholder-custom" type="email" bind:value={$formData.email} placeholder="hallo@protium.nl" />
            </div>
        </Form.Control>
        <!-- <Form.Description>Wat is uw email?</Form.Description> YRS: omschrijving is overbodig -->
        <Form.FieldErrors /> 
    </Form.Field>


                    <!-- YRS DAKOPPERVLAK MUTED (TEST OF DIT LUKT) -->            

        <Form.Field {form} name="dakOppervlak" class="form-field">
            <Form.Control let:attrs>
                <div class="flex flex-col"> <!-- Use flex-col for vertical stacking -->
                    <div class="flex items-center mb-2"> <!-- Flex container for icon and label -->
                        <span class="material-symbols-outlined icon">lock</span>
                        <Form.Label>Dakoppervlak in m²</Form.Label>
                    </div>
                    <Input {...attrs} class="placeholder-custom" type="number" value={roofsizeDrawing.toString()} disabled />
                </div>
            </Form.Control>
            <Form.Description>
                <p>Volgens de teken tool is de dakgrootte {roofsizeDrawing} m²</p>
                <p>Klopt dit niet? Gebruik dan de schakelaar om dit handmatig in te vullen.</p>
            </Form.Description>
            <Form.FieldErrors />
            </Form.Field>

                    <!-- YRS: Dakoppervlak met toggle action ge-merged van playground directory -->

        <!-- Insert this block after the email input field component in combined-form.svelte -->
<div class="parent-flex-container">
    <Form.Field {form} name="dakoppervlak_toggle" class="child-flex-container">
      <Form.Control let:attrs>
        <div class="space-y-0.5">
          <Form.Label>Dakoppervlak</Form.Label>
          <Form.Description>
            <p>Volgens de teken tool is de dakgrootte {roofsizeDrawing} m²</p>
            <p>Klopt dit niet?</p>
            <p>Gebruik dan de schakelaar om dit handmatig in te vullen.</p>
          </Form.Description>
        </div>
        <Switch includeInput {...attrs} bind:checked={$formData.dakoppervlak_toggle} />
      </Form.Control>
    </Form.Field>
  
    <Form.Field {form} name="dakoppervlakManual" class="form-field">
      <Form.Control let:attrs>
        <div class="flex flex-col">
          <div class="flex items-center mb-2">
            <span class="material-symbols-outlined icon">
              {$formData.dakoppervlak_toggle ? 'lock_open' : 'lock'}
            </span>
            <Form.Label>Dakoppervlak in m²</Form.Label>
          </div>
          <Input {...attrs} class="placeholder-custom" type="number" placeholder="2500 m²" value={roofsizeDrawing} disabled={!$formData.dakoppervlak_toggle} />
        </div>
      </Form.Control>
      <Form.Description>
        Vul hier zelf uw dakoppervlak in
      </Form.Description>
      <Form.FieldErrors />
    </Form.Field>
</div>


            
            <!-- DAKTYPE -->
        <Form.Field {form} name="dakType" class="form-field">
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
                            <Select.Value placeholder="Kies uw daktype" class="select-placeholder" />
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
    <Form.Field {form} name="stroomAansluiting" class="form-field">
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
                        <Select.Item value="Weet ik niet" label="Weet ik niet" />
                    </Select.Content>
                </Select.Root>
                <input hidden bind:value={$formData.stroomAansluiting} name={attrs.name} />
            </div>
        </Form.Control>
        <Form.Description>Kies uw stroomaansluiting.</Form.Description>
        <Form.FieldErrors /> 
    </Form.Field>
    

    <!-- POSTCODE -->

    <Form.Field {form} name="postcode" class="form-field">
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

    <Form.Field {form} name="huisnummer" class="form-field">
        <Form.Control let:attrs>
            <div class="flex flex-col"> <!-- Use flex-col for vertical stacking -->
                <div class="flex items-center mb-2"> <!-- Flex container for icon and label -->
                    <span class="material-symbols-outlined icon">pin</span>
                    <Form.Label>Huisnummer</Form.Label>
                </div>
                <Input {...attrs} class="placeholder-custom" type="huisnummer" bind:value={$formData.huisnummer} placeholder="1 " />
            </div>
        </Form.Control>
        <!-- <Form.Description>Wat is uw huisnummer?</Form.Description>YRS: omschrijving is overbodig -->
        <Form.FieldErrors />
    </Form.Field>


    <!-- KLANTVRAGEN EN/OF OPMERKINGEN TEXTAREA -->

    <Form.Field {form} name="klantOpmerkingen" class="form-field">
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
    <img src="/Protium Favicon Yellow.png" alt="Protium Logo" class="logo-inside-special-button-right" />
    <img src="/Protium Favicon Yellow.png" alt="Protium Logo" class="logo-inside-special-button-left" />
  </Form.Button>

  <!-- Display success message after submission -->
{#if isSubmitted}
<div class="success-banner">
    Uw Quickscan gegevens zijn succesvol opgeslagen, een expert van Protium neemt contact met u op ☀️
</div>
{/if}

</form>

        <!-- YRS: Hovercard van Protium -->
        <div class="hovercard-container">
            <HoverCard />
          </div>