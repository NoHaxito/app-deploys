<script lang="ts">
	import {
		Books,
		Cardholder,
		Command,
		GearSix,
		Lifebuoy,
		SignOut,
		User,
		UserGear
	} from 'phosphor-svelte';
	import { flyAndScale } from '../utils';
	import * as Avatar from './ui/avatar';
	import * as DropdownMenu from './ui/dropdown-menu';
	import type { Session } from 'lucia';

	let open: boolean;
	import { Button } from './ui/button';
	import { commandMenu } from '../store';
	import { enhance } from '$app/forms';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	export let user: Session | null;
</script>

<DropdownMenu.Root bind:open>
	<DropdownMenu.Trigger class="size-8 rounded-full">
		<Avatar.Root class="size-8">
			<Avatar.Image src={user?.avatar_url} alt="@huntabyte" class="aspect-square h-full w-full" />
			<Avatar.Fallback
				class="bg-muted flex h-full w-full items-center justify-center rounded-full text-xs"
				>{user?.username.slice(0, 2).toUpperCase()}</Avatar.Fallback
			>
		</Avatar.Root>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-[12rem] rounded-xl" transition={flyAndScale} align="end">
		<DropdownMenu.Item>
			<User weight="fill" class="text-foreground-alt" />
			Profile
		</DropdownMenu.Item>
		<DropdownMenu.Item>
			<Cardholder weight="fill" class="text-foreground-alt" />
			Billing
		</DropdownMenu.Item>
		<DropdownMenu.Item>
			<GearSix weight="fill" class="text-foreground-alt" />
			Settings
		</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item
			on:click={() => {
				$commandMenu = true;
				open = false;
			}}
		>
			<Command class="text-foreground-alt" />
			Command Menu
			<DropdownMenu.Shortcut><Command />K</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
		<DropdownMenu.Item>
			<Books weight="fill" class="text-foreground-alt" />
			Docs
		</DropdownMenu.Item>
		<DropdownMenu.Item>
			<Lifebuoy weight="fill" class="text-foreground-alt" />
			Support
		</DropdownMenu.Item>
		<DropdownMenu.Separator />
		{#if user?.role === 'admin'}
			<DropdownMenu.Item>
				<UserGear weight="fill" class="text-foreground-alt" />
				Admin
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
		{/if}
		<DropdownMenu.Item on:click={() => goto('/auth/logout')}>
			<SignOut weight="fill" class="text-foreground-alt" />
			Logout
		</DropdownMenu.Item>
		<!-- <form action="/?logout" method="post" use:enhance>
			<Button class="h-max w-full justify-start px-2 py-1.5" variant="ghost" type="submit">
				<SignOut weight="fill" class="text-foreground-alt" />
				Logout
			</Button>
		</form> -->
	</DropdownMenu.Content>
</DropdownMenu.Root>
