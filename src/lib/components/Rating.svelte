<script>
	import Minus from '$lib/components/icons/Minus.svelte';
	import Plus from '$lib/components/icons/Plus.svelte';

	const { participant, choice, max = 3 } = $props();

	let vote = $state(0);

	const minus = (e) => {
		e.preventDefault();

		if (vote > 0) {
			vote -= 1;
		}
	};

	const plus = (e) => {
		e.preventDefault();

		if (vote < max) {
			vote += 1;
		}
	};
</script>

<label class="form-control">
	<div class="label">
		<span class="label-text">{choice.name}</span>

		<div class="join">
			<button onclick={minus} class="btn btn-square btn-neutral join-item">
				<Minus />
			</button>

			<input
				type="text"
				class="input w-16 bg-neutral text-center join-item"
				name={'vote-' + participant.id + '|' + choice.id}
				min="0"
				bind:value={vote}
				{max}
				readonly
			/>
			<button onclick={plus} class="btn btn-square btn-neutral join-item">
				<Plus />
			</button>
		</div>
	</div>
</label>
