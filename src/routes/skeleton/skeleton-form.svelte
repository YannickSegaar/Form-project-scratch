<!-- YRS: Deze code bestaat uit de stepper +page.svelte code van Skeleton Stackblitz, ik ga dit proberen te combineren met
mijn dakoppervlak-form.svelte code -->


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
    import HoverCard from '../hovercard.svelte'; // YRS: Import HoverCard from hovercard.svelte voor testen van hovercard in form
    import { browser } from "$app/environment";
    import { page } from "$app/stores";
    import { Stepper, Step } from '@skeletonlabs/skeleton'; //YRS: Stepper importeren van Skeletonlabs
    import { focusTrap } from '@skeletonlabs/skeleton'; //YRS: focusTrap importeren van Skeletonlabs
    import { onMount } from 'svelte';
    import { initGoogle, initAutocomplete } from '../addressValidation';
    import { getPostcodeData } from '../postcodeValidation';
    import { AppBar } from '@skeletonlabs/skeleton'; //YRS: Import App Bar om app bar te maken voor Stepper form
  
  
    let isFocused: boolean = true;
  let isSubmitted: boolean = false;

  // Initialize your form data with default values according to your formSchema
  let defaultFormData: Infer<FormSchema> = {
    postcode: '', // Assuming a string
    huisnummer: '', // Assuming a string
    dakoppervlak_toggle: false, // Assuming a boolean
    dakoppervlakManual: 0, // Assuming a number
    dakType: '', // Assuming a string
    stroomAansluiting: '', // Assuming a string
    naam: '', // Assuming a string
    telefoonNummer: '', // Assuming a string
    email: '', // Assuming a string
    klantOpmerkingen: '', // Assuming a string
    privacyAkkoord: false, // Assuming a boolean
    // Add more fields here as per your formSchema
  };

  // Use the default form data to initialize superForm
  const { form, errors, enhance, allErrors, submit } = superForm(defaultFormData, {
    validators: zodClient(formSchema),
    delayMs: 50,
    timeoutMs: 8000,
    onUpdated: ({ form: f }) => {
      if (f.valid) {
        toast.success("Form submission successful.");
        isSubmitted = true;
      } else {
        toast.error("Please fix the errors in the form.");
      }
    },
  });


	const { form: formData, delayed } = form;
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
        $formData.dakoppervlakManual = Number(dakOppervlakInput);
    }
  

	// Require some user input per step to continue forward
	let initialStepData: Record<string, unknown> = $form;

	function onStepHandler(e: CustomEvent<{ step: number; state: { current: number } }>) {
		if (e.detail.state.current > e.detail.step) {
			// Reset step data (locking the step) when moving forward.
			initialStepData = $form;
		} else {
			// When going back, always allow forward
			initialStepData = {};
		}
	}

	// Lock the next step if no modified form data, or errors exist
	$: locked = initialStepData == $form || !!$allErrors.length;
