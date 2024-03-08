<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
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
    // let data: SuperValidated<Infer<FormSchema>> = $page.data.switch;
    // export { data as form };

    export let data: SuperValidated<Infer<FormSchema>> = $page.data.switch;

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
        <img src="/Protium_logo.png" alt="Protium Logo" class="logo-inside-special-button-right" />
        <img src="/Protium_logo.png" alt="Protium Logo" class="logo-inside-special-button-left" />
      </Form.Button>
  </form>