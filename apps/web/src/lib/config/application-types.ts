import { Cards, HardDrives } from 'phosphor-svelte';
import Nodejs from '$components/icons/nodejs.svelte';
import Docker from '$components/icons/docker.svelte';
import Wordpress from '$components/icons/wordpress.svelte';

export const applicationTypes = [
	{
		value: 'database',
		label: 'Database',
		icon: HardDrives
	},
	{
		value: 'nodejs',
		label: 'Node.js',
		icon: Nodejs
	},
	{
		value: 'dockerfile',
		label: 'Dockerfile',
		icon: Docker
	},
	{
		value: 'wordpress',
		label: 'Wordpress',
		icon: Wordpress
	},
	{
		value: 'nginx',
		label: 'Nginx',
		icon: Cards
	}
];