</script>

   <!-- YRS: SuperDebug zorgt voor window met JSON formatting van display form input -->
  
   <div class="mx-auto flex max-w-md flex-col">
    {#if browser}
    <SuperDebug data={$formData} />
    {/if}
  </div>
  
  <form method="POST" class="mx-auto flex max-w-md flex-col" use:enhance use:focusTrap={isFocused}>
  <AppBar class="appbar-custom p-3 rounded-lg">
    <!-- Your AppBar content here -->
    <svelte:fragment slot="lead">
      <!-- Replace title with company logo image -->
  <img 
  src="/Protium Quickscan Logo.png" 
  alt="Company Logo" 
  class="logo-in-appbar"
  />
  </svelte:fragment>
  </AppBar>
  <Stepper stepTerm="Stap" active="badge-active" class="stepper-custom p-3 rounded-lg" buttonBackLabel="← Terug" buttonNext="stepper-next-button" buttonNextLabel="Volgende Stap →" buttonComplete="stepper-complete-button" buttonCompleteLabel="Verzenden" on:step={onStepHandler} on:complete={() => submit()}>
      <!-- Step 1: Postcode, Huisnummer -->
      <Step {locked} regionHeader="region-header-custom">
        <svelte:fragment slot="header">Voor welke locatie wilt u de Quickscan uitvoeren? </svelte:fragment>
        <svelte:fragment slot="navigation"> <div style="display: none;"></div> </svelte:fragment> <!-- YRS: Deze navigation slot leeg laten zodat "Terug" button voor eerste stap niet getoond wordt --> 
        <div class="first-step-fields-container"> <!-- This is the new container div for the form fields -->
  <!-- Postcode -->
  <Form.Field {form} name="postcode" class="form-field">
    <Form.Control let:attrs>
      <div class="flex flex-col"> 
        <div class="flex items-center mb-2">
          <span class="material-symbols-outlined icon">home</span>
          <Form.Label>Postcode</Form.Label>
        </div>
        <Input {...attrs} class="placeholder-custom select-input-field" type="postcode" bind:value={$formData.postcode} placeholder="1234 AA" />
      </div>
    </Form.Control>
    <Form.FieldErrors class="error-message" /> 
  </Form.Field>
  
  <!-- Huisnummer -->
  <Form.Field {form} name="huisnummer" class="form-field">
    <Form.Control let:attrs>
      <div class="flex flex-col"> 
        <div class="flex items-center mb-2">
          <span class="material-symbols-outlined icon">pin</span>
          <Form.Label>Huisnummer</Form.Label>
        </div>
        <Input {...attrs} class="placeholder-custom select-input-field" type="huisnummer" bind:value={$formData.huisnummer} placeholder="1 " />
      </div>
    </Form.Control>
    <Form.FieldErrors class="error-message" />
  </Form.Field>
  </div>
  
      </Step>
				   <!-- Step 2: Dakoppervlak, Stroomaansluiting, Daktype -->
				   <Step regionHeader="region-header-custom">
					<svelte:fragment slot="header">Locatiekenmerken</svelte:fragment>
					<div class="step-2-container">
					<!-- Include Muted dakoppervlak, Dakoppervlak with action toggle switch, Stroomaansluiting, and Daktype fields here -->
			  
			  <!-- YRS: DAKOPPERVLAK MET TOGGLE SWITCH ACTION -->
			  
			  <div class="parent-flex-container">
				<Form.Field {form} name="dakoppervlak_toggle" class="child-flex-container">
				  <Form.Control let:attrs>
					<!-- Utilize the space-y-* utility to add vertical space -->
					<div class="space-y-2"> <!-- Adjust 'space-y-2' to manage the space between elements -->
					  <Form.Label>Dakoppervlak</Form.Label>
					  <Form.Description>
						<p style="font-size: 12px;">Volgens de teken tool is de dakgrootte <strong>{roofsizeDrawing} m²</strong></p>
						<p style="font-size: 12px;">Klopt dit niet?</p>
						<p style="font-size: 12px;">Gebruik dan de schakelaar om dit handmatig in te vullen.</p>
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
						<Input {...attrs} class="placeholder-custom select-input-field" type="number" placeholder="... m²" bind:value={$formData.dakoppervlakManual} on:input={handleInput} disabled={!$formData.dakoppervlak_toggle} />
					  </div>
					</Form.Control>
					<Form.Description>
					  Vul hier zelf uw dakoppervlak in
					</Form.Description>
					<Form.FieldErrors class="error-message" />
				  </Form.Field>
			  </div>
			  
			  
				<!-- Daktype and Stroomaansluiting Fields (side by side in the third row) -->
				<div class="horizontal-flex"> <!-- Flex container for horizontal fields -->
						  <!-- DAKTYPE -->
						  
					  <Form.Field {form} name="dakType" class="form-field">
						  <Form.Control let:attrs>
							  <div class="flex flex-col"> <!-- Use flex-col for vertical stacking -->
								  <div class="flex items-center mb-2"> <!-- Flex container for icon and label -->
									  <!-- Icon next to the label -->
									  <span class="material-symbols-outlined icon">roofing</span>  
									  <Form.Label>Daktype</Form.Label>
								  </div>
								  <div class="select-background"> <!-- YRS: Class zodat select dropdown menu niet meer doorzichtig is -->
								  <Select.Root selected={selectedDakType} onSelectedChange={(v) => { v && ($formData.dakType = v.value); }} required>
									  <Select.Trigger {...attrs} class="flex items-center"> <!-- Use flex and items-center to align icon with text inside the select -->
										  <!-- Icon inside the select trigger -->
										  <!-- <span class="material-symbols-outlined icon">roofing</span> -->
										  <Select.Value placeholder="Kies uw daktype" class="select-placeholder" />
									  </Select.Trigger>
									  <Select.Content class="select-background"> <!-- YRS: Class zodat select dropdown menu niet meer doorzichtig is -->
										  <Select.Item value="Plat" label="Plat" />
										  <Select.Item value="Schuin" label="Schuin" />
										  <Select.Item value="Kas" label="Kas" />
									  </Select.Content>
								  </Select.Root>
								</div>
								  <input hidden bind:value={$formData.dakType} name={attrs.name} />
							  </div>
						  </Form.Control>
						  <!-- <Form.Description>Kies uw daktype.</Form.Description> YRS: omschrijving is overbodig -->
						  <Form.FieldErrors class="error-message" />
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
							  <div class="select-background"> <!-- YRS: Class zodat select dropdown menu niet meer doorzichtig is -->
							  <Select.Root selected={selectedStroomAansluiting} onSelectedChange={(v) => { v && ($formData.stroomAansluiting = v.value); }} required>
								<Select.Trigger {...attrs} class="flex items-center"> <!-- Use flex and items-center to align icon with text inside the select -->
									  <!-- Icon inside the select trigger -->
									  <!-- <span class="material-symbols-outlined icon">electrical_services</span> -->
									  <Select.Value placeholder="Kies uw stroomaansluiting" style="text-align: left; padding-left: 1rem;" />
								  </Select.Trigger>
								  <Select.Content class="select-background"> <!-- YRS: Class zodat select dropdown menu niet meer doorzichtig is -->
									  <Select.Item value="<630 KVA" label="< 630 KVA" />
									  <Select.Item value="630 KVA" label="630 KVA" />
									  <Select.Item value=">630 KVA" label="> 630 KVA" />
									  <Select.Item value="Weet ik niet" label="Weet ik niet" />
								  </Select.Content>
							  </Select.Root>
							  </div>
							  <input hidden bind:value={$formData.stroomAansluiting} name={attrs.name} />
						  </div>
					  </Form.Control>
					  <!-- <Form.Description>Kies uw stroomaansluiting.</Form.Description> -->
					  <Form.FieldErrors class="error-message" /> 
				  </Form.Field>
				</div>
			  </div>
            </Step>
			  
			<!-- Step 3: Personal Information -->
			<Step regionHeader="region-header-custom">
				<svelte:fragment slot="header">Persoonsgegevens</svelte:fragment>
				<div class="step-3-container"> <!-- Use the new container class -->
				<!-- Include Naam, Telefoonnummer, Email, Klantopmerkingen textarea, PrivacyAkkoord checkbox, and Submit button here -->
		  
			 <!-- NAAM -->
		  
			  <Form.Field {form} name="naam" class="form-field full-width"> <!-- YRS: Apply full-width class voor step 3-->
				  <Form.Control let:attrs>
					  <div class="flex flex-col"> <!-- Use flex-col for vertical stacking -->
						  <div class="flex items-center mb-2"> <!-- Flex container for icon and label -->
							  <span class="material-symbols-outlined icon" style="margin-bottom: 0.1rem; font-size: 1.55rem;">person</span> <!-- Inline style for vertical adjustment -->
							  <Form.Label>Naam</Form.Label>
						  </div>
						  <Input {...attrs} class="placeholder-custom select-input-field" type="naam" bind:value={$formData.naam} placeholder="Protium NL" />
					  </div>
				  </Form.Control>
				  <!-- <Form.Description>Wat is uw naam?</Form.Description> YRS: omschrijving is overbodig -->
				  <Form.FieldErrors class="error-message" />
			  </Form.Field>
		  
				  <!-- TELEFOONNUMMER -->
				  <div class="flex-row"> <!-- YRS: Use the new class for side-by-side layout voor stap 3 -->
				  <Form.Field {form} name="telefoonNummer" class="flex-field"> <!-- YRS: new class "flex-field" voor stap 3 -->
					  <Form.Control let:attrs>
						  <div class="flex flex-col"> <!-- Use flex-col for vertical stacking -->
							  <div class="flex items-center mb-2"> <!-- Flex container for icon and label -->
								  <span class="material-symbols-outlined icon">call</span>
								  <Form.Label>Telefoonnummer</Form.Label>
							  </div>
							  <Input {...attrs} class="placeholder-custom select-input-field" type="tel" bind:value={$formData.telefoonNummer} placeholder=" " />
						  </div>
					  </Form.Control>
					  <!-- <Form.Description>Wat is uw telefoonnummer?</Form.Description> YRS: omschrijving is overbodig -->
					  <Form.FieldErrors class="error-message" /> 
				  </Form.Field>
		  
			  
			  <!-- EMAIL -->
		  
			  <Form.Field {form} name="email" class="flex-field"> <!-- YRS: new class "flex-field" voor stap 3 -->
				  <Form.Control let:attrs>
					  <div class="flex flex-col"> <!-- Use flex-col for vertical stacking -->
						  <div class="flex items-center mb-2"> <!-- Flex container for icon and label -->
							  <span class="material-symbols-outlined icon">mail</span>
							  <Form.Label>E-mail</Form.Label>
						  </div>
						  <Input {...attrs} class="placeholder-custom select-input-field" type="email" bind:value={$formData.email} placeholder="hallo@protium.nl" />
					  </div>
				  </Form.Control>
				  <!-- <Form.Description>Wat is uw email?</Form.Description> YRS: omschrijving is overbodig -->
				  <Form.FieldErrors class="error-message" /> 
			  </Form.Field>
			</div>
		  
			  <!-- KLANTVRAGEN EN/OF OPMERKINGEN TEXTAREA -->
		  
			  <Form.Field {form} name="klantOpmerkingen" class="form-field full-width"> <!-- YRS: nieuwe class voor stap 3 -->
				  <Form.Control let:attrs>
					  <div class="flex flex-col"> <!-- Use flex-col for vertical stacking -->
						  <div class="flex items-center mb-2"> <!-- Flex container for icon and label -->
							  <span class="material-symbols-outlined icon">description</span>
							  <Form.Label>Klantvragen en/of opmerkingen</Form.Label>
						  </div>
						  <Textarea
							  {...attrs}
							  placeholder="Zijn er nog vragen of opmerkingen over uw Quickscan?"
							  class="resize-none h-32 placeholder-custom select-input-field"
							  bind:value={$formData.klantOpmerkingen}
						  />
					  </div>
					  <!-- <Form.Description>
						  Zijn er nog belangrijke dingen die wij moeten weten?
					  </Form.Description> YRS: omschrijving is overbodig -->
				  </Form.Control>
				  <Form.FieldErrors class="error-message" />
			  </Form.Field>
			  
		  <!-- CHECKBOX COMPONENT PRIVACY VERKLARING -->
		  
		  <Form.Field {form} name="privacyAkkoord" class="form-field full-width">
			<Form.Control let:attrs>
				<div style="display: flex; align-items: center;">
					<Checkbox {...attrs} bind:checked={$formData.privacyAkkoord} class="select-input-field" />
					<Form.Label style="font-size: 12px;">&nbsp;&nbsp;Ik ga akkoord met de verwerking van de bovenstaande gegevens</Form.Label>
					<input name={attrs.name} value={$formData.privacyAkkoord} hidden />
				</div>
			</Form.Control>
			<Form.FieldErrors class="error-message" />
			<!-- Separate block for the privacy policy link -->
			<div class="full-width" style="font-size: 12px;">
				Voor meer informatie bekijk onze
				<a href="https://protium.nl/privacy-policy" target="_blank" rel="noopener noreferrer" style="color: blue; text-decoration: underline;">privacyverklaring</a>.
			</div>
		  </Form.Field>
		  
		  <!-- loading spinner vlak voor submit button -->
		  {#if $delayed}<img src={spinner} alt="Loading..." class="spinner" />{/if}
		  
		  <Form.Button class="special-button">
			Verzenden
			<img src="/Protium Favicon Yellow.png" alt="Protium Logo" class="logo-inside-special-button-right" />
			<img src="/Protium Favicon Yellow.png" alt="Protium Logo" class="logo-inside-special-button-left" />
		  </Form.Button>
		  
			<!-- YRS: toevoegen van form button als Stepper Complete button -->
			<!-- <div class="stepper-complete-button">
				Verzenden
				<img src="/Protium Favicon Yellow.png" alt="Protium Logo" class="stepper-complete-logo-left" />
				<img src="/Protium Favicon Yellow.png" alt="Protium Logo" class="stepper-complete-logo-right" />
			  </div> -->
		  
				<!-- "Complete" button with new styling and logos -->
			  <!-- <button class="stepper-complete-button" on:click={handleComplete}>
			Verzenden
			<img src="/Protium Favicon Yellow.png" alt="Protium Logo" class="stepper-complete-logo left" />
			<img src="/Protium Favicon Yellow.png" alt="Protium Logo" class="stepper-complete-logo right" />
		  </button> -->
		  
			<!-- Display success message after submission -->
		  {#if isSubmitted}
		  <div class="success-banner">
			  Uw Quickscan gegevens zijn succesvol opgeslagen, een expert van Protium neemt contact met u op ☀️
		  </div>
		  {/if}
		  <div>
			  </Step>
              
				</Stepper>
			</form>


