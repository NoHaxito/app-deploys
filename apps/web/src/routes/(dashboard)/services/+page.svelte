<script lang="ts">
	import { Button } from '$components/ui/button';
	import PageHeader from '$/lib/components/page-header.svelte';
	import { CircleNotch, CirclesFour, Plus } from 'phosphor-svelte';
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';
	import type { PageData } from '../$types';
	import { ProgressBar } from '@prgm/sveltekit-progress-bar';
	import type { Services } from '$/lib/types';
	let bar: any;
	export let data: PageData;
	const client = useQueryClient();
	$: services = createQuery<Services[]>({
		queryKey: ['refetch'],
		queryFn: async () =>
			await fetch('http://141.95.164.130:5173/api/services', {
				headers: {
					Authorization: `Bearer ${data.user?.id}`
				}
			}).then((r) => r.json()),
		// Refetch the data every second
		refetchInterval: 1000 * 10,
		refetchOnWindowFocus: 'always'
	});
	$: if ($services.isFetching) {
		if (bar) {
			bar.start();
		}
	}
	$: if ($services.isFetched) {
		if (bar) {
			bar.complete();
		}
	}
</script>

<ProgressBar bind:this={bar} zIndex={100} class="text-indigo-500" />
<div class="space-y-4">
	<PageHeader>
		<svelte:fragment slot="title">Services</svelte:fragment>
		<svelte:fragment slot="description"
			>List all services asociated with your account.</svelte:fragment
		>
		<svelte:fragment slot="actions">
			<Button href="/services/create" size="xs">
				<Plus />
				Create service
			</Button>
		</svelte:fragment>
	</PageHeader>
	{#if $services.status === 'pending'}
		<div class="flex h-[60vh] w-full flex-1 items-center justify-center">
			<CircleNotch class="animate-spin" />
		</div>
	{/if}
	{#if $services.isError}
		<div class="flex h-[60vh] w-full flex-1 flex-col items-center justify-center">
			<div>Error fetching data</div>
			<Button on:click={() => $services.refetch()}>Retry</Button>
		</div>
	{/if}
	{#if $services.isSuccess}
		{#if $services.data.length > 0}
			<div>services should render here</div>
		{:else}
			<div class="flex h-[60vh] w-full flex-1 items-center justify-center">
				<div
					class="mt-4 flex h-96 w-[100%] flex-col items-center justify-center gap-2 rounded-sm border border-dashed p-4"
				>
					<div class="text-center">
						<CirclesFour class="text-muted-foreground mx-auto size-12" aria-hidden={true} />
						<p class="text-default mt-2 text-lg font-medium">No created services found</p>
						<p class="text-neutral-500">Get started by creating one</p>
					</div>
					<Button href="/services/create" size="sm">
						<Plus />
						Create service
					</Button>
				</div>
			</div>
		{/if}
	{/if}
</div>
