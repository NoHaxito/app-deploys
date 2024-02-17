<script lang="ts">
	import { Separator } from './ui/separator';
	export let separator: boolean = false;
</script>

<div class="flex items-center gap-2">
	<div>
		<h3 class="text-2xl font-bold sm:text-3xl">
			<slot name="title" />
		</h3>
		<p class="text-muted-foreground text-sm">
			<slot name="description" />
		</p>
	</div>
	<div class="ml-auto flex items-center gap-2">
		<slot name="actions" />
	</div>
</div>
{#if separator}
	<Separator />
{/if}
