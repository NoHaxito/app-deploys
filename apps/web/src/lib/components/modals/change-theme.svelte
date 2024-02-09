<script lang="ts">
	import * as Drawer from '../ui/drawer';
</script>

<Drawer.NestedRoot>
	<Drawer.Trigger asChild>
		<slot />
	</Drawer.Trigger>
	<Drawer.Content></Drawer.Content>
</Drawer.NestedRoot>
