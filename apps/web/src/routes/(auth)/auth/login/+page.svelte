<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { CaretRight, Stack } from 'phosphor-svelte';
	import AuthLoginForm from './auth-login-form.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div
	class="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<Button
		href="/auth/register"
		size="xs"
		variant="ghost"
		class="absolute right-4 top-4 md:right-8 md:top-8"
	>
		Register <CaretRight class="h-4 w-4" />
	</Button>
	<div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
		<div
			class="absolute inset-0 bg-cover"
			style="
				background-image:
					url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80);"
		/>
		<a
			href="/"
			class="sticky top-2 z-20 flex w-max items-center space-x-2 text-lg transition-transform ease-in active:scale-95"
		>
			<Stack class="h-6 w-6" weight="fill" />
			<span class="text-lg font-bold">Manager</span>
		</a>
		<div class="relative z-20 mt-auto"></div>
	</div>
	<div class="">
		<div class="mx-auto my-auto flex w-full flex-col justify-center space-y-6 py-8 sm:w-[400px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Welcome back</h1>
				<p class="text-sm text-muted-foreground">
					Enter your email and password to login to your account.
				</p>
			</div>
			<AuthLoginForm form={data.form} />
			<p class="px-8 text-center text-sm text-muted-foreground">
				By clicking continue, you agree to our{' '}
				<a href="/terms" class="underline underline-offset-4 hover:text-primary">
					Terms of Service
				</a>{' '}
				and{' '}
				<a href="/privacy" class="underline underline-offset-4 hover:text-primary">
					Privacy Policy
				</a>
				.
			</p>
		</div>
	</div>
</div>
