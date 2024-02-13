<script lang="ts" context="module">
	import { z } from 'zod';
	export const registerFormSchema = z.object({
		username: z.string().min(2).max(50),
		email: z.string().email(),
		password: z.string().min(6).max(50),
		confirmPassword: z.string().min(6).max(50)
	});
	type FormSchema = typeof registerFormSchema;
</script>

<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { toast } from 'svelte-sonner';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import { Button } from '$components/ui/button';
	import { cn } from '$lib/utils';
	import { CircleNotch, GithubLogo, GoogleLogo } from 'phosphor-svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod } from 'sveltekit-superforms/adapters';
	let className: string | undefined | null = undefined;
	export { className as class };
	export let form: SuperValidated<Infer<FormSchema>>;

	const superFrm = superForm(form, {
		validators: zod(registerFormSchema),
		onResult(event) {
			if (event.result.type === 'failure') {
				toast.error('Something went wrong!', {
					description: event.result.data?.message ?? 'Please try again'
				});
			}
			if (event.result.type === 'redirect') {
				toast.success('Registered successfully');
			}
		}
	});
	const { submitting } = superFrm;
</script>

<div class={cn('grid gap-6', className)} {...$$restProps}>
	<Form.Root
		form={superFrm}
		schema={registerFormSchema}
		let:config
		controlled
		class="grid gap-0.5 sm:grid-cols-2 sm:gap-1"
		method="POST"
	>
		<Form.Field {config} name="username">
			<Form.Item>
				<Form.Label>Username</Form.Label>
				<Form.Input type="text" placeholder="my username" />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
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
		<Form.Field {config} name="confirmPassword">
			<Form.Item>
				<Form.Label>Confirm Password</Form.Label>
				<Form.Input
					placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
					type="password"
				/>
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Button size="sm" class="sm:col-span-2" disabled={$submitting}>
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
