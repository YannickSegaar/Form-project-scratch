<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import HoverCard from './hovercard.svelte'; // YRS: Import HoverCard from hovercard.svelte voor testen van hovercard in form
</script>

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