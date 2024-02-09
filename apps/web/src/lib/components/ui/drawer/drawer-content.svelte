<script lang="ts">
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';
	import DrawerOverlay from './drawer-overlay.svelte';
	import { cn } from '$lib/utils';

	// interface $$Props extends DrawerPrimitive.ContentProps {
	// 	direction: 'left' | 'right' | 'top' | 'bottom';
	// }
	// type $$Props = DrawerPrimitive.ContentProps;

	let className: string | undefined = undefined;
	export let drawerDirection: 'left' | 'right' | 'top' | 'bottom' | undefined = 'bottom';
	export { className as class };
</script>

<DrawerPrimitive.Portal>
	<DrawerOverlay />
	<DrawerPrimitive.Content
		class={cn(
			className,
			drawerDirection === 'bottom' &&
				'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background',
			drawerDirection === 'left' &&
				'fixed left-0 top-0 z-50 flex h-full w-64 flex-col rounded-r-[10px] border bg-background'
		)}
		{...$$restProps}
	>
		{#if drawerDirection === 'bottom'}
			<div class="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted-foreground dark:bg-muted" />
		{/if}
		<slot />
	</DrawerPrimitive.Content>
</DrawerPrimitive.Portal>
