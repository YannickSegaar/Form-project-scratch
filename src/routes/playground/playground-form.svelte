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
    {#if browser}
    <SuperDebug data={$formData} />
    {/if}
</div>

<form method="POST" class="mx-auto flex max-w-md flex-col" use:enhance>


                    <!-- YRS DAKOPPERVLAK MUTED (TEST OF DIT LUKT) -->            

        <Form.Field {form} name="dakOppervlak" class="form-field">
            <Form.Control let:attrs>
                <div class="flex flex-col"> <!-- Use flex-col for vertical stacking -->
                    <div class="flex items-center mb-2"> <!-- Flex container for icon and label -->
                        <span class="material-symbols-outlined icon">format_shapes</span>
                        <Form.Label>Dakoppervlak in m² LOCKED FIELD</Form.Label>
                    </div>
                        <Input {...attrs} class="placeholder-custom" type="number" value={roofsizeDrawing} placeholder="2500 m²" disabled />
                </div>
            </Form.Control>
            <Form.Description>
                <p>Volgens de teken tool is de dakgrootte {roofsizeDrawing} m²</p>
                <p>Klopt dit niet? Gebruik dan de schakelaar om dit handmatig in te vullen.</p>
            </Form.Description>
            <Form.FieldErrors />
            </Form.Field>

        <!-- YRS: DAKOPPERVLAK MET TOGGLE ACTION INPUT FIELD VAN PLAYGROUND DIRECTORY -->

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
          <Input {...attrs} class="placeholder-custom" type="number" value={roofsizeDrawing} placeholder="2500 m²" disabled={!$formData.dakoppervlak_toggle} />
        </div>
      </Form.Control>
      <Form.Description>
        Vul hier zelf uw dakoppervlak in
      </Form.Description>
      <Form.FieldErrors />
    </Form.Field>
</div>
            

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

