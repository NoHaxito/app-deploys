<script lang="ts">
	import { Check } from 'phosphor-svelte';

	export let steps: string[] = [];
	export let activeStep = 0;
</script>

<ul class="relative flex flex-col md:flex-row">
	{#each steps as step, i}
		<li
			data-step-active={activeStep === i ? 'active' : 'inactive'}
			data-step={activeStep > i ? 'completed' : 'uncompleted'}
			class="group flex flex-1 gap-x-2 md:block md:shrink md:basis-0"
		>
			<div
				class="flex min-h-[28px] min-w-[28px] flex-col items-center align-middle text-xs md:inline-flex md:w-full md:flex-row md:flex-wrap"
			>
				<span
					class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-neutral-100 font-medium text-white group-data-[step-active=active]:!bg-blue-600 group-data-[step=completed]:!bg-blue-600 group-data-[step-active=inactive]:text-neutral-800 group-data-[step=completed]:text-white dark:bg-neutral-700 dark:group-data-[step-active=inactive]:text-white"
				>
					{#if activeStep > i}
						<Check />
					{:else}
						{i + 1}
					{/if}
				</span>
				<div
					class="h-full min-h-8 w-1 bg-neutral-200 group-last:hidden md:mt-0 md:h-1 md:min-h-max md:w-full md:flex-1 dark:bg-neutral-700"
				>
					<div
						class="h-0 w-1 !bg-blue-600 transition-[width,height] duration-500 ease-in-out group-data-[step=completed]:h-full md:mt-0 md:h-1 md:w-0 md:flex-1 group-data-[step=completed]:md:w-full"
					/>
				</div>
			</div>
			<div class="mt-1.5 md:mt-3">
				<span
					class="block text-sm font-medium text-neutral-800 group-data-[step-active=active]:!text-blue-500 dark:text-white"
				>
					{step}
				</span>
			</div>
		</li>
	{/each}
</ul>
