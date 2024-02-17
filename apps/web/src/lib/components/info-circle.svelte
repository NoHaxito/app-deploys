<script lang="ts">
	import * as Tooltip from '$components/ui/tooltip';
	import { Info } from 'phosphor-svelte';
	import * as Popover from './ui/popover';
</script>

<Popover.Root>
	<Popover.Trigger><Info class="h-4 w-4" /></Popover.Trigger>
	<Popover.Content class="text-sm max-w-64" align="end" side="right">
		<slot />
	</Popover.Content>
</Popover.Root>
