<script>
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';

	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import Menu from '$lib/components/icons/Menu.svelte';
	import Vote from '$lib/components/icons/Sword.svelte';

	let menu;

	// close menu on navigation
	afterNavigate(() => {
		menu.checked = false;
	});
</script>

<svelte:head>
	<title>Solito Metodo 🎲</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="drawer select-none">
	<input id="menu-control" type="checkbox" class="drawer-toggle" bind:this={menu} />

	<div class="drawer-content">
		<div class="fixed top-0 left-0 right-0 bg-base-100 z-10">
			<div class="flex items-center max-w-5xl mx-auto p-4">
				<label for="menu-control" class="btn btn-sm btn-link px-0 text-base-content drawer-button">
					<Menu className="w-6 h-6" />
				</label>

				<h1 class="text-lg ml-3">{$page.data.title}</h1>

				{#if $page.url.pathname !== '/session'}
					<a
						href="/session"
						class="btn btn-sm btn-primary ml-auto"
						class:active={$page.url.pathname === '/session'}
					>
						Si vota!
						<Vote />
					</a>
				{/if}
			</div>
		</div>

		<main class="max-w-5xl mx-auto prose px-4 pt-24 pb-8">
			<slot></slot>
		</main>
	</div>

	<nav class="drawer-side z-10">
		<label for="menu-control" aria-label="close sidebar" class="drawer-overlay"></label>

		<Navigation />
	</nav>
</div>
