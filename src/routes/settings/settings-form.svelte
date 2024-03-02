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
            <Form.Label>Naam</Form.Label>
            <Input {...attrs} type="naam" bind:value={$formData.naam} placeholder="Jan Jansen" />
        </Form.Control>
        <Form.Description>Wat is uw naam?</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="email">
        <Form.Control let:attrs>
            <Form.Label>Email</Form.Label>
            <Input {...attrs} type="email" bind:value={$formData.email} placeholder="janjansen@email.nl" />
        </Form.Control>
        <Form.Description>Wat is uw emailadres?</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

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

    <!-- Select Component Integration for Roof Type -->
    <Form.Field {form} name="dakType">
        <Form.Control let:attrs>
            <Form.Label>Daktype</Form.Label>
            <Select.Root selected={selectedDakType} onSelectedChange={(v) => { v && ($formData.dakType = v.value); }} required>
                <Select.Trigger {...attrs}>
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
    
    <!-- Select Component Integration for Roof Type -->
    <Form.Field {form} name="stroomAansluiting">
        <Form.Control let:attrs>
            <Form.Label>Stroomaansluiting</Form.Label>
            <Select.Root selected={selectedStroomAansluiting} onSelectedChange={(v) => { v && ($formData.stroomAansluiting = v.value); }} required>
                <Select.Trigger {...attrs}>
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

    <Form.Button>Submit</Form.Button>
</form>
