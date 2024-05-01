<script>
	let ref;

	const close = () => {
		ref.open = false;
	};
</script>

<nav class="flex gap-2 items-baseline justify-between max-w-md p-4">
	<a class="btn btn-sm" href="/">Home</a>

	<details class="dropdown" bind:this={ref}>
		<summary class="m-1 btn btn-sm">Config</summary>
		<ul class="shadow menu dropdown-content z-[1] bg-base-100 rounded-box">
			<li><a on:click={close} class="btn btn-sm" href="/people">Persone</a></li>
			<li><a on:click={close} class="btn btn-sm mt-2" href="/options">Opzioni</a></li>
		</ul>
	</details>

	<a class="btn btn-sm btn-disabled" href="/">Eventi</a>
	<a class="btn btn-sm btn-primary" href="/session" data-sveltekit-reload>Votazione 🎲</a>
</nav>
