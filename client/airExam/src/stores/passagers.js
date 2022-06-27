import {writable} from "svelte/store"

export const passagers = writable([]);
export const tickets = writable(new Map)