<script>
	import { page } from '$app/stores';

	import home from '$lib/icons/house.svg';
	import people from '$lib/icons/users.svg';
	import options from '$lib/icons/clipboard-text.svg';
	import vote from '$lib/icons/sword.svg';
</script>

<nav class="btm-nav">
	<a href="/" class={$page.url.pathname === '/' && 'active'}>
		<img src={home} class="h-5 w-5" alt="Home" />
		<span class="btm-nav-label">Home</span>
	</a>
	<a href="/people" class={$page.url.pathname === '/people' && 'active'}>
		<img src={people} class="h-5 w-5" alt="People" />
		<span class="btm-nav-label">Persone</span>
	</a>
	<a href="/options" class={$page.url.pathname === '/options' && 'active'}>
		<img src={options} class="h-5 w-5" alt="Options" />
		<span class="btm-nav-label">Opzioni</span>
	</a>
	<a href="/session" class={$page.url.pathname === '/session' && 'active'} data-sveltekit-reload>
		<img src={vote} class="h-5 w-5" alt="Session" />
		<span class="btm-nav-label text-secondary">Votazione</span>
	</a>
</nav>
