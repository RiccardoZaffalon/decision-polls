<script>
	import { enhance } from '$app/forms';
	import { afterNavigate } from '$app/navigation';

	import { step, type, choices, participants, option_filter, person_filter } from './store';

	import Step1 from './Step1.svelte';
	import Step2 from './Step2.svelte';
	import Step3 from './Step3.svelte';

	export let data;
	export let form;
	let y;

	$: {
		$type, option_filter.set(''), person_filter.set(''), choices.set([]);
	}

	$: {
		$step, (y = 0);
	}

	afterNavigate(() => {
		step.set(1);
		option_filter.set('');
		person_filter.set('');

		choices.set([]);
		participants.set([]);
		y = 0;
	});

	const submit = () => {
		step.set(3);
	};

	type.set(data?.categories_rows[0]?.id);
</script>

<svelte:head>
	<title>Votazione | Solito Metodo 🎲</title>
</svelte:head>

<svelte:window bind:scrollY={y} />

<form method="POST" use:enhance={submit}>
	<div style:display={$step === 1 ? 'block' : 'none'}>
		<Step1 {data} />
	</div>

	<div style:display={$step === 2 ? 'block' : 'none'}>
		<Step2 />
	</div>

	<div style:display={$step === 3 ? 'block' : 'none'}>
		<Step3 {data} {form} />
	</div>
</form>
