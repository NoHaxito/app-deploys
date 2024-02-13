<script lang="ts">
	import * as Tooltip from '$components/ui/tooltip';
	import { Info } from 'phosphor-svelte';
</script>

<Tooltip.Root openDelay={200}>
	<Tooltip.Trigger><Info class="h-4 w-4" /></Tooltip.Trigger>
	<Tooltip.Content class="max-w-64" align="end" side="right">
		<slot />
	</Tooltip.Content>
</Tooltip.Root>
