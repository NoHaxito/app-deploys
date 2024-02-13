<script lang="ts">
	import * as Form from '$components/ui/form';
	import * as Collapsible from '$components/ui/collapsible';
	import { Button } from '$components/ui/button';
	import { CaretDown, CaretLeft, CaretRight, Check, HardDrives } from 'phosphor-svelte';
	import { Label } from '$components/ui/label';
	import * as RadioGroup from '$components/ui/radio-group';
	import PageHeader from '$components/page-header.svelte';
	import { page } from '$app/stores';
	import { applicationSchema, type TypeSchemaForm } from './schema';
	import SuperDebug, { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zod, type Infer } from 'sveltekit-superforms/adapters';

	import { Input } from '$components/ui/input';
	import { toast } from 'svelte-sonner';
	import { applicationTypes } from '$/lib/config/application-types';
	import Stepper from '$/lib/components/stepper.svelte';
	let steps = ['Choose Type', 'Configure Source', 'Info Details', 'Overview'];
	let activeStep: number = 0;
	let isLoading: boolean;
	const form = superForm($page.data.form as SuperValidated<Infer<TypeSchemaForm>>, {
		validators: zod(applicationSchema),
		onResult(e) {
			console.log(e.result);
		},
		onSubmit(e) {
			toast.error('Please complete all steps.', {
				description: 'Complete all steps and submit the form again.'
			});
			e.cancel();
			return;
		},
		onError(e) {
			console.log(e);
		}
	});
	const { errors, enhance, form: formData } = form;
	console.log($errors.repository_url);
</script>

