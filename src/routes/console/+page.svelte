<script lang="ts">
	import { tick } from 'svelte';

	let key = 'iloveendangeredanimals';
	let consoleContent = 'Server console connected...</br>';

	async function subscribe() {
		try {
			const response = await fetch('/api/generate', {
				method: 'POST',
				body: JSON.stringify({ key: key })
			});
			const reader = response.body?.pipeThrough(new TextDecoderStream()).getReader();
			while (true) {
				const book = await reader?.read();
				if (book?.done) break;

				let value = book?.value ?? '';
				console.log(value);
				if (value == `{"message":"Invalid Authorization"}`) {
					value = "<span class='text-primary-500'>Authorization failed</span>\n";
				}
				value = value.replace(/\n/g, '<br>');
				consoleContent += value;
			}
		} catch (error) {
			console.log(error);
			let value = "<span class='text-primary-500'>Error occured... Try again</span>\n";
			consoleContent += value;
		}
	}

	let chat: HTMLElement;

	function scrollChatBottom(behavior: ScrollBehavior) {
		chat.scrollTo({ top: chat.scrollHeight, behavior });
	}

	$: (async () => {
		if (chat && consoleContent) {
			consoleContent = consoleContent;
			await tick(); // Wait for DOM updates
			scrollChatBottom('smooth');
		}
	})();
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center">
	<div class="flex flex-col center items-center justify-center text-center">
		<h3 class="h1">Generate console</h3>
		<p class="mt-3">
			Watch <span class="text-primary-500 animate-gradient">live</span> as the algorithim
			<span class="text-secondary-500 animate-gradient">finds 10 random species</span>
			and updates the database for everyone!<br />Or as random species are selected from the
			<span class="text-primary-500 animate-gradient">hundreds in our database</span>!
		</p>
		<form
			on:submit|preventDefault={() => subscribe()}
			class="flex flex-col justify-center items-center"
		>
			<input
				bind:value={key}
				name="key"
				type="password"
				placeholder="Enter console password"
				class="input mt-3"
			/>
			<button type="submit" class="btn btn-md btn-disabled variant-filled-primary my-3"
				>Select random from DB</button
			>
			<button type="submit" class="btn btn-md variant-filled-primary mb-3">Generate</button>
		</form>
		<div
			bind:this={chat}
			class="card w-[60vw] h-[50vh] rounded-lg bg-surface-700 overflow-auto p-2 text-left"
		>
			<p>{@html consoleContent}</p>
		</div>
	</div>
</div>
