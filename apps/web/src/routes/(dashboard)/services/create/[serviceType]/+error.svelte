<script lang="ts">
	import { Button } from '$/lib/components/ui/button';
	import { page } from '$app/stores';
	import { CaretLeft, House } from 'phosphor-svelte';
</script>

<!-- <h1>{$page.status}: {$page.error?.message}</h1> -->

<section class="">
	<div class="mx-auto flex h-[65vh] max-w-screen-xl flex-col items-center justify-center gap-y-1">
		<div class="mx-auto max-w-screen-sm text-center">
			<h1
				class="mb-4 text-7xl font-extrabold tracking-tight text-blue-600 lg:text-9xl dark:text-blue-500"
			>
				{$page.status}
			</h1>
			<p class="mb-4 text-xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
				{$page.error?.title}
			</p>
			<p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
				{$page.error?.message}
			</p>
		</div>
		<div class="grid w-full max-w-[300px] gap-1">
			<Button variant="outline" href="/services/create">
				<CaretLeft />
				Go back
			</Button>
			<Button variant="outline" href="/">
				<House />
				Go home
			</Button>
		</div>
	</div>
</section>
