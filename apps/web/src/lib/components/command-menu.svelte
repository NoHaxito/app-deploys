<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import { Button } from '$lib/components/ui/button';
	import { mediaQuery } from 'svelte-legos';
	import * as Command from '$lib/components/ui/command';
	import { Cards, Monitor, Moon, Plus, Books, Stack, Sun, Copy, Lifebuoy } from 'phosphor-svelte';
	import { onMount } from 'svelte';
	import { commandMenu } from '../store';
	import { setMode, resetMode } from 'mode-watcher';

	const isDesktop = mediaQuery('(min-width: 600px)');
	onMount(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				$commandMenu = !$commandMenu;
			}
		}
		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

{#if $isDesktop}
	<Dialog.Root open={$commandMenu} onOpenChange={commandMenu.set}>
		<Dialog.Content showClose={false} class="gap-0 p-0 sm:max-w-[425px]">
			<Command.Root>
				<Command.Input placeholder="Type a command or search..." />
				<Command.List
					class="ease h-[var(--cmdk-list-height)] max-h-[250px] transition-[height] duration-500"
				>
					<Command.Empty>No results found.</Command.Empty>
					<Command.Group heading="Projects">
						<Command.Item>
							<Cards class="h-4 w-4" />
							<span>View Projects</span>
						</Command.Item>
						<Command.Item>
							<Plus class="h-4 w-4" />
							<span>Create New Project</span>
						</Command.Item>
					</Command.Group>
					<Command.Separator />
					<Command.Group heading="Theme">
						<Command.Item onSelect={() => setMode('light')}>
							<Sun class="h-4 w-4" />
							<span>Light Theme</span>
						</Command.Item>
						<Command.Item onSelect={() => setMode('dark')}>
							<Moon class="h-4 w-4" />
							<span>Dark Theme</span>
						</Command.Item>
						<Command.Item onSelect={() => resetMode()}>
							<Monitor class="h-4 w-4" />
							<span>System Theme</span>
						</Command.Item>
					</Command.Group>
					<Command.Separator />
					<Command.Group heading="Help">
						<Command.Item>
							<Copy class="h-4 w-4" />
							<span>Copy Account ID</span>
						</Command.Item>
						<Command.Item>
							<Lifebuoy class="h-4 w-4" />
							<span>Support</span>
						</Command.Item>
						<Command.Item>
							<Books class="h-4 w-4" />
							<span>View Docs</span>
						</Command.Item>
					</Command.Group>
				</Command.List>
			</Command.Root>
			<Dialog.Footer
				class="flex items-center !justify-between gap-2 border-t border-border px-3 py-2"
			>
				<Stack class="h-4 w-4 opacity-80" weight="fill" />
				<div class="flex items-center gap-1">
					<Button
						on:click={() => ($commandMenu = false)}
						size="xs"
						class="h-7 text-xs"
						variant="ghost"
					>
						Close
						<kbd class="px-4">Esc</kbd>
					</Button>
					<Button size="xs" class="h-7 text-xs" variant="ghost">
						Navigate
						<kbd>↑</kbd>
						<kbd>↓</kbd>
					</Button>
					<Button size="xs" class="h-7 text-xs" variant="ghost">
						Select
						<kbd>↵</kbd>
					</Button>
				</div>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root openFocus={null} bind:open={$commandMenu}>
		<Drawer.Content class="h-max max-h-[60%] px-1.5">
			<Command.Root autofocus={false}>
				<Command.Input placeholder="Type a command or search..." />
				<Command.List
					class="ease h-[var(--cmdk-list-height)] overflow-y-auto transition-[height] duration-500"
				>
					<Command.Empty>No results found.</Command.Empty>
					<Command.Group heading="Projects">
						<Command.Item>
							<Cards class="h-4 w-4" />
							<span>View Projects</span>
						</Command.Item>
						<Command.Item>
							<Plus class="h-4 w-4" />
							<span>Create New Project</span>
						</Command.Item>
					</Command.Group>
					<Command.Separator />
					<Command.Group heading="Theme">
						<Command.Item onSelect={() => setMode('light')}>
							<Sun class="h-4 w-4" />
							<span>Light Theme</span>
						</Command.Item>
						<Command.Item onSelect={() => setMode('dark')}>
							<Moon class="h-4 w-4" />
							<span>Dark Theme</span>
						</Command.Item>
						<Command.Item onSelect={() => resetMode()}>
							<Monitor class="h-4 w-4" />
							<span>System Theme</span>
						</Command.Item>
					</Command.Group>
					<Command.Separator />
					<Command.Group heading="Help">
						<Command.Item>
							<Copy class="h-4 w-4" />
							<span>Copy Account ID</span>
						</Command.Item>
						<Command.Item>
							<Lifebuoy class="h-4 w-4" />
							<span>Support</span>
						</Command.Item>
						<Command.Item>
							<Books class="h-4 w-4" />
							<span>View Docs</span>
						</Command.Item>
					</Command.Group>
				</Command.List>
			</Command.Root>
		</Drawer.Content>
	</Drawer.Root>
{/if}
