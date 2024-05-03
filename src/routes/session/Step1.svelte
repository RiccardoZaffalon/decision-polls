<script>
	import {
		step,
		type,
		participants,
		choices,
		option_filter,
		person_filter,
		configured
	} from './store';

	export let data;
	let person_add_loading = false;
	let option_add_loading = false;

	const updateParticipants = (item) => {
		if ($participants.some((el) => el.id === item.id)) {
			participants.set($participants.filter((el) => el.id !== item.id));
		} else {
			participants.set([...$participants, item]);
		}

		person_filter.set('');
	};

	const addPerson = async () => {
		person_add_loading = true;

		try {
			const added = await fetch('/people', {
				method: 'POST',
				body: JSON.stringify({
					name: $person_filter
				}),
				headers: {
					'content-type': 'application/json'
				}
			});

			const person = await added.json();

			data.people_rows.push(person);
			updateParticipants(person);
		} catch (error) {
			console.warn(error);
		}

		person_add_loading = false;
	};

	const updateChoices = (item) => {
		if ($choices.some((el) => el.id === item.id)) {
			choices.set($choices.filter((el) => el.id !== item.id));
		} else {
			choices.set([...$choices, item]);
		}

		option_filter.set('');
	};

	const addOption = async () => {
		option_add_loading = true;

		try {
			const added = await fetch('/options', {
				method: 'POST',
				body: JSON.stringify({
					name: $option_filter,
					type: $type
				}),
				headers: {
					'content-type': 'application/json'
				}
			});

			const option = await added.json();

			data.options_rows.push(option);
			updateChoices(option);
		} catch (error) {
			console.warn(error);
		}

		option_add_loading = false;
	};
</script>

<h2 class="mt-0 mb-4">1. Configura la sessione</h2>
<p class="text-sm">
	Selezione la categoria di voto, poi almeno 2 partecipanti e 2 opzioni per iniziare la votazione.
</p>

<div class="mb-8">
	<label>
		<span class="label">Cosa dobbiamo decidere?</span>

		<select class="select select-bordered w-48" name="type" bind:value={$type}>
			{#each data.categories_rows as category}
				<option value={category.id}>{category.name}</option>
			{/each}
		</select>
	</label>
</div>

<!-- <h3 class="mb-3">Seleziona i partecipanti</h3> -->
<label for="participant">
	<span class="label">Chi partecipa?</span>
</label>

<div class="join">
	<input
		class="input join-item input-bordered"
		id="participant"
		type="text"
		bind:value={$person_filter}
		placeholder="Filtra o aggiungi partecipanti..."
	/>
	<button
		class="btn join-item btn-primary"
		on:click|preventDefault={addPerson}
		disabled={person_add_loading || $person_filter === ''}
	>
		Aggiungi
		{#if person_add_loading}
			<span class="loading loading-spinner"></span>
		{/if}
	</button>
</div>

<!-- <p class="text-xs">
	Utilizza questo campo per trovare un partecipante esistente; se non lo trovi, usa il pulsante <em
		class="text-primary">Aggiungi</em
	>.
</p> -->

<div class="columns-2 mt-4">
	{#each data.people_rows as person}
		<div class="form-control">
			<label
				class="label justify-start gap-2"
				style:opacity={$person_filter === '' ||
				person.name.toLowerCase().includes($person_filter.toLowerCase())
					? undefined
					: '0.3'}
			>
				<input
					type="checkbox"
					class="checkbox"
					value={person.id}
					checked={$participants.some((participant) => participant.id === person.id)}
					on:change={() => updateParticipants(person)}
				/>
				<span class="label-text">{person.name}</span>
			</label>
		</div>
	{/each}
</div>

<hr class="border-none my-8" />

<!-- <h3 class="mb-1">Seleziona le opzioni disponibili</h3> -->
<label for="option">
	<span class="label">Che opzioni abbiamo?</span>
</label>

<div class="join">
	<input
		type="text"
		id="option"
		class="input join-item input-bordered"
		bind:value={$option_filter}
		placeholder="Filtra opzioni..."
	/>
	<button
		class="btn join-item btn-primary"
		on:click|preventDefault={addOption}
		disabled={option_add_loading || $option_filter === ''}
	>
		Aggiungi
		{#if option_add_loading}
			<span class="loading loading-spinner"></span>
		{/if}
	</button>
</div>

<!-- <p class="text-xs">
	Utilizza questo campo per trovare un'opzione (gioco, cibo, ..) esistente; se non la trovi, usa il
	pulsante <em class="text-primary">Aggiungi</em>.
</p> -->

<div class="columns-2 mt-4">
	{#each data.options_rows as option}
		<div class="form-control">
			<label
				class="label justify-start gap-2"
				style:display={option.type === $type ? undefined : 'none'}
				style:opacity={option_filter === '' ||
				option.name.toLowerCase().includes($option_filter.toLowerCase())
					? undefined
					: '0.3'}
			>
				<input
					type="checkbox"
					class="checkbox"
					value={option.id}
					checked={$choices.some((choice) => choice.id === option.id)}
					on:change={() => updateChoices(option)}
				/>
				<span class="label-text">{option.name}</span>
			</label>
		</div>
	{/each}
</div>

<div class="mt-6 text-right">
	<button
		class="btn btn-primary min-w-24"
		on:click|preventDefault={() => step.set(2)}
		disabled={!$configured}>Inizia</button
	>
</div>
