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
		title: 'Services',
		href: '/services',
		disabled: false
	}
];
