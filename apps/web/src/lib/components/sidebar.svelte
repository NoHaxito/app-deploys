<script lang="ts">
	import { navigating, page } from '$app/stores';
	import SidebarItem from './sidebar-item.svelte';
	import { sidebarLinks } from '$lib/config/sidebar-links';
	import { mediaQuery } from 'svelte-legos';
	import * as Drawer from './ui/drawer';
	import { onMount } from 'svelte';
	import { Stack } from 'phosphor-svelte';
	import { Separator } from './ui/separator';
	import { sidebarMobile } from '../store';

	const isDesktop = mediaQuery('(min-width: 768px)');
	$: if ($navigating) {
		if ($sidebarMobile) $sidebarMobile = false;
	}
	onMount(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				$sidebarMobile = !$sidebarMobile;
			}
		}
		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

{#if $isDesktop}
	<aside
		class="fixed left-0 top-[4rem] z-30 flex h-[calc(100vh-4rem)] min-w-[16rem] max-w-[16rem] shrink-0 -translate-x-[200%] transform flex-col border-r border-neutral-200 bg-white antialiased transition-[width,transform] duration-[500ms] ease-in data-[open=true]:translate-x-0 data-[open=false]:duration-[1000ms] dark:border-neutral-900 dark:bg-neutral-950 md:sticky md:-ml-4 md:block md:translate-x-0 md:duration-300"
	>
		<nav
			class="flex h-full flex-1 flex-col gap-y-6 overflow-hidden overflow-y-auto overflow-x-hidden px-3 py-4 pr-2"
		>
			<ul class="flex flex-col gap-y-1">
				{#each sidebarLinks as link}
					<SidebarItem active={$page.url.pathname === link.href} href={link.href}>
						<svelte:component
							this={link.icon}
							slot="icon"
							weight={$page.url.pathname === link.href ? 'fill' : 'regular'}
							class="size-6"
						/>
						<svelte:fragment slot="title">{link.title}</svelte:fragment>
					</SidebarItem>
				{/each}
			</ul>
		</nav>
	</aside>
{:else}
	<Drawer.Root bind:open={$sidebarMobile} direction="left">
		<Drawer.Content drawerDirection="left">
			<Drawer.Header>
				<a
					href="/"
					class="flex items-center space-x-2 transition-transform ease-in active:scale-95"
				>
					<Stack class="h-6 w-6" weight="fill" />
					<span class="text-lg font-bold">Manager</span>
				</a>
				<Separator />
			</Drawer.Header>
			<nav
				class="flex h-full flex-1 flex-col gap-y-6 overflow-hidden overflow-y-auto overflow-x-hidden px-3 pr-2"
			>
				<ul class="flex flex-col gap-y-1">
					{#each sidebarLinks as link}
						<SidebarItem active={$page.url.pathname === link.href} href={link.href}>
							<svelte:component
								this={link.icon}
								slot="icon"
								weight={$page.url.pathname === link.href ? 'fill' : 'regular'}
								class="size-6"
							/>
							<svelte:fragment slot="title">{link.title}</svelte:fragment>
						</SidebarItem>
					{/each}
				</ul>
			</nav>
		</Drawer.Content>
	</Drawer.Root>
{/if}
