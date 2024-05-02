<script>
	export let data, form;

	$: results = (form?.event_votes || [])
		.reduce((acc, vote) => {
			const { optionId, value } = vote;

			const option = data.options_rows.find((option) => option.id === optionId);
			const optionAcc = acc.find((el) => el.name === option.name);

			if (optionAcc) {
				optionAcc.score += value;
			} else {
				acc.push({
					name: option.name,
					score: value
				});
			}

			return acc;
		}, [])
		.sort((a, b) => b.score - a.score);

	$: isTie = results.length > 1 && results[0].score === results[1].score;
</script>

<h2 class="mt-0">3. Risultati</h2>

{#if form?.success && results.length}
	{#if isTie}
		<div role="alert" class="alert">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="stroke-info shrink-0 w-6 h-6"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				></path></svg
			>
			<span
				>C'è un pareggio! <a class="btn btn-xs btn-primary ml-3" href="/session">Vota di nuovo</a
				></span
			>
		</div>
	{/if}
	<table class="table text-xl mt-6">
		<thead>
			<tr>
				<th>Opzione</th>
				<th>Punteggio</th>
			</tr>
		</thead>

		{#each results as result, index}
			<tr class={index === 0 && !isTie ? 'bg-base-200 text-primary' : undefined}>
				<td>{result.name}</td>
				<th>{result.score}</th>
			</tr>
		{/each}
	</table>
{:else}
	<p class="text-center py-4"><span class="loading loading-spinner loading-md"></span></p>
{/if}
