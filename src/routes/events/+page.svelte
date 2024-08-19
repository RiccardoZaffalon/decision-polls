<script>
	const { data } = $props();
</script>

<table>
	<tbody>
		{#each data.events_rows as event, i}
			<tr>
				<td>{i + 1}</td>
				<td
					>{new Date(event.timestamp).toLocaleDateString('it-IT', {
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}</td
				>
				<td>{event.type}</td>
				<td><a href="events/{event.id}">Dettagli</a></td>
			</tr>
		{/each}
	</tbody>
</table>
