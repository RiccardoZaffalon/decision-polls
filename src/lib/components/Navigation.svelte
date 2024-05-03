<script>
	import { page } from '$app/stores';

	import Home from '$lib/components/icons/House.svelte';
	import People from '$lib/components/icons/Users.svelte';
	import Options from '$lib/components/icons/ClipboardText.svelte';
	import Vote from '$lib/components/icons/Sword.svelte';
</script>

<nav class="btm-nav">
	<a href="/" class:active={$page.url.pathname === '/'}>
		<Home class="h-5 w-5" />
		<span class="btm-nav-label">Home</span>
	</a>
	<a href="/people" class:active={$page.url.pathname === '/people'}>
		<People class="h-5 w-5" />
		<span class="btm-nav-label">Persone</span>
	</a>
	<a href="/options" class:active={$page.url.pathname === '/options'}>
		<Options class="h-5 w-5" />
		<span class="btm-nav-label">Opzioni</span>
	</a>
	<a href="/session" class="text-accent" class:active={$page.url.pathname === '/session'}>
		<Vote class="h-5 w-5" />
		<span class="btm-nav-label">Votazione</span>
	</a>
</nav>
