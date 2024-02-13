<script lang="ts">
	import {
		ArrowClockwise,
		CaretLeft,
		CaretRight,
		CircleNotch,
		ListDashes,
		Plus
	} from 'phosphor-svelte';
	import { FormButton } from '../ui/form/';
	import { Button } from '../ui/button';
	export let isRepoLoaded: boolean;
	export let form: any;
	const { submitting } = form;
	export let loadBranches: () => Promise<string | number | undefined>;
</script>

<Button variant="secondary" size="sm">
	<ListDashes />
	Overview</Button
>
<div class="flex items-center gap-2">
	<Button on:click={() => {}} variant="destructive" size="sm" class="w-full sm:w-auto">
		<CaretLeft />
		Cancel</Button
	>
	{#if isRepoLoaded}
		<FormButton size="sm" class="w-full sm:w-auto">
			{#if $submitting}
				<CircleNotch class="animate-spin" />
			{:else}
				<Plus />
			{/if}
			Create</FormButton
		>
	{:else}
		<Button on:click={loadBranches} size="sm" class="w-full sm:w-auto">
			<ArrowClockwise />
			Load repository
		</Button>
	{/if}
</div>
