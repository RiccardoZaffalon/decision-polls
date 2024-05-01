import { writable, derived } from 'svelte/store';

export const step = writable(1);
export const type = writable(null);

export const choices = writable([]);
export const participants = writable([]);

export const option_filter = writable('');
export const person_filter = writable('');

export const configured = derived([choices, participants], ([$choices, $participants]) => {
    return $choices.length > 1 && $participants.length > 1;
});
