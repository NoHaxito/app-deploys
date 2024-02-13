<script lang="ts">
	import { Separator } from '$components/ui/separator';
	import { Button } from '$components/ui/button';
	import PageHeader from '$/lib/components/page-header.svelte';
	import { Plus } from 'phosphor-svelte';
	import CommandMenu from '$/lib/components/command-menu.svelte';
</script>

<div class="space-y-4">
	<PageHeader>
		<svelte:fragment slot="title">Applications</svelte:fragment>
		<svelte:fragment slot="description"
			>List all applications asociated with your account.</svelte:fragment
		>
		<svelte:fragment slot="actions">
			<Button href="/apps/new" size="xs">
				<Plus />
				New app
			</Button>
		</svelte:fragment>
	</PageHeader>
	<div class=""></div>
</div>
