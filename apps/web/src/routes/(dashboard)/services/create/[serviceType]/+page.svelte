<!-- @ts-ignore -->
<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { Button } from '$/lib/components/ui/button';
	import IntersectionObserver from 'svelte-intersection-observer';
	import PageHeader from '$components/page-header.svelte';
	import * as Form from '$components/ui/form';
	import * as Accordion from '$components/ui/accordion';
	import { ArrowClockwise, CaretLeft, CircleNotch, ListBullets, Plus } from 'phosphor-svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { loadSchema } from './schema';
	import { toast } from 'svelte-sonner';
	import NewFloatingBar from '$/lib/components/apps/new-floating-bar.svelte';
	import { zod } from 'sveltekit-superforms/adapters';
	import InfoCircle from '$/lib/components/info-circle.svelte';
	import UpgradeAccount from '$/lib/components/toasts/upgrade-account.svelte';
	export let data: PageData;

	let element: HTMLElement;
	let intersecting: boolean;

	let repositoryBranches: string[] = [];
	let isRepoLoaded: boolean = false;
	let repository = {
		owner: '',
		name: ''
	};
	let loading = {
		repository: false
	};
	const { serviceType, instanceTypes, form: rawForm, user, serviceImages } = data;
	const serviceTypeSettings = serviceType.settings;
	const form = superForm(rawForm, {
		resetForm: false,
		validators: zod(loadSchema(serviceTypeSettings)!),
		validationMethod: 'auto',
		onSubmit: async (e) => {
			if (isRepoLoaded || serviceTypeSettings.isdatabase) {
				toast.success('Form submitted');
			} else {
				e.cancel();
				await loadRepository();
			}
		}
	});
	const { form: formData, submitting } = form;
	async function loadRepository() {
		loading.repository = true;
		// @ts-ignore
		const gitUrl = $formData.repository_url.replace('http://', '').replace('https://', '');
		let [host, ...path] = gitUrl.split('/');
		const [owner, repo, ...branch] = path;
		repository.owner = owner;
		repository.name = repo;
		const res = await fetch(
			// @ts-ignore

			`${env.PUBLIC_BACKEND_API_URL}/api/services/check-repository?owner=${owner}&name=${repo}&workdir=${$formData.workdir}`,
			{
				headers: {
					Authorization: `Bearer ${user?.id}`
				}
			}
		);
		if (!res.ok) {
			loading.repository = false;
			return toast.error('Something went wrong!', {
				description: 'The request has been rejected by the server, try again later.'
			});
		}
		const data = await res.json();
		if (data.error) {
			loading.repository = false;
			return toast.error('Something went wrong!', {
				description: 'Repository not found, make sure it exists and is public.'
			});
		}
		const { branches, isPnpm, isNpm, isYarn } = data;
		toast.success('Repository loaded successfully.', {
			description: 'Now you can select a branch to clone.'
		});
		isRepoLoaded = true;
		if (isNpm) {
			/* @ts-ignore */
			$formData.install_command = 'npm install';
			/* @ts-ignore */
			$formData.build_command = 'npm run build';
			/* @ts-ignore */
			$formData.start_command = 'npm run start';
			toast.success('Npm has been detected as your package manager', {});
		} else if (isPnpm) {
			/* @ts-ignore */
			$formData.install_command = 'pnpm install';
			/* @ts-ignore */
			$formData.build_command = 'pnpm run build';
			/* @ts-ignore */
			$formData.start_command = 'pnpm run start';
			toast.success('Pnpm has been detected as your package manager', {});
		} else if (isYarn) {
			/* @ts-ignore */
			$formData.install_command = 'yarn';
			/* @ts-ignore */
			$formData.build_command = 'yarn build';
			/* @ts-ignore */
			$formData.start_command = 'yarn start';
			toast.success('Yarn has been detected as your package manager', {});
		}
		repositoryBranches = branches;
		loading.repository = false;
	}
	console.log(serviceImages)
</script>

<PageHeader>
	<svelte:fragment slot="title">Create {serviceType.name} service</svelte:fragment>
	<svelte:fragment slot="actions">
		<Button href="/services/create" variant="destructive" size="xs" class="w-full sm:w-auto">
			<CaretLeft />
			Cancel
		</Button>
	</svelte:fragment>
