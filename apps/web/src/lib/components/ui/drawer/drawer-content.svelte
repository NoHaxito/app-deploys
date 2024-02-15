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
				'bg-background fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border',
			drawerDirection === 'left' &&
				'bg-background fixed left-0 top-0 z-50 flex h-full w-64 flex-col rounded-r-[10px] border',
			drawerDirection === 'right' &&
				'bg-background fixed right-0 top-0 z-50 flex h-full w-64 flex-col rounded-l-[10px] border'
		)}
		{...$$restProps}
	>
		{#if drawerDirection === 'bottom'}
			<div class="bg-muted-foreground dark:bg-muted mx-auto mt-4 h-2 w-[100px] rounded-full" />
		{/if}
		<slot />
	</DrawerPrimitive.Content>
</DrawerPrimitive.Portal>
