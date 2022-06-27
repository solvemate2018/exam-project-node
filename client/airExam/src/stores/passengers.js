import { writable } from "svelte/store"

export const passengers = writable([]);
export const tickets = writable(new Map)