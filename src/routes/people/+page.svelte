<script>
	import { enhance } from '$app/forms';

	import Trash from '$lib/components/icons/Trash.svelte';

	const { data, form } = $props();

	let name = $state('');
	let removed = $state([]);

	const filtered = $derived(
		data.rows.filter(
			(person) =>
				!removed.includes(person.id) &&
				(name === '' || person.name.toLowerCase().includes(name.toLowerCase()))
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
			const request = await fetch('/people', {
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

<p>Usa questa pagina per aggiungere nuove persone; saranno disponibili dalla prossima votazione.</p>

{#if form}
	{#if form.success && form.name}
		<div class="toast toast-end z-10">
			<div class="alert alert-success">
				<span class="text-sm">Persona <em>{form.name}</em> aggiunta!</span>
			</div>
		</div>
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
	<tbody>
		{#each filtered as person}
			<tr>
				<td>{person.name}</td>
				<td class="text-right"
					><button class="btn btn-xs" onclick={() => remove(person.id)}>
						<Trash />
						<span>Rimuovi</span>
					</button></td
				>
			</tr>
		{/each}
	</tbody>
</table>
