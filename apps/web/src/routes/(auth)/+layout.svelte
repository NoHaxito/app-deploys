<script lang="ts">
	import '$/app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import { ProgressBar } from '@prgm/sveltekit-progress-bar';
	import { Toaster } from '$components/ui/sonner';
</script>

<Toaster />
<ProgressBar class="text-indigo-500" zIndex={100} />
<ModeWatcher />
<div class="">
	<main class="">
		<slot />
	</main>
</div>
