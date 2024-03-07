<form method="POST" action="?/switch" class="w-full space-y-6" use:enhance>
    <Form.Field {form} name="username">
        <Form.Control let:attrs>
            <Form.Label>Username</Form.Label>
            <Input {...attrs} bind:value={$formData.username} />
        </Form.Control>
        <Form.Description>This is your public display name.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <fieldset>
        <legend class="mb-4 text-lg font-medium"> Email Notifications </legend>
    </fieldset>
</form>
    <Form.Field {form} name="username">
        <Form.Control let:attrs>
            <Form.Label>Username</Form.Label>
            <Input {...attrs} bind:value={$formData.username} />
        </Form.Control>
        <Form.Description>This is your public display name.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <fieldset>
        <legend class="mb-4 text-lg font-medium"> Email Notifications </legend>
        <div class="space-y-4">
            <Form.Field {form} name="marketing_emails">
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

            <Form.Field {form} name="security_emails">
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
