<script>
	import Option from './Option.svelte';

	const { choices, participant, audio } = $props();
	let group = $state();

	function change(e) {
		audio.volume = 0.2;
		audio.play();

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
		<Option {participant} {choice} max={3} />
	{/each}
</div>
