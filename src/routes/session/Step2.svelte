<script>
	import { step, participants, choices } from './store';
	import Rating from '$lib/components/Rating.svelte';
	import Caret from '$lib/components/icons/CaretUpDown.svelte';

	let current_participant = 0;
</script>

<h2 class="mt-0">2. Votazione</h2>

{#each $participants as participant, index}
	<div class="collapse bg-base-200 mb-6">
		<input type="radio" name="current-participant" bind:group={current_participant} value={index} />
		<div class="collapse-title pr-4">
			<div class="flex justify-between items-center">
				<h3 class="my-0">{participant.name}</h3>
				<Caret class="h-5 w-5 my-0" />
			</div>
		</div>
		<div class="collapse-content">
			{#each $choices as choice}
				<Rating {participant} {choice} />
			{/each}

			{#if index < $participants.length - 1}
				<div class="text-right">
					<button
						on:click|preventDefault={() => (current_participant += 1)}
						class="btn btn-sm btn-secondary mt-6">Prossimo</button
					>
				</div>
			{/if}
		</div>
	</div>
{/each}

<div class="mt-6 text-right">
	<button class="btn btn-outline btn-neutral" on:click|preventDefault={() => step.set(1)}
		>Indietro</button
	>
	<input class="btn btn-primary ml-1 min-w-24" type="submit" value="Fine! 🎲" />
</div>
