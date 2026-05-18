import { writable } from 'svelte/store';

/** true — открыть модуль «Задачи». */
export const practiceModalOpen = writable(false);

export function openPracticeModal() {
	practiceModalOpen.set(true);
}

export function closePracticeModal() {
	practiceModalOpen.set(false);
}
