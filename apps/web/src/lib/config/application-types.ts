import Nodejs from '$components/icons/nodejs.svelte';
import Mysql from '../components/icons/mysql.svelte';
import Postgresql from '../components/icons/postgresql.svelte';

export const applicationTypes = [
	{
		value: 'mysql',
		label: 'MySQL',
		icon: Mysql
	},
	{
		value: 'postgresql',
		label: 'PostgreSQL',
		icon: Postgresql
	},
	{
		value: 'nodejs',
		label: 'Node.js',
		icon: Nodejs
	}
];
