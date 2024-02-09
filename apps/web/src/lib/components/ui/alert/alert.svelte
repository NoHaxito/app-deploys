<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import { alertVariants, type Variant } from '.';
	import Button from '../button/button.svelte';
	import { X } from 'phosphor-svelte';
	import { onMount } from 'svelte';

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		variant?: Variant;
	};
	let isClosed = false;
	function close() {
		isClosed = true;
	}

	let className: $$Props['class'] = undefined;
	export let variant: $$Props['variant'] = 'default';
	export { className as class };
</script>

{#if !isClosed}
	<div class={cn(alertVariants({ variant }), className)} {...$$restProps} role="alert">
		<slot />
		<div class="absolute right-2 top-2">
			<Button size="icon" class="h-6 w-6" variant="ghost" on:click={close}><X /></Button>
		</div>
	</div>
{/if}
