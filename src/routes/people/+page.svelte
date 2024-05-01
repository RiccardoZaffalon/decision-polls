<script>
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	let name = '';

	$: filtered = data.rows.filter(
		(person) => name === '' || person.name.toLowerCase().includes(name.toLowerCase())
	);

	const submit = () => {
		return async ({ update }) => {
			update();
			name = '';
		};
	};
</script>

<svelte:head>
	<title>Persone</title>
</svelte:head>

<h1>Persone</h1>

{#if form}
	{#if form.success && form.name}
		<p>Persona <em>{form.name}</em> aggiunta!</p>
	{/if}
{/if}

<form method="POST" use:enhance={submit}>
	<div class="flex gap-2 items-end">
		<label class="form-control">
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

		<input class="btn btn-primary" type="submit" value="Aggiungi" disabled={name === ''} />
	</div>
</form>

<table class="table">
	<thead>
		<tr>
			<th>Nome</th>
		</tr>
	</thead>
	<tbody>
		{#each filtered as person}
			<tr>
				<td>{person.name}</td>
			</tr>
		{/each}
	</tbody>
</table>
