<script>
	import { page } from '$app/stores';

	import Home from '$lib/components/icons/House.svelte';
	import Events from '$lib/components/icons/Calendar.svelte';
	import People from '$lib/components/icons/Users.svelte';
	import Options from '$lib/components/icons/ClipboardText.svelte';
	import Vote from '$lib/components/icons/Sword.svelte';
</script>

<nav>
	<ul class="menu menu-horizontal bg-base-200">
		<li>
			<a href="/" class:active={$page.url.pathname === '/'}>
				<Home className="h-6 w-6" />
				<span>/</span>
			</a>
		</li>
		<li>
			<a href="/events" class:active={$page.url.pathname === '/events'}>
				<Events className="h-6 w-6" />
			</a>
		</li>
		<li>
			<a href="/people" class:active={$page.url.pathname === '/people'}>
				<People className="h-6 w-6" />
			</a>
		</li>
		<li>
			<a href="/options" class:active={$page.url.pathname === '/options'}>
				<Options className="h-6 w-6" />
			</a>
		</li>
		<li>
			<a href="/session" class="text-primary" class:active={$page.url.pathname === '/session'}>
				<Vote className="h-6 w-6" />
				<span>Vota</span>
			</a>
		</li>
	</ul>
</nav>
