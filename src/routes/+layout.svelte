<script>
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
</script>

<main class="max-w-5xl mx-auto prose px-4 pt-4 pb-8">
	<slot></slot>
</main>

<Navigation />
