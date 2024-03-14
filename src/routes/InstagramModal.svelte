<script lang="ts">
    import { onMount } from 'svelte';

    export let parent: { onClose: () => void };

    onMount(() => {
        const script = document.createElement('script');
        script.src = "https://static.elfsight.com/platform/platform.js";
        script.dataset.useServiceCore = "";
        script.defer = true;
        document.body.appendChild(script);
    });
</script>

<div class="modal-base">
    <button class="modal-close-button" on:click={parent.onClose}>✕</button>
    <div class="elfsight-app-7f8b2962-b83a-4280-8a19-50f982cc5112" data-elfsight-app-lazy></div>
</div>
