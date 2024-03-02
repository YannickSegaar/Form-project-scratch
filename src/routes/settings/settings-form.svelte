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
        $: selectedEmail = $formData.email ? { label: $formData.email, value: $formData.email } : undefined;
    </script>

<!-- YRS: SuperDebug zorgt voor window met JSON formatting van display form input -->
<div class="mx-auto flex max-w-md flex-col">
    <SuperDebug data={$formData} />
</div>
    
    <form method="POST" class="mx-auto flex max-w-md flex-col" use:enhance>
        <Form.Field {form} name="username">
            <Form.Control let:attrs>
                <Form.Label>Username</Form.Label>
                <Input {...attrs} bind:value={$formData.username} />
            </Form.Control>
            <Form.Description>This is your public display name.</Form.Description>
            <Form.FieldErrors />
        </Form.Field>
        
        <!-- Select Component Integration -->
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
        </Form.Field>
    
        <Form.Button>Submit</Form.Button>
    </form>

