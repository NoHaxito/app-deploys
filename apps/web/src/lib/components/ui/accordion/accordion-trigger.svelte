<script lang="ts">
	import { Accordion as AccordionPrimitive } from 'bits-ui';
	import { CaretDown } from 'phosphor-svelte';
	import { cn } from '$lib/utils';

	type $$Props = AccordionPrimitive.TriggerProps;
	type $$Events = AccordionPrimitive.TriggerEvents;

	let className: $$Props['class'] = undefined;
	export let level: AccordionPrimitive.HeaderProps['level'] = 3;
	export { className as class };
</script>

<AccordionPrimitive.Header {level} class="flex flex-col">
	<AccordionPrimitive.Trigger
		class={cn(
			'flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180',
			className
		)}
		{...$$restProps}
		on:click
	>
		<div class="flex items-start flex-col">
			<slot />
			<slot name="description" />
		</div>
		<CaretDown class="h-4 w-4 transition-transform duration-200" />
	</AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
