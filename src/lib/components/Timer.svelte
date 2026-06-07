<script lang="ts">
	import sound from '$lib/assets/sound.mp3';

	let { start, paused, duration } = $props();
	let elapsed = $state(0);
	let DURATION = $derived(duration * 60);
	let wakeLock: WakeLockSentinel | null = null;

	$effect(() => {
		setInterval(() => {
			if (!paused) {
				elapsed = (Date.now() - start) / 1000;
			}
		}, 100);
	});

	$effect(() => {
		const acquireWakeLock = async () => {
			if (!paused && navigator.wakeLock) {
				try {
					wakeLock = await navigator.wakeLock.request('screen');
				} catch (err) {
					console.error('Failed to acquire wake lock:', err);
				}
			}
		};

		const releaseWakeLock = async () => {
			if (wakeLock) {
				try {
					await wakeLock.release();
					wakeLock = null;
				} catch (err) {
					console.error('Failed to release wake lock:', err);
				}
			}
		};

		if (!paused) {
			acquireWakeLock();
		} else {
			releaseWakeLock();
		}

		return () => {
			releaseWakeLock();
		};
	});

	let remaining = $derived(Math.max(0, Math.ceil(DURATION - elapsed)));
	let minutes = $derived(Math.floor(remaining / 60));
	let seconds = $derived(Math.floor(remaining % 60));
	let audioElement: HTMLAudioElement;

	$effect(() => {
		if (remaining === 0 && !paused) {
			audioElement?.play();
		}
	});
</script>

<audio bind:this={audioElement} src={sound}></audio>

<p class="text-center font-mono text-6xl">
	{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
</p>
