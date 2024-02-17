<script lang="ts">
	import PageHeader from '$components/page-header.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import type { PageData } from './$types';
	import { CaretLeft, CircleNotch, CirclesFour, Phone } from 'phosphor-svelte';
	import { Button } from '$components/ui/button';
	import { service_icons } from '$/lib/config/service-icons';
	import type { ServiceTypes } from '$/lib/types';
	import { page } from '$app/stores';
	export let data: PageData;

	$: service_types = createQuery<ServiceTypes[]>({
		queryKey: ['service_types_fetch'],
		queryFn: async () =>
			await fetch('http://141.95.164.130:5173/api/services/types', {
				headers: {
					Authorization: `Bearer ${data.user?.id}`
				}
			}).then((r) => r.json()),
		refetchInterval: false,
		refetchOnWindowFocus: false,
	});

	function getServiceIcon(id: string) {
		return service_icons[id as keyof typeof service_icons] ?? CirclesFour;
	}
</script>

<PageHeader>
	<svelte:fragment slot="title">Select service</svelte:fragment>
	<svelte:fragment slot="actions">
		<Button href={'/services'} size="xs">
			<CaretLeft /> Back
		</Button>
	</svelte:fragment>
</PageHeader>

{#if $service_types.status === 'pending'}
	<div class="flex h-[60vh] w-full flex-1 items-center justify-center">
		<CircleNotch class="animate-spin" />
	</div>
{/if}

{#if $service_types.isError}
	<div class="flex h-[60vh] w-full flex-1 flex-col items-center justify-center gap-2">
		<div class="text-center">
			<CirclesFour class="text-muted-foreground mx-auto size-12" aria-hidden={true} />
			<p class="text-default mt-2 text-lg font-medium">Unexpected error occurred</p>
			<p class="text-neutral-500">{$service_types.error.message}</p>
		</div>
		<Button class="w-[80%] md:w-auto" on:click={() => $service_types.refetch()}>Retry</Button>
	</div>
{/if}

{#if $service_types.isSuccess}
	{#if $service_types.data.length > 0}
		<div class="my-3 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
			{#each $service_types.data as service_type}
				<a
					href="/services/create/{service_type.id}"
					class="border-muted bg-popover hover:bg-accent hover:text-accent-foreground flex flex-col gap-1 rounded-lg border-2 p-4 transition-colors"
				>
					<div class="flex items-center gap-2">
						<svelte:component this={getServiceIcon(service_type.id)} class="h-6 w-6" />
						<p class="font-bold">
							{service_type.name}
						</p>
					</div>
					<span class="text-xs text-neutral-700 dark:text-neutral-400">
						{service_type.description ?? ''}
					</span>
				</a>
			{/each}
		</div>
	{:else}
		<div class="flex h-[60vh] w-full flex-1 items-center justify-center">
			<div
				class="mt-4 flex h-96 w-[100%] flex-col items-center justify-center gap-2 rounded-sm border border-dashed p-4"
			>
				<div class="text-center">
					<CirclesFour class="text-muted-foreground mx-auto size-12" aria-hidden={true} />
					<p class="text-default mt-2 text-lg font-medium">There are no service types found</p>
					<p class="text-neutral-500">Contact an administrator to create one</p>
				</div>
				<Button size="sm">
					<Phone />
					Contact
				</Button>
			</div>
		</div>
	{/if}
{/if}
