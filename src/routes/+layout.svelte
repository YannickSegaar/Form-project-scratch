<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import HoverCard from './hovercard.svelte'; // YRS: Import HoverCard from hovercard.svelte voor testen van hovercard in form
	import CalendlyModal from './CalendlyModal.svelte';
    import { initializeStores, getModalStore, Modal } from '@skeletonlabs/skeleton';

	    // Call this function to ensure the Skeleton store is initialized
		initializeStores();
    const modalStore = getModalStore();

	function openCalendlyModal() {
    console.log('Opening modal'); // This should be logged when you click the Calendar button
    modalStore.trigger({
        type: 'component',
        component: { 
            ref: CalendlyModal, 
            props: { 
                parent: {
                    onClose: () => {
                        console.log('Closing modal');
                        modalStore.close();
                    }
                } 
            }
        },
    });
	console.log($modalStore); // Log the modalStore immediately after triggering the modal
}
</script>


<Modal />
<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				        <!-- Replace title with company logo image -->
						<img 
						src="/Protium Full Name Centered.png" 
						alt="Company Logo" 
						class="logo-in-appbar"
					  />
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://discord.gg/EXqV7W8MtY"
					target="_blank"
					rel="noreferrer"
				>
					Discord
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://twitter.com/SkeletonUI"
					target="_blank"
					rel="noreferrer"
				>
					Twitter
                </a>
				<button class="btn btn-sm variant-ghost-surface" on:click={openCalendlyModal}>
					<span class="material-symbols-outlined icon">event_available</span> Adviesgesprek plannen
				</button>
                <!-- HoverCard component will go here in place of the GitHub link -->
				<div class="hover-card-container">
                <HoverCard />
				</div>
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
    <svelte:fragment slot="pageHeader">Page Header</svelte:fragment>
    <slot />
    <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>
    <svelte:fragment slot="footer">Footer</svelte:fragment>
</AppShell>