</PageHeader>

<Form.Root
	{form}
	method="post"
	class="grid gap-2"
	controlled
	debug
	schema={loadSchema(serviceTypeSettings)}
	let:config
>
	<div class="col-span-full grid gap-2 border-b pb-6 pt-2 sm:grid-cols-4">
		<div class="col-span-2">
			<h3 class="text-lg font-semibold">Service Details</h3>
			<p class="mt-1 text-sm leading-6 text-neutral-500">Basic information about your service.</p>
		</div>
		<div class="col-span-2 grid grid-cols-1 gap-2">
			<Form.Field {config} name="name">
				<Form.Item class="col-span-2">
					<Form.Label>Name</Form.Label>
					<Form.Input placeholder="My Service" />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="description">
				<Form.Item class="">
					<Form.Label>Description</Form.Label>
					<Form.Textarea placeholder="My Application description" class=" !min-h-3" />

					<Form.Validation />
				</Form.Item>
			</Form.Field>
		</div>
	</div>
	{#if serviceTypeSettings.isdatabase}
		<div class="col-span-full grid gap-2 border-b pb-6 pt-2 sm:grid-cols-4">
			<div class="col-span-2">
				<h3 class="text-lg font-semibold">Database Settings</h3>
				<p class="mt-1 text-sm leading-6 text-neutral-500">Configure your database.</p>
			</div>
			<div class="col-span-2 grid gap-2 sm:grid-cols-2">
				<!-- @ts-ignore -->
				<Form.Field {config} name="database_name">
					<Form.Item>
						<Form.Label>Database Name</Form.Label>
						<Form.Input placeholder="mydatabase" />
						<Form.Description>Leaving this field empty will generate a random name</Form.Description
						>
						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<!-- @ts-ignore -->
				<Form.Field {config} name="database_user">
					<Form.Item>
						<Form.Label>Database User</Form.Label>
						<Form.Input placeholder="myuser" />
						<Form.Description>Leaving this field empty will generate a random user</Form.Description
						>
						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<Form.Field {config} name="database_password">
					<Form.Item>
						<Form.Label>Database Password</Form.Label>
						<Form.Input placeholder="••••••••" type="password" />
						<Form.Description
							>Leaving this field empty will generate a random password</Form.Description
						>
						<Form.Validation />
					</Form.Item>
				</Form.Field>
			</div>
		</div>
	{/if}
	{#if serviceTypeSettings.needsrepositorysource}
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
							on:change={(e) => {
								if (repositoryBranches.length !== 0) {
									isRepoLoaded = false;
									$formData.branch = '';
									repositoryBranches = [];
									repository = {
										owner: '',
										name: ''
									};
								}
							}}
							placeholder="https://github.com/username/repository"
						/>
						<Form.Description
							>If you want to change the repository you must need to edit the repository url and
							load repository again.</Form.Description
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
				<Form.Field {config} name="workdir">
					<Form.Item>
						<Form.Label>Work Dir</Form.Label>
						<Form.Input placeholder="." />
						<Form.Description
							>This is the directory where the build settings commands will be executed.</Form.Description
						>
						<Form.Validation />
					</Form.Item>
				</Form.Field>
			</div>
		</div>
	{/if}
	<Accordion.Root value={['instance_type']} multiple class="border-t-none">
		{#if serviceTypeSettings.needsbuildsettings}
			<Accordion.Item class="px-2" value="build_settings">
				<Accordion.Trigger class="hover:underline-none text-lg font-semibold"
					>Build Settings
					<p slot="description" class="text-start text-sm leading-6 text-neutral-500">
						Customize the build settings of your application.
					</p>
				</Accordion.Trigger>
				<Accordion.Content class="px-0.5">
					<div class="grid gap-2 pb-6 pt-2 sm:grid-cols-2">
						{#if serviceTypeSettings.needsinstallcommand}
							<Form.Field {config} name="install_command">
								<Form.Item>
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
						{/if}
						{#if serviceTypeSettings.needsbuildcommand}
							<Form.Field {config} name="build_command">
								<Form.Item>
									<Form.Label>Build Command</Form.Label>
									<Form.Input placeholder="npm run build" />
									<Form.Description
										>Configure the build command, by default our systems will detect your
										package.json and run <code>build</code> script if exists.</Form.Description
									>
									<Form.Validation />
								</Form.Item>
							</Form.Field>
						{/if}
						{#if serviceTypeSettings.needsstartcommand}
							<Form.Field {config} name="start_command">
								<Form.Item>
									<Form.Label>Start Command</Form.Label>
									<Form.Input placeholder="npm run build" />
									<Form.Description
										>Configure the start command, by default our systems will detect your
										package.json and run <code>start</code> script if exists.</Form.Description
									>
									<Form.Validation />
								</Form.Item>
							</Form.Field>
						{/if}
					</div>
				</Accordion.Content>
			</Accordion.Item>
		{/if}
		{#if serviceTypeSettings.needsenvironmentvariables}
			<Accordion.Item class="px-2" value="environment_variables">
				<Accordion.Trigger class="hover:underline-none text-lg font-semibold"
					>Environment Variables
					<p slot="description" class="mt-1 text-start text-sm leading-6 text-neutral-500">
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
		{/if}
		<Accordion.Item class="px-2" value="instance_type">
			<Accordion.Trigger class="hover:underline-none text-lg font-semibold"
				>Instance Type
				<p slot="description" class="text-start text-sm leading-6 text-neutral-500">
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
											for={type.id}
											class="border-muted bg-popover hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:bg-accent [&:has([data-state=checked])]:border-primary flex flex-col gap-1 rounded-lg border-2 p-4 transition-colors"
										>
											<Form.RadioItem
												on:click={(e) => {
													if (!type.available_plans.includes(user?.current_plan ?? '')) {
														e.preventDefault();
														toast.warning(UpgradeAccount, {
															componentProps: {
																title: 'Upgrade account required.',
																message: `To use this instance you need to upgrade your account to <strong>${type.available_plans[0]}</strong> or a higher plan.`
															}
														});
													}
												}}
												value={type.id}
												id={type.id}
												class="sr-only"
												aria-label={type.id}
											/>

											<p class="text-xl font-bold text-black dark:text-white">
												{type.name}
											</p>
											<span class="text-neutral-700 dark:text-neutral-400">
												{type.ram}MB (RAM)
												<span aria-hidden="true">&middot;</span>{' '}{type.cpu} vCPUs
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
		<Button size="sm" variant="secondary">
			<ListBullets />
			Summary
		</Button>
		<div class="flex items-center gap-2">
			<Button href="/services/create" variant="destructive" size="sm" class="w-full sm:w-auto">
				<CaretLeft />
				Cancel
			</Button>
			<Form.Button disabled={$submitting || loading.repository} size="sm" class="w-full sm:w-auto">
				{#if isRepoLoaded || serviceTypeSettings.isdatabase}
					{#if $submitting}
						<CircleNotch class="animate-spin" />
					{:else}
						<Plus />
					{/if}
					Create
				{:else}
					{#if loading.repository}
						<CircleNotch class="animate-spin" />
					{:else}
						<ArrowClockwise />
					{/if}
					Load repository
				{/if}
			</Form.Button>
		</div>
	</NewFloatingBar>
	<IntersectionObserver {element} bind:intersecting threshold={0.5}>
		<div
			bind:this={element}
			id="buttons-nav"
			class="flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:justify-between"
		>
			<Button size="sm" variant="secondary">
				<ListBullets />
				Summary
			</Button>
			<div class="flex items-center gap-2">
				<Button href="/services/create" variant="destructive" size="sm" class="w-full sm:w-auto">
					<CaretLeft />
					Cancel
				</Button>
				<Form.Button
					disabled={$submitting || loading.repository}
					size="sm"
					class="w-full sm:w-auto"
				>
					{#if isRepoLoaded || serviceTypeSettings.isdatabase}
						{#if $submitting}
							<CircleNotch class="animate-spin" />
						{:else}
							<Plus />
						{/if}
						Create
					{:else}
						{#if loading.repository}
							<CircleNotch class="animate-spin" />
						{:else}
							<ArrowClockwise />
						{/if}
						Load repository
					{/if}
				</Form.Button>
			</div>
		</div>
	</IntersectionObserver>
</Form.Root>
