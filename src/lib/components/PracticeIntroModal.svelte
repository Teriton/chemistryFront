<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import {
		closePracticeModal,
		practiceModalOpen
	} from '$lib/practice/practice-modal-store.js';
	import {
		difficultyLabels,
		practiceCategoryLabels
	} from '$lib/practice/practice-types.js';
	import type { PracticeCategory, Difficulty } from '$lib/practice/practice-types.js';

	let category = $state<PracticeCategory>('equations');
	let difficulty = $state<Difficulty>('easy');

	const introMarkdown = `
**Практический модуль** помогает закрепить навыки по неорганической химии: уравнения, расчёты, цепочки, ОВР и классы веществ.

Выберите **тип задания** и **уровень сложности**, затем нажмите **«Начать»** — откроется страница с задачами. После проверки верные ответы подсвечиваются; за каждое полностью верное задание начисляется **50 очков опыта** в профиль (при входе в аккаунт).`;

	function backdropClose(e: MouseEvent) {
		if (e.target === e.currentTarget) closePracticeModal();
	}

	function startTasks() {
		closePracticeModal();
		const q = new URLSearchParams({ category, difficulty });
		goto(`${resolve('/practice')}?${q.toString()}`);
	}
</script>

{#if $practiceModalOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-[90] flex items-center justify-center bg-slate-900/45 px-3 py-6 backdrop-blur-sm"
		role="dialog"
		tabindex="-1"
		aria-modal="true"
		aria-label="Выбор параметров практики"
		onclick={backdropClose}
	>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="max-h-[92vh] w-full overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-2xl md:max-w-lg"
			onclick={(e) => e.stopPropagation()}
			role="presentation"
		>
			<div
				class="flex items-start justify-between gap-3 border-b border-emerald-100 bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-4 text-white"
			>
				<h2 class="text-xl font-bold md:text-2xl">Практика</h2>
				<button
					type="button"
					class="rounded-xl bg-white/15 px-3 py-1.5 text-sm font-semibold hover:bg-white/25"
					onclick={closePracticeModal}
				>
					Закрыть
				</button>
			</div>

			<div class="max-h-[78vh] space-y-4 overflow-y-auto px-5 py-5">
				<div
					class="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-sm leading-relaxed text-slate-800"
				>
					<SvelteMarkdown source={introMarkdown} />
				</div>
				<div class="grid gap-4 md:grid-cols-2">
					<div class="flex flex-col gap-1">
						<label for="pm-category" class="text-sm font-semibold text-slate-700">Тип задания</label>
						<select
							id="pm-category"
							bind:value={category}
							class="rounded-xl border border-emerald-200 bg-white px-3 py-2.5 outline-none ring-teal-300 focus:ring-2"
						>
							{#each Object.entries(practiceCategoryLabels) as [k, v] (k)}
								<option value={k}>{v}</option>
							{/each}
						</select>
					</div>
					<div class="flex flex-col gap-1">
						<label for="pm-difficulty" class="text-sm font-semibold text-slate-700"
							>Уровень сложности</label
						>
						<select
							id="pm-difficulty"
							bind:value={difficulty}
							class="rounded-xl border border-emerald-200 bg-white px-3 py-2.5 outline-none ring-teal-300 focus:ring-2"
						>
							{#each Object.entries(difficultyLabels) as [k, v] (k)}
								<option value={k}>{v}</option>
							{/each}
						</select>
					</div>
				</div>
				<button
					type="button"
					class="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3 text-center font-semibold text-white hover:from-emerald-700 hover:to-teal-700"
					onclick={startTasks}
				>
					Начать
				</button>
			</div>
		</div>
	</div>
{/if}

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape' && $practiceModalOpen) closePracticeModal();
	}}
/>
