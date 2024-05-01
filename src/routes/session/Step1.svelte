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

	const updateChoices = (item) => {
		if ($choices.some((el) => el.id === item.id)) {
			choices.set($choices.filter((el) => el.id !== item.id));
		} else {
			choices.set([...$choices, item]);
		}
	};

	const updateParticipants = (item) => {
		if ($participants.some((el) => el.id === item.id)) {
			participants.set($participants.filter((el) => el.id !== item.id));
		} else {
			participants.set([...$participants, item]);
		}
	};
</script>

<h2 class="mt-0">1. Configura la sessione</h2>

<h3 class="mb-1">Seleziona i partecipanti alla votazione</h3>
<p class="text-xs">
	Manca un partecipante? <a href="/people"
		>Aggiungilo nella sezione <em class="text-secondary">Persone</em></a
	> prima di continuare
</p>

<div class="join mt-8">
	<input
		class="input input-sm join-item input-bordered mb-3"
		type="text"
		bind:value={$person_filter}
		placeholder="Filtra partecipanti..."
	/>
	<button
		class="btn btn-sm join-item btn-square btn-neutral"
		on:click|preventDefault={() => person_filter.set('')}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-4 w-4"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M6 18L18 6M6 6l12 12"
			/></svg
		></button
	>
</div>

<div class="columns-2">
	{#each data.people_rows as person}
		<div class="form-control">
			<label
				class="label justify-start gap-2"
				style:display={$person_filter === '' ||
				person.name.toLowerCase().includes($person_filter.toLowerCase())
					? undefined
					: 'none'}
			>
				<input
					type="checkbox"
					class="checkbox"
					value={person.id}
					checked={$participants.includes(person.id)}
					on:change={() => updateParticipants(person)}
				/>
				<span class="label-text">{person.name}</span>
			</label>
		</div>
	{/each}
</div>

<hr />

<h3 class="mb-1">Seleziona categoria e opzioni disponibili</h3>
<p class="text-xs">
	Manca un'opzione? <a href="/options"
		>Aggiungila nella sezione <em class="text-secondary">Opzioni</em></a
	> prima di continuare
</p>

<div class="mb-8">
	<label>
		<span class="label">Categoria</span>

		<select class="select select-bordered w-48" name="type" bind:value={$type}>
			{#each data.categories_rows as category}
				<option value={category.id}>{category.name}</option>
			{/each}
		</select>
	</label>
</div>

<div class="join">
	<input
		type="text"
		class="input input-sm join-item input-bordered mb-3"
		bind:value={$option_filter}
		placeholder="Filtra opzioni..."
	/>

	<button
		class="btn btn-sm join-item btn-square btn-neutral"
		on:click|preventDefault={() => option_filter.set('')}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-4 w-4"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M6 18L18 6M6 6l12 12"
			/></svg
		></button
	>
</div>

<div class="columns-2">
	{#each data.options_rows as option}
		<div class="form-control">
			<label
				class="label justify-start gap-2"
				style:display={option.type === $type &&
				(option_filter === '' || option.name.toLowerCase().includes($option_filter.toLowerCase()))
					? undefined
					: 'none'}
			>
				<input
					type="checkbox"
					class="checkbox"
					value={option.id}
					checked={$choices.includes(option.id)}
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
