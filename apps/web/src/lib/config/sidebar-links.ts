import { Cards, GridFour } from 'phosphor-svelte';

export const sidebarLinks = [
	{
		icon: GridFour,
		title: 'Dashboard',
		href: '/',
		disabled: false
	},
	{
		icon: Cards,
		title: 'Projects',
		href: '/projects',
		disabled: false
	}
];
