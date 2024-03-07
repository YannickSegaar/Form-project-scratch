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
    <SuperDebug data={$formData} />
</div>

<!-- <form method="POST" class="mx-auto flex max-w-md flex-col" use:enhance>
    <Form.Field {form} name="username">
      <Form.Control let:attrs>
        <Form.Label>Username</Form.Label>
        <Input {...attrs} bind:value={$formData.username} />
      </Form.Control>
      <Form.Description>This is your public display name.</Form.Description>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Button>Submit</Form.Button>
  </form> -->

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
          
        <Form.Field
          {form}
          name="marketing_emails"
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
              bind:checked={$formData.marketing_emails}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field
          {form}
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
    <Form.Button>Submit</Form.Button>
    {#if browser}
      <SuperDebug data={$formData} />
    {/if}
  </form>