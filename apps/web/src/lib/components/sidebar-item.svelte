<script lang="ts">
	import { cn } from '$lib/utils';

	let className: string | undefined = undefined;
	export let active: boolean = false;
	export let href: string = '/';
	export { className as class };
</script>

<li class="cursor-pointer">
	<a
		class={cn(
			className,
			'group flex max-h-[2.2rem] w-full items-center gap-x-3 truncate rounded-lg px-3 py-2.5 text-sm font-semibold text-neutral-500 outline-none ring-inset hover:bg-neutral-100 hover:text-neutral-700 focus-visible:rounded-lg focus-visible:ring-2 data-[state=active]:bg-neutral-100 data-[state=active]:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100 dark:data-[state=active]:bg-neutral-900 dark:data-[state=active]:text-neutral-50'
		)}
		data-state={active ? 'active' : 'inactive'}
		{href}
	>
		<slot name="icon" class="size-6" />
		<p class="flex w-full items-center justify-between transition-opacity duration-[800ms]">
			<slot name="title" />
			{#if $$slots.label}
				<slot name="label" />
			{/if}
		</p>
	</a>
</li>
