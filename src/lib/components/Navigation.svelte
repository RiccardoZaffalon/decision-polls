<script>
	import { page } from '$app/stores';

	import Home from '$lib/components/icons/House.svelte';
	import Events from '$lib/components/icons/Calendar.svelte';
	import Stats from '$lib/components/icons/Stats.svelte';
	import People from '$lib/components/icons/Users.svelte';
	import Options from '$lib/components/icons/ClipboardText.svelte';
	import Vote from '$lib/components/icons/Sword.svelte';
	import Shuffle from '$lib/components/icons/Shuffle.svelte';
</script>

<ul class="menu bg-base-200 text-base-content min-h-full w-80">
	<li class="mb-2">
		<a href="/" class:active={$page.url.pathname === '/'}>
			<Home className="h-6 w-6" />
			<span>Home</span>
		</a>
	</li>
	<li class="mb-2">
		<a href="/people" class:active={$page.url.pathname === '/people'}>
			<People className="h-6 w-6" />
			<span>Persone</span>
		</a>
	</li>
	<li class="mb-2">
		<a href="/options" class:active={$page.url.pathname === '/options'}>
			<Options className="h-6 w-6" />
			<span>Opzioni</span>
		</a>
	</li>
	<li class="mb-2">
		<a href="/events" class:active={$page.url.pathname === '/events'}>
			<Events className="h-6 w-6" />
			<span>Sessioni passate</span>
		</a>
	</li>
	<li class="mb-2">
		<a href="/stats" class:active={$page.url.pathname === '/stats'}>
			<Stats className="h-6 w-6" />
			<span>Statistiche</span>
		</a>
	</li>
	<li class="mb-2">
		<a href="/nomi-cose-citta" class:active={$page.url.pathname === '/nomi-cose-citta'}>
			<Shuffle className="h-6 w-6" />
			<span>Nomi cose città</span>
		</a>
	</li>
	<li class="mb-2">
		<a
			href="/session"
			class="text-primary font-bold"
			class:active={$page.url.pathname === '/session'}
		>
			<Vote className="h-6 w-6" />
			<span>Vota</span>
		</a>
	</li>
</ul>
