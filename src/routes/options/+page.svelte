<script>
	import { enhance } from '$app/forms';

	import Trash from '$lib/components/icons/Trash.svelte';

	const { data, form } = $props();

	let name = $state('');
	let removed = $state([]);
	let selected_type = $state('game');

	const selected_singular = $derived(
		data.categories_rows.find((el) => el.id === selected_type).singular
	);

	const filtered = $derived(
		data.options_rows.filter(
			(option) =>
				!removed.includes(option.id) &&
				option.type === selected_type &&
				(name === '' || option.name.toLowerCase().includes(name.toLowerCase()))
		)
	);

	const submit = () => {
		return async ({ update }) => {
			update();
			name = '';
		};
	};

	const remove = async (id) => {
		try {
			const request = await fetch('/options', {
				method: 'DELETE',
				body: JSON.stringify({
					id
				}),
				headers: {
					'content-type': 'application/json'
				}
			});

			if (request.status >= 400) return;

			removed.push(id);
		} catch (error) {
			console.warn(error);
		}
	};
</script>

<svelte:head>
	<title>Opzioni | Solito Metodo 🎲</title>
</svelte:head>

<h1>Opzioni</h1>

<p>
	Usa questa pagina per aggiungere nuove opzioni (giochi, cibi, ecc..); saranno disponibili dalla
	prossima votazione.
</p>

{#if form}
	{#if form.success && form.name}
		<div class="toast toast-end z-10">
			<div class="alert alert-success">
				<span class="text-sm">Opzione <em>{form.name}</em> aggiunta!</span>
			</div>
		</div>
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
				{#each data.categories_rows as type}
					<option value={type.id} selected={type.id === selected_type}>{type.name}</option>
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
	<tbody>
		{#each filtered as option}
			<tr>
				<td>{option.name}</td>
				<td class="text-right"
					><button class="btn btn-xs" onclick={() => remove(option.id)}>
						<Trash />
						<span>Rimuovi</span>
					</button></td
				>
			</tr>
		{/each}
	</tbody>
</table>
