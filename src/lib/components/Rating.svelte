<script>
	export let participant, choice;

	let vote = 0;
	const max = 3;

	const minus = () => {
		if (vote > 0) {
			vote -= 1;
		}
	};

	const plus = () => {
		if (vote < max) {
			vote += 1;
		}
	};

	$: console.log(vote);
</script>

<label class="form-control">
	<div class="label">
		<span class="label-text">{choice.name}</span>

		<div class="join">
			<button on:click|preventDefault={minus} class="btn btn-square btn-neutral join-item">-</button
			>

			<input
				type="text"
				class="input w-16 bg-neutral text-center join-item"
				name={'vote-' + participant.id + '|' + choice.id}
				min="0"
				max="3"
				bind:value={vote}
				readonly
			/>
			<button on:click|preventDefault={plus} class="btn btn-square btn-neutral join-item">+</button>
		</div>
	</div>
</label>
