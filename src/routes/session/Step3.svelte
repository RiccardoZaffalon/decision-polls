<script>
	export let form;

	import Sword from '$lib/components/icons/Sword.svelte';
</script>

<h2 class="mt-0">3. Risultati</h2>

{#if form?.success && form.resultsByOption.length}
	{#if form.isTie}
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

		{#each form.resultsByOption as result, index}
			<tr class={index === 0 && !form.isTie ? 'bg-base-200 text-primary' : undefined}>
				<td>{result.name}</td>
				<th>{result.score}</th>
			</tr>
		{/each}
	</table>
	{#if !form.isTie}
		<a class="btn btn-primary" href="/session">
			Nuova votazione
			<Sword />
		</a>
	{/if}
{:else}
	<p class="text-center py-4"><span class="loading loading-spinner loading-md"></span></p>
{/if}
