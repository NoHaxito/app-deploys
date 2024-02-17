<script lang="ts">
	import { ArrowClockwise, CaretLeft, CircleNotch, ListDashes, Plus } from 'phosphor-svelte';
	import { FormButton } from '../ui/form/';
	import { Button, buttonVariants } from '../ui/button';
	import * as Drawer from '$components/ui/drawer';
	import type { Infer, SuperForm } from 'sveltekit-superforms';
	import type { TypeSchemaForm } from '$/routes/(dashboard)/services/new/schema';
	import { instanceTypes } from '$/lib/config/application-instance-type';
	import { applicationTypes } from '$/lib/config/application-types';
	export let isRepoLoaded: boolean;
	export let isSubmitting: boolean;
	export let formData: SuperForm<Infer<TypeSchemaForm>>['form'];
	export let isLoadingRepository: boolean;
	export let loadBranches: () => Promise<string | number | undefined>;

	$: selectedApplicationType = applicationTypes.find((i) => i.value === $formData.type);
	$: selectedInstance = instanceTypes.find((i) => i.value === $formData.instance_type);
</script>

<Drawer.Root direction="right">
	<Drawer.Trigger asChild let:builder>
		<Button builders={[builder]} variant="secondary" size="sm">
			<ListDashes />
			Overview
		</Button>
	</Drawer.Trigger>
	<Drawer.Content drawerDirection="right" class="!w-72">
		<Drawer.Header>
			<Drawer.Title>Overview</Drawer.Title>
			<Drawer.Description>New application form overview.</Drawer.Description>
		</Drawer.Header>
		<div class="grid gap-y-2 px-4 py-2">
			<div class="space-y-2">
				<h4 class="text-lg font-bold">Application Type</h4>
				<div
					class="border-muted bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:bg-accent [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-center rounded-lg border-2 p-2 transition-colors"
				>
					<svelte:component this={selectedApplicationType?.icon} class="h-6 w-6" />
					{selectedApplicationType?.label}
				</div>
			</div>
			<div class="space-y-2">
				<h4 class="text-lg font-bold">Instance Type</h4>
				<div
					class="border-muted bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:bg-accent [&:has([data-state=checked])]:border-primary flex flex-col gap-1 rounded-lg border-2 p-2 transition-colors"
				>
					<p class="text-md font-bold">
						{selectedInstance?.name}
					</p>
					<span class="text-sm text-neutral-700 dark:text-neutral-400">
						{selectedInstance?.ram} (RAM)
						<span aria-hidden="true">&middot;</span>{' '}{selectedInstance?.cpus}
					</span>
				</div>
			</div>
		</div>
	</Drawer.Content>
</Drawer.Root>
<div class="flex items-center gap-2">
	<Button on:click={() => {}} variant="destructive" size="sm" class="w-full sm:w-auto">
		<CaretLeft />
		Cancel
	</Button>
	{#if isRepoLoaded}
		<FormButton size="sm" class="w-full sm:w-auto">
			{#if isSubmitting}
				<CircleNotch class="animate-spin" />
			{:else}
				<Plus />
			{/if}
			Create
		</FormButton>
	{:else}
		<Button
			disabled={isLoadingRepository}
			on:click={loadBranches}
			size="sm"
			class="w-full sm:w-auto"
		>
			{#if isLoadingRepository}
				<CircleNotch class="animate-spin" />
			{:else}
				<ArrowClockwise />
			{/if}
			Load repository
		</Button>
	{/if}
</div>
