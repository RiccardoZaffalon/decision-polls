<script>
	import Rating from './Rating.svelte';

	const { choices, participant } = $props();
	let group = $state();

	function change(e) {
		const { target } = e;

		const inputs = group.querySelectorAll('input[type="radio"]');

		inputs.forEach((input) => {
			if (input !== target && input.value === target.value && input.checked) {
				input.checked = false;
			}
		});
	}
</script>

<div class="vote" onchange={change} bind:this={group}>
	{#each choices as choice}
		<Rating {participant} {choice} max={3} />
	{/each}
</div>
