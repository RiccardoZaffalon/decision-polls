<script>
	import { enhance } from '$app/forms';
	import { afterNavigate } from '$app/navigation';

	import store from './store.svelte';

	import Step1 from './Step1.svelte';
	import Step2 from './Step2.svelte';
	import Step3 from './Step3.svelte';

	const { data, form } = $props();

	let y = $state(0);

	$effect(() => {
		if (store.step) {
			y = 0;
		}
	});

	afterNavigate(() => {
		store.goToStep(1);

		store.setChoices([]);
		store.setParticipants([]);

		y = 0;
	});

	const submit = () => {
		store.goToStep(3);
	};
</script>

<svelte:window bind:scrollY={y} />

<form method="POST" use:enhance={submit}>
	<div style:display={store.step === 1 ? 'block' : 'none'}>
		<Step1 {data} />
	</div>

	<div style:display={store.step === 2 ? 'block' : 'none'}>
		<Step2 />
	</div>

	<div style:display={store.step === 3 ? 'block' : 'none'}>
		<Step3 {form} />
	</div>
</form>
