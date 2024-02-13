<script lang="ts">
	import { List, Stack } from 'phosphor-svelte';
	import ThemeToggle from './theme-toggle.svelte';
	import UserMenu from './user-menu.svelte';
	import type { Session } from 'lucia';
	import { Button } from './ui/button';
	import { sidebarMobile } from '../store';
	export let user: Session | null;
</script>

<header
	class="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/90"
>
	<div class="container mx-auto flex h-[4rem] items-center justify-between">
		<div class="mr-1 flex items-center gap-x-2">
			<Button
				on:click={() => ($sidebarMobile = !$sidebarMobile)}
				variant="outline"
				size="icon"
				class="flex h-8 w-8 min-[967px]:hidden"><List /></Button
			>
			<a href="/" class="flex items-center space-x-2 transition-transform ease-in active:scale-95">
				<Stack class="h-6 w-6" weight="fill" />
				<span class="text-lg font-bold">Manager</span>
			</a>
		</div>
		<div class="flex items-center gap-2">
			<ThemeToggle />
			<UserMenu {user} />
		</div>
	</div>
</header>
