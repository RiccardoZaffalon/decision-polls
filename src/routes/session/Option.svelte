<script>
	const { participant, choice, max = 3 } = $props();

	const options = new Array(max)
		.fill('')
		.map((_el, i) => i + 1)
		.reverse();
</script>

<div class="rating-options mb-4 flex gap-1 items-center justify-between">
	<span class="rating-options__option mb-1 mt-0">{choice.name}</span>

	<div class="ml-auto flex gap-1 flex-nowrap justify-end">
		{#each options as points}
			<label>
				<input
					type="radio"
					class="peer sr-only"
					name={'vote-' + participant.id + '|' + choice.id}
					value={points}
				/>
				<span class="btn btn-circle text-nowrap font-normal btn-neutral peer-checked:bg-primary">
					{points}
				</span>
			</label>
		{/each}
	</div>
</div>
