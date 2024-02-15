<script lang="ts">
	export let message: string;
	export let title: string;
</script>

<div>
	{@html title}
	<div class="font-normal text-neutral-600 dark:text-neutral-400 text-sm">
		{@html message}
	</div>
</div>
