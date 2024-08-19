<script>
	import { enhance } from '$app/forms';

	const { data } = $props();
</script>

<a href="/options" class="block mb-4">← Torna a tutte le opzioni</a>

<h2>Modifica "{data.option.name}"</h2>

<form method="POST" use:enhance>
	<label class="form-control w-full">
		<div class="label">
			<span class="label-text">Nome</span>
		</div>
		<input
			class="input input-bordered w-full max-w-xs"
			type="text"
			name="name"
			value={data.option.name}
			autocomplete="off"
			required
		/>
	</label>

	<label class="form-control w-full">
		<div class="label">
			<span class="label-text">Min. partecipanti</span>
		</div>
		<input
			class="input input-bordered w-full max-w-xs"
			type="number"
			name="minParticipants"
			value={data.option.minParticipants}
			autocomplete="off"
			required
		/>
	</label>

	<label class="form-control w-full">
		<div class="label">
			<span class="label-text">Max. partecipanti</span>
		</div>
		<input
			class="input input-bordered w-full max-w-xs"
			type="number"
			name="maxParticipants"
			value={data.option.maxParticipants}
			autocomplete="off"
			required
		/>
	</label>

	<input class="btn btn-primary mt-4" type="submit" value="Salve modifiche" />
</form>
