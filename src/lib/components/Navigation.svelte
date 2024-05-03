<script>
	import { page } from '$app/stores';

	import Home from '$lib/components/icons/House.svelte';
	import People from '$lib/components/icons/Users.svelte';
	import Options from '$lib/components/icons/ClipboardText.svelte';
	import Vote from '$lib/components/icons/Sword.svelte';
</script>

<nav>
	<ul class="menu menu-horizontal bg-base-200">
		<li>
			<a href="/" class:active={$page.url.pathname === '/'}>
				<Home class="h-5 w-5" />
				<span>/</span>
			</a>
		</li>
		<li>
			<a href="/people" class:active={$page.url.pathname === '/people'}>
				<People class="h-5 w-5" />
				<span>Persone</span>
			</a>
		</li>
		<li>
			<a href="/options" class:active={$page.url.pathname === '/options'}>
				<Options class="h-5 w-5" />
				<span>Opzioni</span>
			</a>
		</li>
		<li>
			<a href="/session" class="text-accent" class:active={$page.url.pathname === '/session'}>
				<Vote class="h-5 w-5" />
				<span>Vota</span>
			</a>
		</li>
	</ul>
</nav>
