<script>
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
</script>

<svelte:head>
	<title>Il Solito Metodo 🎲</title>
</svelte:head>

<div class="max-w-5xl mx-auto">
	<Navigation />
</div>

<main class="max-w-5xl mx-auto prose px-4 pb-8">
	<slot></slot>
</main>
