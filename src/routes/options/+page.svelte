<script>
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	let name = '';
	let selected_type = 'game';
	$: selected_singular = data.categories_rows.find((el) => el.id === selected_type).singular;

	$: filtered = data.options_rows.filter(
		(option) =>
			option.type === selected_type &&
			(name === '' || option.name.toLowerCase().includes(name.toLowerCase()))
	);

	const submit = () => {
		return async ({ update }) => {
			update();
			name = '';
		};
	};
</script>

<svelte:head>
	<title>Opzioni | Solito Metodo 🎲</title>
</svelte:head>

<h1>Opzioni</h1>

{#if form}
	{#if form.success && form.name}
		<p>Opzione <em>{form.name}</em> aggiunta!</p>
	{/if}
{/if}

<form method="POST" use:enhance={submit}>
	<div class="flex gap-4 items-end">
		<label class="form-control w-full">
			<div class="label">
				<span class="label-text">Nome</span>
			</div>
			<input
				class="input input-bordered w-full max-w-xs"
				type="text"
				name="name"
				bind:value={name}
				autocomplete="off"
				required
			/>
		</label>

		<label class="form-control w-full">
			<div class="label">
				<span class="label-text">Categoria</span>
			</div>
			<select class="select select-bordered" name="type" bind:value={selected_type} required>
				{#each data.categories_rows as type, index}
					<option value={type.id}>{type.name}</option>
				{/each}
			</select>
		</label>
	</div>

	<input
		class="btn btn-primary w-full mt-4"
		type="submit"
		value={`Aggiungi ${selected_singular}`}
		disabled={name === ''}
	/>
</form>

<table class="table">
	<thead>
		<tr>
			<th>Nome</th>
			<th>Categoria</th>
		</tr>
	</thead>
	<tbody>
		{#each filtered as option}
			<tr>
				<td>{option.name}</td>
				<td>{option.type}</td>
			</tr>
		{/each}
	</tbody>
</table>
