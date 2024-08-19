<script>
	const { data } = $props();
</script>

<a href="/events" class="block mb-4">← Torna a tutti gli eventi</a>

<h2>
	Votazione del {new Date(data.timestamp).toLocaleDateString('it-IT', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})}
</h2>

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
