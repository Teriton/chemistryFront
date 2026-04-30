import { writable } from "svelte/store";

export const completedLessons = writable<string[]>([]);
