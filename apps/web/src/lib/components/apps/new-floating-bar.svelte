<script lang="ts">
	import { cn } from '$/lib/utils';

	export let intersecting: boolean;
</script>

<div
	class={cn(
		!intersecting ? 'translate-y-0' : 'translate-y-[200%]',
		'fixed bottom-2 flex right-0 w-[100%] items-center justify-center md:right-1/4 md:w-[500px] overflow-hidden transition-transform duration-500'
	)}
>
	<div
		class="flex w-[90%] items-center justify-between gap-2 overflow-x-auto rounded-xl border bg-neutral-100 p-3 md:w-[500px] dark:bg-neutral-900"
	>
		<slot />
	</div>
</div>
