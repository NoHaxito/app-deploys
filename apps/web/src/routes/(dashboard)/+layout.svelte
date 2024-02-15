<script lang="ts">
	import '$/app.pcss';
	import { page } from '$app/stores';
	import Navbar from '$components/navbar.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import Sidebar from '$components/sidebar.svelte';
	import { ProgressBar } from '@prgm/sveltekit-progress-bar';
	import { Warning } from 'phosphor-svelte';
	import CommandMenu from '$/lib/components/command-menu.svelte';
	import { Toaster } from '$/lib/components/ui/sonner';
	import { browser } from '$app/environment';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	const { data } = $page;
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
</script>

<QueryClientProvider client={queryClient}>
	<Toaster />
	<ProgressBar class="text-indigo-500" zIndex={100} />
	<ModeWatcher />
	<CommandMenu />
	<div class="border-b bg-neutral-100 p-2.5 dark:border-neutral-800 dark:bg-neutral-900">
		<div class="container mx-auto flex items-center gap-2">
			<Warning weight="fill" class="size-4 min-h-4 min-w-4 fill-yellow-500" />
			<div class="text-xs [&_p]:line-clamp-2 [&_p]:leading-relaxed">
				Manager is currently in beta preview, getting errors is expected.
			</div>
		</div>
	</div>
	<Navbar user={data.user} />
	<div class="container mx-auto flex-1">
		<div class="flex-1 items-start md:grid md:grid-cols-[auto_minmax(0,1fr)] md:gap-6">
			<Sidebar />
			<main class="py-4">
				<slot />
			</main>
		</div>
	</div>
</QueryClientProvider>
