<script>
	const { data } = $props();
</script>

<svelte:head>
	<title>Evento | Solito Metodo 🎲</title>
</svelte:head>

<h1>Evento</h1>

<a href="/events">Torna indietro</a>

<table class="table text-xl mt-6">
	<thead>
		<tr>
			<th>Opzione</th>
			<th>Punteggio</th>
		</tr>
	</thead>

	<tbody>
		{#each data.resultsByOption as result, index}
			<tr class={index === 0 && !data.isTie ? 'bg-base-200 text-primary' : undefined}>
				<td>{result.name}</td>
				<th>{result.score}</th>
			</tr>
		{/each}
	</tbody>
</table>
