<script>
	import store from './store.svelte';

	import Caret from '$lib/components/icons/CaretUpDown.svelte';
	import Vote from './Vote.svelte';

	let current_participant = $state(0);

	const next = (e) => {
		e.preventDefault();

		current_participant += 1;
	};

	const back = (e) => {
		e.preventDefault();

		store.backward();
	};
</script>

<h2 class="mt-0">2. Votazione</h2>

{#each store.participants as participant, index}
	<div class="collapse bg-base-200 mb-6">
		<input type="radio" name="current-participant" bind:group={current_participant} value={index} />
		<div class="collapse-title pr-4">
			<div class="flex justify-between items-center">
				<h3 class="my-0">{participant.name}</h3>
				<Caret className="h-5 w-5 my-0" />
			</div>
		</div>
		<div class="collapse-content">
			<Vote choices={store.choices} {participant} />

			{#if index < store.participants.length - 1}
				<div class="text-right">
					<button onclick={next} class="btn btn-sm btn-secondary mt-6">Prossimo</button>
				</div>
			{/if}
		</div>
	</div>
{/each}

<div class="mt-6 text-right">
	<button class="btn btn-outline btn-neutral" onclick={back}>Indietro</button>
	<input class="btn btn-primary ml-1 min-w-24" type="submit" value="Fine! 🎲" />
</div>
