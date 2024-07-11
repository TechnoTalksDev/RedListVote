<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import { votedStore } from '$lib/stores';
	let open = [false, false, false, false, false, false, false, false, false, false];

	function toggleSpecie(index: number) {
		open[index] = !open[index];
	}

	import { pbStore } from 'svelte-pocketbase';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';
	let records: any[] = [];
	async function fetchRecords() {
		const response = await $pbStore.collection('species').getList(1, 50, {
			filter: 'current=true'
		});
		records = response.items;
	}
	onMount(() => {
		fetchRecords();
	});

	let clientVoted = false;

	votedStore.subscribe(() => {
		clientVoted = get(votedStore).yes;
	});

	async function incrementVotes(scientificName: string) {
		try {
			// Fetch the record by scientific_name
			const records = await $pbStore.collection('species').getList(1, 50, {
				filter: `scientific_name="${scientificName}"`,
				expand: 'votes' // Ensure that 'votes' field is included
			});
			// Assuming there is only one record with the specified scientific_name
			const record = records.items[0];
			const currentVotes = record.votes || 0;

			// Increment the votes
			await $pbStore.collection('species').update(record.id, { votes: currentVotes + 1 });

			console.log(`Votes incremented for record with scientific_name: ${scientificName}`);
		} catch (error) {
			console.error('Error incrementing votes:', error);
		}
	}

	async function vote(scientific_name: string) {
		console.log('Voting: ' + scientific_name);
		await incrementVotes(scientific_name);
		await fetchRecords();
		votedStore.set({
			yes: true,
			time: Date.now()
		});
	}
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center">
	<div class="flex flex-col justify-center items-center text-center">
		<h1 class="h1 text-6xl my-6">
			Vote for your <span class="text-primary-500 animate-gradient">favorite</span> of the day!
		</h1>
		<p class="h5 mb-2">
			A random list of endangered animals on the <span class="text-primary-500">IUCN RedList</span
			>...
		</p>
	</div>
	<div class="flex flex-wrap items-center justify-center">
		{#each records as specie, index}
			<!-- svelte-ignore a11y-no-static-element-interactions -->

			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="card card-hover variant-glass w-fit h-[27rem] mx-2 flex flex-row mb-4 relative overflow-hidden"
				on:click={() => toggleSpecie(index)}
			>
				<div class="w-[20rem]">
					<div
						class="h-[65%] project-hero bg-cover rounded-lg relative"
						style="background-image: url('{specie.image}'); background-position: center center;"
					>
						{#if clientVoted}
							<p class="absolute mx-3 my-2 h3 text-primary-500 z-20">{specie.votes} votes</p>
						{/if}
					</div>

					<div class="text-left h-[40%] ml-2 -mt-9 relative overflow-auto rounded-lg">
						<div class="flex flex-row items-center">
							<h3 class="h3">{@html specie.common_name}</h3>
						</div>

						<p class="opacity-[65%] mr-2">{@html specie.rationale}</p>
					</div>
					<!--
                        <CircleChevronUp on:click={() => vote(specie.scientific_name)} size="35" class="absolute bottom-[9.6rem] right-4 shadow-xl z-10"/>
                        -->
					{#if !clientVoted}
						<button
							on:click={() => vote(specie.scientific_name)}
							class="btn btn-sm variant-glass-primary absolute bottom-[9.6rem] left-[15.5rem] shadow-xl z-10"
							>Vote</button
						>
					{/if}
				</div>
				{#if open[index]}
					<div
						class="p-2 flex-1 overflow-auto max-w-[40rem]"
						transition:slide={{ delay: 0, duration: 100, easing: quintOut, axis: 'x' }}
					>
						<p class="p">
							<strong class="underline">Scientific name:</strong>
							{specie.scientific_name}
						</p>
						<br />
						<p><strong class="underline">Published year:</strong> {specie.published_year}</p>
						<br />
						<p>
							<strong class="underline">Geographic range:</strong>
							{@html specie.geographicrange}
						</p>
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
				{/if}
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.animate-gradient {
		background-size: 300%;
		-webkit-animation: animatedgradient 6s ease infinite alternate;
		-moz-animation: animatedgradient 6s ease infinite alternate;
		animation: animatedgradient 6s ease infinite alternate;
	}

	@keyframes animatedgradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	@keyframes scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	.project-hero {
		--mask: linear-gradient(180deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));

		-webkit-mask: var(--mask);
		mask: var(--mask);
	}

	@keyframes wave {
		0% {
			transform: rotate(0deg);
		}
		10% {
			transform: rotate(14deg);
		}
		20% {
			transform: rotate(-8deg);
		}
		30% {
			transform: rotate(14deg);
		}
		40% {
			transform: rotate(-4deg);
		}
		50% {
			transform: rotate(10deg);
		}
		60% {
			transform: rotate(0deg);
		} /* Reset for the next cycle */
		100% {
			transform: rotate(0deg);
		}
	}

	:global(.wave) {
		display: inline-block;
		animation: wave 1.5s infinite;
		transform-origin: 70% 70%;
	}
	/*
	.text-shadow {
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
    }
    .project-hero-top {
    --mask: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0) 100%);

    -webkit-mask: var(--mask);
    mask: var(--mask);
}
    */
</style>
