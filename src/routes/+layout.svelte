<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { pbStore } from 'svelte-pocketbase';
	import { env } from '$env/dynamic/public';

	pbStore.set(env.PUBLIC_POCKETBASE_URL);

	import { initializeStores, Toast } from '@skeletonlabs/skeleton';

	initializeStores();
</script>

<Toast />
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/"><strong class="text-xl uppercase">RedListVote</strong></a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a class="btn btn-sm variant-ghost-surface" href="/vote" rel="noreferrer"> Vote </a>
				<a class="btn btn-sm variant-ghost-surface" href="/leaderboard" rel="noreferrer">
					Leaderboard
				</a>
				<a class="btn btn-sm variant-ghost-surface" href="/login" rel="noreferrer"> Login </a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<svelte:fragment slot="pageFooter">
		<div>
			<p class="text-center opacity-60">
				IUCN 2024. IUCN Red List of Threatened Species. Version 2024-1 <a
					href="https://www.iucnredlist.org"
					target="_blank"
					class="text-primary-500">www.iucnredlist.org</a
				>
			</p>
		</div>
	</svelte:fragment>
</AppShell>
