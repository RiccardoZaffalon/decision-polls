<script>
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
</script>

<main class="max-w-5xl prose px-4 py-8 mx-auto mb-16">
	<slot></slot>
</main>

<Navigation />
