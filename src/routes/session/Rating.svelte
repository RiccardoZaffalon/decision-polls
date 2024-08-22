<script>
	const { participant, choice, max = 3 } = $props();

	const options = new Array(max)
		.fill('')
		.map((_el, i) => i + 1)
		.reverse();
</script>

<div class="rating-options flex items-center mb-3">
	<span class="rating-options__option">{choice.name}</span>

	<div class="ml-auto">
		{#each options as option}
			<label>
				<input
					type="radio"
					class="peer sr-only"
					name={'vote-' + participant.id + '|' + choice.id}
					value={option}
				/>
				<span class="btn btn-circle btn-neutral peer-checked:bg-primary">{option}</span>
			</label>
		{/each}
	</div>
</div>
