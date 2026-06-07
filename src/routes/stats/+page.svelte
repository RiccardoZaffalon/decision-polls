<script>
	const { data } = $props();
</script>

<table>
	<thead>
		<tr>
			<td>&nbsp;</td>
			<td>Punteggio</td>
			<td>Voto medio</td>
		</tr>
	</thead>
	<tbody>
		{#each data.stats as stat}
			<tr>
				<td>{stat.optionName}</td>
				<td>{stat.sumVotes}</td>
				<td>{parseFloat(stat.averageVote).toFixed(2)}</td>
			</tr>
		{/each}
	</tbody>
</table>
