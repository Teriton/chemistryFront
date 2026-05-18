<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import PracticeSession from '$lib/components/PracticeSession.svelte';
	import { openPracticeModal } from '$lib/practice/practice-modal-store.js';
	import type { Difficulty, PracticeCategory } from '$lib/practice/practice-types';

	const categories: PracticeCategory[] = [
		'equations',
		'calculations',
		'chains',
		'redox',
		'classes'
	];
	const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

	function parseSession(): { category: PracticeCategory; difficulty: Difficulty } | null {
		const c = page.url.searchParams.get('category');
		const d = page.url.searchParams.get('difficulty');
		if (
			c &&
			d &&
			categories.includes(c as PracticeCategory) &&
			difficulties.includes(d as Difficulty)
		) {
			return { category: c as PracticeCategory, difficulty: d as Difficulty };
		}
		return null;
	}

	let session = $derived(parseSession());

	afterNavigate(({ to }) => {
		if (to.url.pathname === '/practice' && !to.url.searchParams.get('category')) {
			queueMicrotask(() => openPracticeModal());
		}
	});
</script>

{#if session}
	<PracticeSession category={session.category} difficulty={session.difficulty} />
{:else}
	<div class="mx-auto flex max-w-lg flex-col items-center gap-4 py-16 text-center">
		<p class="text-lg font-semibold text-emerald-900">Практический модуль</p>
		<p class="text-sm text-gray-600">
			Выберите тип задания и сложность во всплывающем окне. Если окно не появилось, нажмите кнопку
			ниже.
		</p>
		<button
			type="button"
			class="rounded-xl bg-emerald-600 px-5 py-2.5 font-semibold text-white hover:bg-emerald-700"
			onclick={() => openPracticeModal()}
		>
			Выбрать параметры
		</button>
	</div>
{/if}
