<script lang="ts" context="module">
	import { z } from 'zod';
	export const loginFormSchema = z.object({
		email: z.string().email(),
		password: z.string().min(6, { message: 'Password is required' })
	});
	type FormSchema = typeof loginFormSchema;
</script>

<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { zod } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import { Button } from '$components/ui/button';
	import { cn } from '$lib/utils';
	import { CircleNotch, GithubLogo, GoogleLogo } from 'phosphor-svelte';
	import { superForm } from 'sveltekit-superforms/client';
	let className: string | undefined | null = undefined;
	export { className as class };
	export let form: SuperValidated<Infer<FormSchema>>;

	const superFrm = superForm(form, {
		validators: zod(loginFormSchema),
		onResult(event) {
			if (event.result.type === 'failure') {
				toast.error('Something went wrong!', {
					description: event.result.data?.message ?? 'Please try again'
				});
			}
			if (event.result.type === 'redirect') {
				toast.success('Logged in successfully');
			}
		},
		onError(event) {
			toast.error('Something went wrong!', {
				description: event.result.error.message ?? 'Please try again'
			});
		}
	});
	const { submitting } = superFrm;
</script>

<div class={cn('grid gap-6', className)} {...$$restProps}>
	<Form.Root
		form={superFrm}
		schema={loginFormSchema}
		let:config
		controlled
		class="grid gap-0.5"
		method="POST"
	>
		<Form.Field {config} name="email">
			<Form.Item>
				<Form.Label>Email</Form.Label>
				<Form.Input placeholder="myemail@gmail.com" />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="password">
			<Form.Item>
				<Form.Label>Password</Form.Label>
				<Form.Input
					placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
					type="password"
				/>
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Button size="sm" class="" disabled={$submitting}>
			{#if $submitting}
				<CircleNotch class="h-4 w-4 animate-spin" />
			{/if}
			Create account</Form.Button
		>
	</Form.Root>
	<div class="relative">
		<div class="absolute inset-0 flex items-center">
			<span class="w-full border-t" />
		</div>
		<div class="relative flex justify-center text-xs uppercase">
			<span class="bg-background text-muted-foreground px-2"> Or continue with </span>
		</div>
	</div>
	<div class="grid gap-1 sm:grid-cols-2">
		<Button variant="outline" size="sm" type="button" disabled={$submitting}>
			{#if $submitting}
				<CircleNotch class="h-4 w-4 animate-spin" />
			{:else}
				<GithubLogo class="h-4 w-4" />
			{/if}
			{' '}
			GitHub
		</Button>
		<Button variant="default" size="sm" type="button" disabled={$submitting}>
			{#if $submitting}
				<CircleNotch class="h-4 w-4 animate-spin" />
			{:else}
				<GoogleLogo class="h-4 w-4" />
			{/if}
			{' '}
			Google
		</Button>
	</div>
</div>
