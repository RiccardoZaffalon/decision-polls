<script lang="ts">
	import Timer from '$lib/components/Timer.svelte';

	let timerStart = $state(Date.now());
	let paused = $state(true);
	let duration = $state(2);

	const alphabets = {
		easy: 'abcdefgilmnoprstuv',
		difficult: 'abcdefghilmnopqrstuvz'
	};

	let useDifficult = $state(false);

	let alphabet = $derived.by(() => {
		if (useDifficult) {
			return alphabets['difficult'].split('');
		}

		return alphabets['easy'].split('');
	});

	let letters: string[] = $state([]);
	let letter = $derived.by(() => letters[letters.length - 1]);

	let finished = $derived(letters.length >= alphabet.length);

	function newLetter() {
		if (finished) {
			paused = true;
			return;
		}

		paused = false;
		timerStart = Date.now();
		const index = Math.floor(Math.random() * alphabet.length);
		const letter = alphabet[index];

		if (letters.includes(letter)) {
			return newLetter();
		}

		letters.push(letter);
	}

	function reset() {
		paused = true;
		timerStart = Date.now();
		letters = [];
	}
</script>

<p class="min-h-[1em] m-0 leading-none text-center font-serif text-[8rem] font-bold uppercase">
	{letter}
</p>

<Timer start={timerStart} {paused} {duration} />

<div class="mt-auto">
	<div class="form-control mb-2">
		<label for="duration">Minuti:</label>
		<input class="input input-bordered" type="number" id="duration" bind:value={duration} />
	</div>

	<div class="form-control">
		<label class="label justify-start gap-2"
			><input type="checkbox" class="checkbox" bind:checked={useDifficult} />
			<span class="label-text">Usa lettere difficili (h, q, z)</span></label
		>
	</div>

	<h2 class="text-lg">Lettere già usate:</h2>
	<p class="min-h-16 uppercase">{letters.join(' ')}</p>

	<div class="flex gap-4">
		<button class="btn btn-primary flex-1 block" onclick={newLetter} disabled={finished}>
			{#if finished}
				Lettere terminate
			{:else}
				Nuova lettera
			{/if}
		</button>

		<button class="btn btn-outline flex-1 block" onclick={reset}>Reset</button>
	</div>
</div>
