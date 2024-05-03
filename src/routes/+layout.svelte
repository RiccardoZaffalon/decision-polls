<script>
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
</script>

<Navigation />

<main class="max-w-5xl mx-auto prose px-4 py-8">
	<slot></slot>
</main>
