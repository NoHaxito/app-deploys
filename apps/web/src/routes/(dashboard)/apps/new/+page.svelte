<script lang="ts">
	import * as Form from '$components/ui/form';
	import IntersectionObserver from 'svelte-intersection-observer';
	import * as Accordion from '$components/ui/accordion';
	import PageHeader from '$components/page-header.svelte';
	import { page } from '$app/stores';
	import { applicationSchema, type TypeSchemaForm } from './schema';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zod, type Infer } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { applicationTypes } from '$lib/config/application-types';
	import { instanceTypes } from '$lib/config/application-instance-type';
	import InfoCircle from '$components/info-circle.svelte';
	import NewFormButtons from '$components/apps/new-form-buttons.svelte';
	import NewFloatingBar from '$components/apps/new-floating-bar.svelte';
	import UpgradeAccount from '$/lib/components/toasts/upgrade-account.svelte';

	let isLoading: boolean;
	let isLoadingRepository: boolean;

	let element: HTMLElement;
	let intersecting: boolean;

	const form = superForm($page.data.form as SuperValidated<Infer<TypeSchemaForm>>, {
		validators: zod(applicationSchema),
		dataType: 'form',
		resetForm: false,
		onResult(e) {
			if (e.result.type === 'failure') {
				toast.error('Something went wrong!', {
					description: 'Fix all problems and try again later.'
				});
			}
		},
		onError(e) {
			toast.error('Something went wrong!', {
				description: e.result.error.message
			});
		}
	});
	const { form: formData } = form;
	let userPlan = 'hobby';
	let repository = {
		owner: '',
		name: ''
	};
	let repositoryBranches: string[] = [];

	const loadBranches = async () => {
		isLoadingRepository = true;
		const gitUrl = $formData.repository_url.replace('http://', '').replace('https://', '');
		let [host, ...path] = gitUrl.split('/');
		const [owner, repo] = path;
		repository.owner = owner;
		repository.name = repo;
		const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/branches`);
		if (!res.ok) {
			isLoadingRepository = false;

			return toast.error('Something went wrong!', {
				description: 'Repository not found, make sure it exists and is public.'
			});
		}
		const data = await res.json();
		toast.success('Repository loaded successfully.', {
			description: 'Now you can select a branch to clone.'
		});
		repositoryBranches = data.map((branch: any) => branch.name);
		isLoadingRepository = false;
	};
</script>

<div class="space-y-4">
	<PageHeader>
		<svelte:fragment slot="title">New Application</svelte:fragment>
		<svelte:fragment slot="description">
			Fill all fields and create your next application.
		</svelte:fragment>
	</PageHeader>
	<Form.Root
		{form}
		method="post"
		class="grid gap-2"
		controlled
		schema={applicationSchema}
		let:config
	>
		<div class="col-span-full grid gap-2 border-b pb-6 pt-2 sm:grid-cols-4">
			<div class="col-span-2">
				<h3 class="text-lg font-semibold">Application Details</h3>
				<p class="mt-1 text-sm leading-6 text-neutral-500">
					Basic information about your application.
				</p>
			</div>
			<div class="col-span-2 grid grid-cols-1 gap-2">
				<Form.Field {config} name="name">
					<Form.Item class="col-span-2">
						<Form.Label>Name</Form.Label>
						<Form.Input placeholder="My Application" />
						<!-- <Form.Description>This is your public display name.</Form.Description> -->
						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<Form.Field {config} name="description">
					<Form.Item class="">
						<Form.Label>Description</Form.Label>
						<Form.Textarea placeholder="My Application description" class=" !min-h-3" />
						<!-- <Form.Description>This is your public display name.</Form.Description> -->
						<Form.Validation />
					</Form.Item>
				</Form.Field>
			</div>
		</div>
		<div class="col-span-full grid gap-2 border-b pb-6 pt-2 sm:grid-cols-4">
			<div class="col-span-2">
				<h3 class="text-lg font-semibold">Application Type</h3>
				<p class="mt-1 text-sm leading-6 text-neutral-500">Choose your application type.</p>
			</div>
			<div class="col-span-2 grid gap-2 sm:grid-cols-2">
				<Form.Field {config} name="type">
					<Form.Item class="col-span-2">
						<Form.RadioGroup class="grid gap-4 sm:grid-cols-2">
							{#each applicationTypes as type}
								<Form.Label
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
								</Form.Label>
							{/each}
						</Form.RadioGroup>

						<Form.Validation />
					</Form.Item>
				</Form.Field>
			</div>
		</div>
		<div class="col-span-full grid gap-2 border-b pb-6 pt-2 sm:grid-cols-4">
			<div class="col-span-2">
				<h3 class="text-lg font-semibold">Source Repository and Branch</h3>
				<p class="mt-1 text-sm leading-6 text-neutral-500">
					Configure the source repository and choose a branch to clone.
				</p>
			</div>
			<div class="col-span-2 grid gap-2">
				<Form.Field {config} name="repository_url">
					<Form.Item>
						<Form.Label>Repository URL</Form.Label>
						<Form.Input
							on:change={(e) => console.log(e)}
							placeholder="https://github.com/username/repository"
						/>
						<Form.Description
							>If you want to change the repository you must need to reload the page.</Form.Description
						>
						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<Form.Field {config} name="branch">
					<Form.Item>
						<Form.Label>Branch</Form.Label>
						<Form.Select disabled={repositoryBranches.length === 0}>
							<Form.SelectTrigger placeholder="Select a branch to clone" />
							<Form.SelectContent>
								{#each repositoryBranches as branch}
									<Form.SelectItem value={branch}>{branch}</Form.SelectItem>
								{/each}
							</Form.SelectContent>
						</Form.Select>
						<Form.Validation />
					</Form.Item>
				</Form.Field>
			</div>
		</div>
		<div class="col-span-full grid gap-2 border-b pb-6 pt-2 sm:grid-cols-4">
			<div class="col-span-2">
				<h3 class="text-lg font-semibold">Build settings</h3>
				<p class="mt-1 text-sm leading-6 text-neutral-500">
					Customize the build settings of your application.
				</p>
			</div>
			<div class="col-span-2 grid gap-2 sm:grid-cols-2">
				<Form.Field {config} name="install_command">
					<Form.Item class="col-span-full">
						<Form.Label class="flex items-center gap-2"
							>Install Command
							<InfoCircle>
								Customize the install command, by default our systems will detect your package
								manager and install all dependencies using it.
							</InfoCircle>
						</Form.Label>
						<Form.Input placeholder="npm install" />

						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<Form.Field {config} name="build_command">
					<Form.Item class="col-span-full">
						<Form.Label>Build Command</Form.Label>
						<Form.Input placeholder="npm run build" />
						<Form.Description
							>Configure the build command, by default our systems will detect your package.json and
							run <code>build</code> script if exists.</Form.Description
						>
						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<Form.Field {config} name="start_command">
					<Form.Item class="col-span-full">
						<Form.Label>Start Command</Form.Label>
						<Form.Input placeholder="npm run build" />
						<Form.Description
							>Configure the start command, by default our systems will detect your package.json and
							run <code>start</code> script if exists.</Form.Description
						>
						<Form.Validation />
					</Form.Item>
				</Form.Field>
			</div>
		</div>
		<Accordion.Root multiple class="border-t-none">
			<Accordion.Item class="px-2" value="environment_variables">
				<Accordion.Trigger class="hover:underline-none text-lg font-semibold"
					>Environment Variables
					<p slot="description" class="mt-1 text-sm leading-6 text-neutral-500">
						Add environment variables to your application.
					</p>
				</Accordion.Trigger>
				<Accordion.Content class="px-0.5">
					<div class="col-span-full grid gap-2 pb-6 pt-2">
						<div class="col-span-2 grid gap-2 sm:grid-cols-2">
							<Form.Field {config} name="environment_variables">
								<Form.Item class="col-span-full">
									<Form.Label>Environment Variables</Form.Label>
									<Form.Textarea placeholder="KEY=VALUE" />
									<Form.Description
										>Add or paste your environment variables for your application following the <code
											>KEY=VALUE</code
										> format.</Form.Description
									>
									<Form.Validation />
								</Form.Item>
							</Form.Field>
						</div>
					</div>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item class="px-2" value="instance_type">
				<Accordion.Trigger class="hover:underline-none text-lg font-semibold"
					>Instance Type
					<p slot="description" class="text-sm leading-6 text-neutral-500">
						Choose your instance type, a better instance is equal to better performance.
					</p>
				</Accordion.Trigger>
				<Accordion.Content class="px-0.5">
					<div class="col-span-full grid gap-2 pb-6 pt-2">
						<div class="grid gap-2 sm:grid-cols-2">
							<Form.Field {config} name="instance_type">
								<Form.Item class="col-span-2">
									<Form.RadioGroup class="grid gap-4 sm:grid-cols-2">
										{#each instanceTypes as type}
											<Form.Label
												for={type.value}
												class="border-muted bg-popover hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:bg-accent [&:has([data-state=checked])]:border-primary flex flex-col gap-1 rounded-lg border-2 p-4 transition-colors"
											>
												<Form.RadioItem
													on:click={(e) => {
														if (!type.available_plans.includes(userPlan)) {
															e.preventDefault();
															toast.warning(UpgradeAccount, {
																componentProps: {
																	title: 'Upgrade account required.',
																	message: `To use this instance you need to upgrade your account to <strong>${type.available_plans[0]}</strong> or a higher plan.`
																}
															});
														}
													}}
													value={type.value}
													id={type.value}
													class="sr-only"
													aria-label={type.value}
												/>

												<p class="text-xl font-bold">
													{type.name}
												</p>
												<span class="text-neutral-700 dark:text-neutral-400">
													{type.ram} (RAM)
													<span aria-hidden="true">&middot;</span>{' '}{type.cpus}
												</span>
											</Form.Label>
										{/each}
									</Form.RadioGroup>

									<Form.Validation />
								</Form.Item>
							</Form.Field>
						</div>
					</div>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>

		<NewFloatingBar {intersecting}>
			<NewFormButtons
				{isLoadingRepository}
				{loadBranches}
				isRepoLoaded={repositoryBranches.length !== 0}
				{form}
			/>
		</NewFloatingBar>
		<IntersectionObserver {element} bind:intersecting threshold={0.5}>
			<div
				bind:this={element}
				id="buttons-nav"
				class="flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:justify-between"
			>
				<NewFormButtons
					{isLoadingRepository}
					{loadBranches}
					isRepoLoaded={repositoryBranches.length !== 0}
					{form}
				/>
			</div>
		</IntersectionObserver>
	</Form.Root>
</div>
