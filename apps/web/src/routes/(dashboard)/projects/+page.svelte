<script lang="ts">
	import { Separator } from '$components/ui/separator';
	import { Button } from '$components/ui/button';
	import PageHeader from '$/lib/components/page-header.svelte';
	import { Plus } from 'phosphor-svelte';
	import CommandMenu from '$/lib/components/command-menu.svelte';
</script>

<div class="space-y-4">
	<PageHeader>
		<svelte:fragment slot="title">Projects</svelte:fragment>
		<svelte:fragment slot="description"
			>List all projects asociated with your account.</svelte:fragment
		>
		<svelte:fragment slot="actions">
			<Button href="/projects/new" size="xs">
				<Plus />
				New project
			</Button>
		</svelte:fragment>
	</PageHeader>
	<div class=""></div>
</div>