<div class="space-y-4">
	<!-- <Stepper {steps} bind:activeStep /> -->
	<PageHeader>
		<svelte:fragment slot="title">
			<!-- {#if activeStep === 0}
				Choose Type
			{:else if activeStep === 1}
				Configure Source
			{/if} -->
			New Application
		</svelte:fragment>
		<svelte:fragment slot="description">
			<!-- {#if activeStep === 0}
				Choose an application type to create your application and click next step.
			{:else if activeStep === 1}
				Configure the source of your application.
			{/if} -->
			Fill all fields and create your next application.
		</svelte:fragment>
	</PageHeader>
	<Form.Root {form} controlled schema={applicationSchema} let:config asChild>
		<form use:enhance method="post" class="grid gap-2">
			<div class="col-span-full grid gap-2 border-b pb-6 sm:grid-cols-4">
				<div class="col-span-2">
					<h3 class="text-lg font-semibold">Application Details</h3>
					<p class="mt-1 text-sm leading-6 text-neutral-500">
						Basic information about your application.
					</p>
					<span class="text-sm text-neutral-500">* All fields are required</span>
				</div>
				<div class="col-span-2 grid gap-2 sm:grid-cols-2">
					<Form.Field {config} name="name">
						<Form.Item class="col-span-2">
							<Form.Label>Name</Form.Label>
							<Form.Input placeholder="My Application" />
							<!-- <Form.Description>This is your public display name.</Form.Description> -->
							<Form.Validation />
						</Form.Item>
					</Form.Field>
					<Form.Field {config} name="description">
						<Form.Item class="sm:col-span-full">
							<Form.Label>Description</Form.Label>
							<Form.Textarea placeholder="My Application description" class="!min-h-3" />
							<!-- <Form.Description>This is your public display name.</Form.Description> -->
							<Form.Validation />
						</Form.Item>
					</Form.Field>
				</div>
			</div>
			<div class="col-span-full grid gap-2 border-b pb-6 pt-2 sm:grid-cols-4">
				<div class="col-span-2">
					<h3 class="text-lg font-semibold">Application Type & Source</h3>
					<p class="mt-1 text-sm leading-6 text-neutral-500">
						<!-- make an description for a form section related to type & source -->
						Choose your application type and configure a source.
					</p>
				</div>
				<div class="col-span-2 grid gap-2 sm:grid-cols-2">
					<Form.Field {config} name="type">
						<Form.Item class="col-span-2">
							<Form.RadioGroup class="grid gap-4 sm:grid-cols-3">
								{#each applicationTypes as type}
									<Label
										for={type.value}
										class="border-muted bg-popover hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:bg-accent [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-lg border-2 p-6 py-8"
									>
										<Form.RadioItem
											value={type.value}
											id={type.value}
											class="sr-only"
											aria-label={type.value}
										/>
										<svelte:component this={type.icon} class="mb-3 h-6 w-6" />
										{type.label}
									</Label>
								{/each}
							</Form.RadioGroup>

							<Form.Validation />
						</Form.Item>
					</Form.Field>
					<Form.Field {config} name="repository_url">
						<Form.Item class="col-span-2">
							<Form.Label>Repository URL</Form.Label>
							<div class="flex items-center gap-1">
								<Form.Input placeholder="https://github.com/username/repository" />
								<Button
									class="h-8"
									disabled={$formData.repository_url.length === 0 ||
										$errors.repository_url !== null}>Load repository</Button
								>
							</div>
							<!-- <Form.Description>This is your public display name.</Form.Description> -->
							<Form.Validation />
						</Form.Item>
					</Form.Field>
				</div>
			</div>
			<Collapsible.Root class="w-full space-y-1 border-b data-[state=open]:pb-6">
				<Collapsible.Trigger
					class="group flex w-full items-center justify-between gap-2 py-4 text-lg font-semibold"
				>
					Application settings
					<CaretDown class="h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180" />
				</Collapsible.Trigger>
				<Collapsible.Content class="mt-10 grid">
					<div class="col-span-full grid gap-2 sm:grid-cols-4">
						<div class="col-span-2">
							<h3 class="text-md font-semibold">Build settings</h3>
							<p class="mt-1 text-sm leading-6 text-neutral-500">
								Customize the build settings of your application.
							</p>
						</div>
						<div class="col-span-2 grid gap-2 sm:grid-cols-2">
							<Form.Field {config} name="install_command">
								<Form.Item class="col-span-full">
									<Form.Label>Install Command</Form.Label>
									<Form.Input placeholder="npm install" />
									<Form.Description
										>Configure the install command, by default our systems will detect your package
										manager and install the packages using it.</Form.Description
									>
									<Form.Validation />
								</Form.Item>
							</Form.Field>
							<Form.Field {config} name="build_command">
								<Form.Item class="col-span-full">
									<Form.Label>Build Command</Form.Label>
									<Form.Input placeholder="npm run build" />
									<Form.Description
										>Configure the install command, by default our systems will detect your
										package.json and run <code>build</code> script if exists.</Form.Description
									>
									<Form.Validation />
								</Form.Item>
							</Form.Field>
							<Form.Field {config} name="start_command">
								<Form.Item class="col-span-full">
									<Form.Label>Start Command</Form.Label>
									<Form.Input placeholder="npm run build" />
									<Form.Description
										>Configure the install command, by default our systems will detect your
										package.json and run <code>start</code> script if exists.</Form.Description
									>
									<Form.Validation />
								</Form.Item>
							</Form.Field>
						</div>
					</div>
					<div class="col-span-full grid gap-2 sm:grid-cols-4">
						<div class="col-span-2">
							<h3 class="text-md font-semibold">Environment Variables</h3>
							<p class="mt-1 text-sm leading-6 text-neutral-500">
								Add environment variables to your application.
							</p>
						</div>
						<div class="col-span-2 grid gap-2 sm:grid-cols-2">
							<Form.Field {config} name="environment_variables">
								<Form.Item class="col-span-full">
									<Form.Label>Environment Variables</Form.Label>
									<Form.Textarea placeholder="KEY=VALUE" />
									<Form.Description
										>Configure the install command, by default our systems will detect your
										package.json and run <code>start</code> script if exists.</Form.Description
									>
									<Form.Validation />
								</Form.Item>
							</Form.Field>
						</div>
					</div>
				</Collapsible.Content>
			</Collapsible.Root>

			<div class="">
				<Button variant="secondary" size="sm">Cancel</Button>
				<Form.Button size="sm">Create</Form.Button>
			</div>
		</form>
	</Form.Root>
	<!-- <form use:enhance method="POST" action="?">
		{#if activeStep === 0}
			<div class="grid gap-y-1">
				<RadioGroup.Root bind:value={$form.type} class="grid grid-cols-3 gap-4">
					{#each applicationTypes as type}
						<Label
							for={type.value}
							class="border-muted bg-popover hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:bg-accent [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-lg border-2 p-6 py-8"
						>
							<RadioGroup.Item
								value={type.value}
								id={type.value}
								class="sr-only"
								aria-label={type.value}
							/>
							<svelte:component this={type.icon} class="mb-3 h-6 w-6" />
							{type.label}
						</Label>
					{/each}
				</RadioGroup.Root>
				{#if $errors.type}<span class="text-sm text-red-500">{$errors.type[0]}</span>{/if}
			</div>
		{/if}
		{#if activeStep === 1}
			<div class="grid gap-1">
				<Label for="repository_url">Repository URL</Label>
				<Input
					id="repository_url"
					bind:value={$form.repository_url}
					placeholder="https://github.com/username/repository"
				/>
				{#if $errors.repository_url}<span class="text-sm text-red-500"
						>{$errors.repository_url[0]}</span
					>{/if}
			</div>
		{/if}
	</form> -->

	<!-- <div class="flex items-center justify-between gap-2">
		<Button size="sm" variant="secondary" disabled={activeStep === 0} on:click={() => activeStep--}>
			<CaretLeft />
			Prev step</Button
		>
		<Button
			size="sm"
			variant="secondary"
			disabled={activeStep === steps.length - 1}
			on:click={() => activeStep++}
			>Next step
			<CaretRight />
		</Button>
	</div> -->
</div>
