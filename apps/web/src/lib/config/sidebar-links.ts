import { CirclesFour, House } from 'phosphor-svelte';

export const sidebarLinks = [
	{
		icon: House,
		title: 'Dashboard',
		href: '/',
		disabled: false
	},
	{
		icon: CirclesFour,
		title: 'Applications',
		href: '/apps',
		disabled: false
	}
];
