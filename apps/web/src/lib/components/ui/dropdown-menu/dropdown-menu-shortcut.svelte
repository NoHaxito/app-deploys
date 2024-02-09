<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLSpanElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<span
	class={cn('ml-auto flex items-center gap-x-0.5 text-xs tracking-widest opacity-60', className)}
	{...$$restProps}
>
	<slot />
</span>
