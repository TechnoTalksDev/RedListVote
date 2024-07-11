import { persisted } from 'svelte-persisted-store';

export const votedStore = persisted('voted', {
	yes: false,
	time: -1
});
