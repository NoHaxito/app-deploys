<script lang="ts">
	import { Button } from '$components/ui/button';
	import PageHeader from '$/lib/components/page-header.svelte';
</script>

<div class="space-y-4">
	<PageHeader>
		<svelte:fragment slot="title">Dashboard</svelte:fragment>
		<!-- <svelte:fragment slot="description"></svelte:fragment> -->
	</PageHeader>
	<div class="">
		<Button href="/auth/register" size="xs">Button</Button>
	</div>
</div>
