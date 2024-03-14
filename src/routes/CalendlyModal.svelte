<!-- YRS: Deze file is gemaakt om een embedded Modal te maken zoals te zien is in de Skeleton Docs, maar dan voor 
Calendly appointment page (in Skeleton example gebruiken ze een YouTube video). Deze modal moet in de App Bar komen in de
+layout.svelte file -->

<!-- CalendlyModal.svelte -->

<script lang="ts">
    import { getModalStore } from '@skeletonlabs/skeleton';
	export let parent: { onClose: () => void };
    const modalStore = getModalStore();
	$: console.log($modalStore); // Log the modalStore whenever it changes
</script>

{#if $modalStore[0] && $modalStore[0].component}
<div class="modal-base">
    <button class="modal-close-button" on:click={parent.onClose}>✕</button>
    <iframe
        class="calendly-iframe"
        src="https://calendly.com/solarbotproject/solar-advisory-call"
        title="Calendly"
        frameborder="0"
        allow="fullscreen"
    />
</div>
{/if}
