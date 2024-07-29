<script lang="ts">
	import { onMount } from 'svelte';
	import { pbStore } from 'svelte-pocketbase';
	let records: any[] = [];

	async function fetchRecords() {
		const response = await $pbStore.collection('species').getList(1, 10, {
			sort: '-votes'
		});
		records = response.items;
	}

	onMount(async () => {
		fetchRecords();
	});

	


	import { helix } from 'ldrs'
	import { fade, fly } from 'svelte/transition';

	helix.register()



</script>


<div class="container h-full mx-auto flex flex-col justify-center items-center">
	<div class="flex flex-col justify-center items-center">
		<h1 class="h1 text-6xl my-6">Leaderboard</h1>
		<p class="h5 mb-2">
			<span class="text-primary-500">Top 10</span> voted animals in the RedListVote database!
		</p>
	</div>



	<div class="flex flex-wrap items-center justify-center">
		{#if JSON.stringify(records) == "[]"}
		<l-helix
			class="mt-6"
			size="70"
			speed="2.5" 
			color="white" 
		></l-helix>
		{:else}
			{#each records as specie, index}
				<!-- svelte-ignore a11y-no-static-element-interactions -->

				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="card variant-glass w-fit h-[27rem] mx-2 flex flex-row mb-4 relative overflow-hidden"
					transition:fly
				>
					<div class="w-[20rem]">
						<div
							class="h-[65%] project-hero bg-cover rounded-lg relative"
							style="background-image: url('{specie.image}'); background-position: center center;"
						>
							<p class="absolute mx-3 my-2 h3 text-primary-500 z-20">{specie.votes} votes</p>
						</div>

						<div class="text-left h-[40%] ml-2 -mt-9 relative overflow-auto rounded-lg">
							<div class="flex flex-row items-center">
								<h3 class="h3">{@html specie.common_name}</h3>
							</div>

							<p class="opacity-[65%] mr-2">{@html specie.rationale}</p>
						</div>
					</div>
					<div class="p-2 flex-1 overflow-auto max-w-[40rem]">
						<p class="p">
							<strong class="underline">Scientific name:</strong>
							{specie.scientific_name}
						</p>
						<br />
						<p><strong class="underline">Published year:</strong> {specie.published_year}</p>
						<br />
						<p><strong class="underline">Geographic range:</strong> {@html specie.geographicrange}</p>
						<br />
						<p><strong class="underline">Population:</strong> {@html specie.population}</p>
						<br />
						<p><strong class="underline">Habitat:</strong> {@html specie.habitat}</p>
						<br />
						<p><strong class="underline">Threats:</strong> {@html specie.threats}</p>
						<br />
						<p>
							<strong class="underline">Conservation Efforts: </strong>
							{@html specie.conservationmeasures}
						</p>
						<br />
						<p><strong class="underline">Use/trade:</strong> {@html specie.usetrade}</p>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	.project-hero {
		--mask: linear-gradient(180deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));

		-webkit-mask: var(--mask);
		mask: var(--mask);
	}
</style>
