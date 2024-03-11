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
    import SuperDebug from "sveltekit-superforms";
    //YRS: Imports van shadcn-svelte website, switch docs:
    import { browser } from "$app/environment";
    import { page } from "$app/stores";
    import { Switch } from "$lib/components/ui/switch";
    import { toast } from "svelte-sonner";
    import { roofsizeDrawing } from "./TESTroofsizeDrawing"; // YRS: Import roofsizeDrawing.ts voor invullen van locked input field
    import HoverCard from './hovercard.svelte'; // YRS: Import HoverCard from hovercard.svelte voor testen van hovercard in form
    import { Button } from "$lib/components/ui/button";
    import * as Tooltip from "$lib/components/ui/tooltip";

    export let data: SuperValidated<Infer<FormSchema>> = $page.data.switch;

        // YRS: Select stroomAansluiting
    $: selectedStroomAansluiting = $formData.stroomAansluiting ? { label: $formData.stroomAansluiting, value: $formData.stroomAansluiting } : undefined;


    const form = superForm(data, {
        validators: zodClient(formSchema),
        onUpdated: ({ form: f }) => {
        if (f.valid) {
            toast.success("You submitted" + JSON.stringify(f.data, null, 2));
        } else {
            toast.error("Please fix the errors in the form.");
        }
        }
    });
    
    const { form: formData, enhance } = form;
    </script>

   <!-- YRS: SuperDebug zorgt voor window met JSON formatting van display form input -->

<div class="mx-auto flex max-w-md flex-col">
{#if browser}
<SuperDebug data={$formData} />
{/if}
</div>

  <form method="POST" class="mx-auto flex max-w-md flex-col" use:enhance>
    <fieldset>
      <legend class="mb-4 text-lg font-medium"> Email Notifications </legend>
      <div class="space-y-4">

        <!-- YRS: TEST STROOMAANSLUITING code -->
<Form.Field {form} name="stroomAansluiting" class="form-field">
    <Form.Control let:attrs>
        <div class="flex flex-col">
            <div class="flex items-center mb-2">
                <span class="material-symbols-outlined icon">electrical_services</span>  
                <Form.Label>Stroomaansluiting</Form.Label>
            </div>
            <Select.Root selected={selectedStroomAansluiting} onSelectedChange={(v) => { v && ($formData.stroomAansluiting = v.value); }} required>
                <Select.Trigger {...attrs} class="flex items-center">
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
    <Form.Description>
        Kies uw stroomaansluiting.
        <!-- Tooltip integration starts here -->
        <div class="tooltip-trigger-container" style="position: relative; display: inline-block;">
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <span class="material-symbols-outlined tooltip-icon" style="cursor: pointer;">help</span>
              </Tooltip.Trigger>
              <Tooltip.Content class="tooltip-content" style="position: absolute; top: 100%; left: 50%; transform: translateX(-50%); display: none; background-color: black; color: white; padding: 8px; border-radius: 4px;">
                <p>Uitleg over stroomaansluiting</p>
              </Tooltip.Content>
            </Tooltip.Root>
        </div>
        <!-- Tooltip integration ends -->
    </Form.Description>
    <Form.FieldErrors /> 
</Form.Field>

<!-- ^^^^^^^ YRS: EINDE TEST STROOMAANSLUITING ^^^^^^ -->

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

        <!-- YRS: USERNAME -->

        <Form.Field {form} name="username">
            <Form.Control let:attrs>
              <Form.Label>Username</Form.Label>
              <Input {...attrs} bind:value={$formData.username} />
            </Form.Control>
            <Form.Description>This is your public display name.</Form.Description>
            <Form.FieldErrors />
          </Form.Field>
          
        <!-- YRS: Originele marketing email form field: -->
          <Form.Field {form}
          name="dakoppervlak_toggle"
          class="flex flex-row items-center justify-between rounded-lg border p-4"
        >
          <Form.Control let:attrs>
            <div class="space-y-0.5">
              <Form.Label>Marketing emails</Form.Label>
              <Form.Description>
                Receive emails about new products, features, and more.
              </Form.Description>
            </div>
            <Switch
              includeInput
              {...attrs}
              bind:checked={$formData.dakoppervlak_toggle}
            />
          </Form.Control>
        </Form.Field>
        <!-- YRS: ^^^Originele marketing email form field:^^^ -->


        <!-- YRS: TEST Marketing Emails met locked input field proberen -->


<div class="parent-flex-container">
    <Form.Field
      {form}
      name="dakoppervlak_toggle"
      class="child-flex-container"
    >
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
  
    <Form.Field {form} name="lockedField" class="form-field">
      <Form.Control let:attrs>
        <div class="flex flex-col">
          <div class="flex items-center mb-2">
            <span class="material-symbols-outlined icon">lock</span>
            <Form.Label>Dakoppervlak in m²</Form.Label>
          </div>
          <Input {...attrs} class="placeholder-custom" type="number" placeholder="2500 m²" disabled />
        </div>
      </Form.Control>
      <Form.Description>
            Vul hier zelf uw dakoppervlak in
      </Form.Description>
      <Form.FieldErrors />
    </Form.Field>
  </div>


        <!-- YRS: ^^^^^^TEST Marketing Emails met locked input field proberen^^^^^^^ -->

<!-- YRS: NIEUWE LOCKED INPUTFIELD MET TOGGLE ACTION -->

<!-- Adjusted dakoppervlak_toggle and lockedField integration -->
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
  
    <Form.Field {form} name="lockedField" class="form-field">
      <Form.Control let:attrs>
        <div class="flex flex-col">
          <div class="flex items-center mb-2">
            <span class="material-symbols-outlined icon">
              {$formData.dakoppervlak_toggle ? 'lock_open' : 'lock'}
            </span>
            <Form.Label>Dakoppervlak in m²</Form.Label>
          </div>
          <Input {...attrs} class="placeholder-custom" type="number" placeholder="2500 m²" disabled={!$formData.dakoppervlak_toggle} />
        </div>
      </Form.Control>
      <Form.Description>
        Vul hier zelf uw dakoppervlak in
      </Form.Description>
      <Form.FieldErrors />
    </Form.Field>
  </div>

  <!-- ^^^^^^YRS: TOGGLE SWITCH ACTION ^^^^ -->
  
        
        <Form.Field {form}
          name="security_emails"
          class="flex flex-row items-center justify-between rounded-lg border p-4"
        >
          <Form.Control let:attrs>
            <div class="space-y-0.5">
              <Form.Label>Security emails</Form.Label>
              <Form.Description>
                Receive emails about your account security.
              </Form.Description>
            </div>
            <Switch
              {...attrs}
              aria-readonly
              disabled
              includeInput
              bind:checked={$formData.security_emails}
            />
          </Form.Control>
        </Form.Field>

      </div>
    </fieldset>

    <Form.Button class="special-button">
        Verzenden
        <img src="/Protium Favicon Yellow.png" alt="Protium Logo" class="logo-inside-special-button-right" />
        <img src="/Protium Favicon Yellow.png" alt="Protium Logo" class="logo-inside-special-button-left" />
      </Form.Button>
  </form>

        <!-- YRS: Hovercard van Protium -->
        <div class="hovercard-container">
            <HoverCard />
          </div>