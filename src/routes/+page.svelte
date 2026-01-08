<script>
	import People from '$lib/components/icons/Users.svelte';
	import Options from '$lib/components/icons/ClipboardText.svelte';
	import Vote from '$lib/components/icons/Sword.svelte';
	import Stats from '$lib/components/icons/Stats.svelte';

	const cardClassName = (primary) => {
		let base = 'card p-6 flex justify-center items-center text-center shadow-xl ';

		if (primary) {
			base += 'bg-primary';
		} else {
			base += 'bg-base-300';
		}

		return base;
	};
</script>

<svelte:head>
	<title>Solito Metodo 🎲</title>
</svelte:head>

<h1 class="mb-12 text-center">Benvenuti sul "Solito&nbsp;Metodo"&nbsp;🎲</h1>

<nav class="grid grid-cols-2 gap-4">
	<a class={cardClassName(true)} href="/session">
		<Vote className="h-8 w-8 mb-4" />
		Inizia una nuova votazione</a
	>
	<a class={cardClassName()} href="/options">
		<Options className="h-8 w-8 mb-4" />
		Aggiungi opzioni (giochi,&nbsp;cibi,&nbsp;..)</a
	>
	<a class={cardClassName()} href="/people">
		<People className="h-8 w-8 mb-4" />
		Aggiungi persone</a
	>
	<a class={cardClassName()} href="/stats">
		<Stats className="h-8 w-8 mb-4" />
		Statistiche</a
	>
</nav>
