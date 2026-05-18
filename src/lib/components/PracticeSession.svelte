<script lang="ts">
	import SvelteMarkdown, { type RendererComponent, type Renderers } from '@humanspeak/svelte-markdown';
	import markedKatex from 'marked-katex-extension';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import KatexRenderer from '$lib/KatexRenderer.svelte';
	import PracticeEquationInput from '$lib/components/PracticeEquationInput.svelte';
	import LatexDollarString from '$lib/components/LatexDollarString.svelte';
	import {
		compoundClassOptions,
		pickPracticeTasks,
		allPracticeItems,
		TASKS_PER_ROUND
	} from '$lib/practice/practice-catalog.js';
	import { openPracticeModal } from '$lib/practice/practice-modal-store.js';
	import { submitPracticeXpToServer } from '$lib/practice/practice-xp.js';
	import type {
		ChainPracticeItem,
		ClassPracticeItem,
		EquationPracticeItem,
		CalculationPracticeItem,
		PracticeCategory,
		Difficulty,
		PracticeItem,
		RedoxPracticeItem
	} from '$lib/practice/practice-types.js';
	import { normalizeFormula, oxidationMatches } from '$lib/practice/practice-normalize.js';
	import {
		difficultyLabels,
		practiceCategoryLabels
	} from '$lib/practice/practice-types.js';

	let { category, difficulty } = $props<{
		category: PracticeCategory;
		difficulty: Difficulty;
	}>();

	let activeTasks = $state<PracticeItem[]>([]);
	let checked = $state(false);
	let earnedPoints = $state(0);
	let calcExplainShown = $state<Record<string, boolean>>({});

	let equationSlots = $state<Record<string, string[]>>({});
	let calcAnswers = $state<Record<string, string>>({});
	let chainAnswers = $state<Record<string, string[]>>({});
	let redoxOx = $state<Record<string, Record<string, string>>>({});
	let redoxAgents = $state<Record<string, { oxidizer: string; reducer: string; coeffs: string }>>(
		{}
	);
	let classChoice = $state<Record<string, string>>({});

	interface Checks {
		equations?: Record<string, boolean>;
		calcs?: Record<string, boolean>;
		chains?: Record<string, boolean[]>;
		redox?: Record<
			string,
			{ oxidationOk: Record<string, boolean>; agentsOk: boolean; coeffsOk: boolean }
		>;
		classes?: Record<string, boolean>;
	}

	let checks = $state<Checks>({});
	let practiceXpMessage = $state<string | null>(null);
	let xpAddedFromServer = $state(0);

	/** Чтобы $effect не вызывал applyPickedTasks повторно после «Проверить» и не сбрасывал подсветку. */
	let lastPracticeSessionKey = $state<string | null>(null);

	interface KatexRenderers extends Renderers {
		inlineKatex: RendererComponent;
		blockKatex: RendererComponent;
	}

	const mdRenderers: Partial<KatexRenderers> = {
		inlineKatex: KatexRenderer,
		blockKatex: KatexRenderer
	};

	function applyPickedTasks() {
		activeTasks = pickPracticeTasks(category, difficulty);
		if (activeTasks.length === 0) {
			activeTasks = allPracticeItems.filter((t) => t.type === category).slice(0, TASKS_PER_ROUND);
		}

		equationSlots = {};
		chainAnswers = {};
		for (const t of activeTasks) {
			if (t.type === 'equations') {
				const slots = Math.max(
					1,
					t.answers.split(',').filter((s) => s.trim() !== '').length
				);
				equationSlots[t.id] = Array.from({ length: slots }, () => '');
			}
			if (t.type === 'chains') {
				const n = t.expectedBlanks.length;
				chainAnswers[t.id] = Array.from({ length: n }, () => '');
			}
			if (t.type === 'redox') {
				const ox: Record<string, string> = {};
				for (const o of t.oxidationInputs) ox[o.id] = '';
				redoxOx[t.id] = ox;
				redoxAgents[t.id] = { oxidizer: '', reducer: '', coeffs: '' };
			}
		}
		calcAnswers = {};
		classChoice = {};
		checked = false;
		checks = {};
		earnedPoints = 0;
		practiceXpMessage = null;
		xpAddedFromServer = 0;
		calcExplainShown = {};
	}

	$effect(() => {
		const key = `${category}:${difficulty}`;
		if (lastPracticeSessionKey === key) return;
		lastPracticeSessionKey = key;
		applyPickedTasks();
	});

	function goToPicker() {
		goto(resolve('/practice'));
		openPracticeModal();
	}

	function redoxOxidizerMatches(t: RedoxPracticeItem, a: { oxidizer: string; reducer: string; coeffs: string }) {
		return (
			normalizeFormula(a.oxidizer).toLowerCase() === normalizeFormula(t.oxidizer).toLowerCase()
		);
	}

	function redoxReducerMatches(t: RedoxPracticeItem, a: { oxidizer: string; reducer: string; coeffs: string }) {
		return (
			normalizeFormula(a.reducer).toLowerCase() === normalizeFormula(t.reducer).toLowerCase()
		);
	}

	function redoxCoeffsMatch(t: RedoxPracticeItem, a: { oxidizer: string; reducer: string; coeffs: string }) {
		const expC = t.balanceCoeffs.split(',').map((s) => s.trim());
		const gotC = (a.coeffs ?? '')
			.split(',')
			.map((s) => s.trim())
			.filter(Boolean);
		return expC.length === gotC.length && expC.every((c, i) => c === gotC[i]);
	}

	function checkEquationTask(t: EquationPracticeItem, slots: string[] | undefined): boolean {
		if (!slots) return false;
		const expected = t.answers
			.split(',')
			.map((s) => s.trim())
			.filter(Boolean);
		if (expected.length !== slots.length) return false;
		return expected.every((ex, i) => String(slots[i] ?? '').trim() === ex);
	}

	function checkCalcTask(t: CalculationPracticeItem, raw: string | undefined): boolean {
		const v = Number.parseFloat((raw ?? '').replace(',', '.'));
		if (Number.isNaN(v)) return false;
		const tol = t.tolerance ?? 0.01;
		return Math.abs(v - t.answer) <= tol;
	}

	function checkChainTask(t: ChainPracticeItem, blanks: string[] | undefined): boolean[] {
		const user = (blanks ?? []).map(normalizeFormula);
		const ok = t.expectedBlanks.map(
			(ex, i) => normalizeFormula(ex) === (user[i] ?? '')
		);
		return ok;
	}

	function checkRedoxTask(
		t: RedoxPracticeItem,
		ox: Record<string, string> | undefined,
		agents: { oxidizer: string; reducer: string; coeffs: string } | undefined
	): {
		oxidationOk: Record<string, boolean>;
		agentsOk: boolean;
		coeffsOk: boolean;
	} {
		const oxidationOk: Record<string, boolean> = {};
		for (const o of t.oxidationInputs) {
			const u = ox?.[o.id] ?? '';
			oxidationOk[o.id] = oxidationMatches(u, o.accepted);
		}
		const agentsOk =
			normalizeFormula(agents?.oxidizer ?? '').toLowerCase() ===
				normalizeFormula(t.oxidizer).toLowerCase() &&
			normalizeFormula(agents?.reducer ?? '').toLowerCase() ===
				normalizeFormula(t.reducer).toLowerCase();
		const expC = t.balanceCoeffs.split(',').map((s) => s.trim());
		const gotC = (agents?.coeffs ?? '')
			.split(',')
			.map((s) => s.trim())
			.filter(Boolean);
		const coeffsOk =
			expC.length === gotC.length && expC.every((c, i) => c === gotC[i]);
		return {
			oxidationOk,
			agentsOk,
			coeffsOk
		};
	}

	function checkClassTask(t: ClassPracticeItem, picked: string | undefined): boolean {
		return (picked ?? '') === t.correctValue;
	}

	async function evaluateAll(): Promise<void> {
		checked = true;
		let correctTasks = 0;
		const next: Checks = {
			equations: {},
			calcs: {},
			chains: {},
			redox: {},
			classes: {}
		};

		for (const task of activeTasks) {
			if (task.type === 'equations') {
				const ok = checkEquationTask(task, equationSlots[task.id]);
				next.equations![task.id] = ok;
				if (ok) correctTasks += 1;
			} else if (task.type === 'calculations') {
				const ok = checkCalcTask(task, calcAnswers[task.id]);
				next.calcs![task.id] = ok;
				if (ok) correctTasks += 1;
			} else if (task.type === 'chains') {
				const parts = checkChainTask(task, chainAnswers[task.id]);
				next.chains![task.id] = parts;
				if (parts.every(Boolean)) correctTasks += 1;
			} else if (task.type === 'redox') {
				const r = checkRedoxTask(task, redoxOx[task.id], redoxAgents[task.id]);
				next.redox![task.id] = r;
				const oxAll = Object.values(r.oxidationOk).every(Boolean);
				if (oxAll && r.agentsOk && r.coeffsOk) correctTasks += 1;
			} else {
				const ok = checkClassTask(task, classChoice[task.id]);
				next.classes![task.id] = ok;
				if (ok) correctTasks += 1;
			}
		}
		checks = next;
		earnedPoints = correctTasks * 50;

		practiceXpMessage = null;
		xpAddedFromServer = 0;
		if (correctTasks > 0) {
			const res = await submitPracticeXpToServer(correctTasks);
			if (res.ok) {
				xpAddedFromServer = res.xpAdded;
				practiceXpMessage = `Начислено ${res.xpAdded} очков опыта в профиль.`;
			} else {
				practiceXpMessage =
					'Не удалось начислить опыт. Убедитесь, что вы вошли в аккаунт, и попробуйте снова.';
			}
		} else {
			practiceXpMessage = 'Полностью верных заданий нет — опыт не начислен.';
		}
	}
</script>

<div class="mx-auto w-full max-w-3xl pb-16">
	<div
		class="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-4 text-white shadow-sm"
	>
		<div>
			<h1 class="text-2xl font-bold">Практический модуль</h1>
			<p class="mt-1 text-sm text-emerald-100">
				{practiceCategoryLabels[category]}
				<span class="text-emerald-200/80">·</span>
				{difficultyLabels[difficulty]}
			</p>
		</div>
		<button
			type="button"
			class="rounded-xl bg-white/15 px-4 py-2 text-sm font-semibold hover:bg-white/25"
			onclick={goToPicker}
		>
			Параметры
		</button>
	</div>

	<div class="space-y-4">
		{#each activeTasks as task, idx (task.id)}
			<article class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
				<h3 class="text-base font-bold text-emerald-900">
					{idx + 1}. {task.title}
				</h3>

				{#if task.type === 'equations'}
					{#if task.promptMd}
						<div class="mt-2 text-sm leading-relaxed text-slate-700">
							<SvelteMarkdown
								source={task.promptMd}
								renderers={mdRenderers}
								extensions={[markedKatex({ throwOnError: false })]}
							/>
						</div>
					{/if}
					<div class="mt-3">
						<PracticeEquationInput
							formulaF={task.formulaF}
							answers={task.answers}
							bind:values={equationSlots[task.id]}
							checked={checked}
							correct={checks.equations?.[task.id]}
						/>
					</div>

				{:else if task.type === 'calculations'}
					<div class="mt-2 space-y-2 text-sm leading-relaxed text-slate-700">
						<SvelteMarkdown
							source={task.promptMd}
							renderers={mdRenderers}
							extensions={[markedKatex({ throwOnError: false })]}
						/>
					</div>
					<div class="mt-3 flex flex-wrap items-end gap-2">
						<div class="flex flex-col gap-1">
							<span class="text-xs font-medium text-slate-500">Ваш ответ</span>
							<input
								type="text"
								disabled={checked}
								placeholder={`Ответ, ${task.unit}`}
								class="w-full max-w-[14rem] rounded-xl border px-3 py-2 font-mono outline-none md:w-auto"
								class:border-emerald-600={checked && checks.calcs?.[task.id]}
								class:bg-emerald-50={checked && checks.calcs?.[task.id]}
								class:text-emerald-900={checked && checks.calcs?.[task.id]}
								class:border-red-600={checked && checks.calcs?.[task.id] === false}
								class:bg-red-50={checked && checks.calcs?.[task.id] === false}
								class:text-red-900={checked && checks.calcs?.[task.id] === false}
								class:border-slate-300={!checked}
								class:text-slate-900={!checked}
								bind:value={calcAnswers[task.id]}
							/>
						</div>
						<span class="pb-2 text-sm text-slate-500">{task.unit}</span>
					</div>
					{#if checked && checks.calcs?.[task.id]}
						<p class="mt-2 text-sm font-semibold text-emerald-700">Ответ верный.</p>
					{:else if checked && checks.calcs?.[task.id] === false}
						<p class="mt-2 text-sm font-medium text-red-800">
							Неверно. Правильный ответ:
							<span class="font-mono font-bold text-emerald-800">{task.answer}</span>
							{task.unit}
						</p>
					{/if}
					{#if checked}
						<button
							type="button"
							class="mt-2 text-sm font-semibold text-teal-700 hover:underline"
							onclick={() =>
								(calcExplainShown = {
									...calcExplainShown,
									[task.id]: !calcExplainShown[task.id]
								})}
						>
							{calcExplainShown[task.id]
								? 'Скрыть объяснение'
								: 'Посмотреть подробное объяснение'}
						</button>
						{#if calcExplainShown[task.id]}
							<div
								class="mt-2 rounded-xl border border-teal-100 bg-teal-50/80 p-3 text-sm text-slate-800"
							>
								<SvelteMarkdown
									source={task.explanationMd}
									renderers={mdRenderers}
									extensions={[markedKatex({ throwOnError: false })]}
								/>
							</div>
						{/if}
					{/if}

				{:else if task.type === 'chains'}
					{#if task.promptMd}
						<div class="mt-2 text-sm text-slate-700">
							<SvelteMarkdown
								source={task.promptMd}
								renderers={mdRenderers}
								extensions={[markedKatex({ throwOnError: false })]}
							/>
						</div>
					{/if}
					<div class="mt-2 rounded-xl bg-slate-50 p-3 text-sm">
						<LatexDollarString source={task.chainMd} />
					</div>
					<p class="mt-3 text-sm font-semibold text-slate-800">
						Заполните вещества в пропусках:
					</p>
					<div class="mt-2 space-y-2">
						{#each task.steps as stepRow, si}
							<div
								class="flex flex-wrap items-center gap-1 rounded-xl border border-slate-200 bg-white px-2 py-2 font-mono text-sm"
							>
								{#each stepRow.parts as part, pi}
									{#if part.kind === 'text'}
										<span>{part.value}</span>
										<span class="text-slate-500">{part.after ?? ''}</span>
									{:else}
										{@const blankIdx =
											task.steps
												.slice(0, si)
												.reduce(
													(acc, r) =>
														acc + r.parts.filter((p) => p.kind === 'blank').length,
													0
												) +
											stepRow.parts.slice(0, pi).filter((p) => p.kind === 'blank').length}
										{@const chainOk = checked ? checks.chains?.[task.id]?.[blankIdx] : undefined}
										<div class="flex flex-col items-center gap-0.5">
											<input
												type="text"
												disabled={checked}
												class="min-w-[5.5rem] rounded border px-2 py-1 font-mono text-sm ring-2 ring-offset-1"
												class:border-emerald-600={chainOk === true}
												class:ring-emerald-400={chainOk === true}
												class:text-emerald-900={chainOk === true}
												class:border-red-600={chainOk === false}
												class:ring-red-400={chainOk === false}
												class:text-red-900={chainOk === false}
												class:border-slate-300={chainOk === undefined}
												class:ring-transparent={chainOk === undefined}
												bind:value={chainAnswers[task.id][blankIdx]}
											/>
											{#if checked && chainOk === false}
												<span class="text-center text-xs font-semibold text-emerald-800">
													верно: {task.expectedBlanks[blankIdx]}
												</span>
											{/if}
										</div>
										<span class="text-slate-500">{part.after ?? ''}</span>
									{/if}
								{/each}
							</div>
						{/each}
					</div>
					{#if checked && checks.chains?.[task.id] && !checks.chains[task.id].every(Boolean)}
						<p class="mt-3 text-sm font-medium text-slate-700">
							Все ожидаемые вещества в пропусках:
							<span class="font-mono font-bold text-emerald-900">{task.expectedBlanks.join(', ')}</span>
						</p>
					{/if}

	{:else if task.type === 'redox'}
	<div class="mt-2 text-sm text-slate-700">
		<SvelteMarkdown
			source={task.promptMd}
			renderers={mdRenderers}
			extensions={[markedKatex({ throwOnError: false })]}
		/>
	</div>

	{#if task.reactionMd}
		<div class="mt-2 rounded-xl bg-slate-50 p-3">
			<LatexDollarString source={task.reactionMd} />
		</div>
	{/if}

	<p class="mt-3 text-sm font-semibold text-slate-800">
		Степени окисления
	</p>

	<div class="mt-2 grid gap-2 sm:grid-cols-2">
		{#each task.oxidationInputs as inp}
			{@const oxPartOk = checked ? checks.redox?.[task.id]?.oxidationOk[inp.id] : undefined}

			<label class="flex flex-col gap-1 text-xs text-slate-600">
				<span
					class:font-semibold={checked}
					class:text-emerald-800={oxPartOk === true}
					class:text-red-800={oxPartOk === false}
				>
					{inp.label}
				</span>

				<input
					type="text"
					disabled={checked}
					class="rounded-lg border px-2 py-1.5 text-sm font-mono ring-2 ring-offset-1"
					class:border-emerald-600={oxPartOk === true}
					class:ring-emerald-400={oxPartOk === true}
					class:text-emerald-900={oxPartOk === true}
					class:border-red-600={oxPartOk === false}
					class:ring-red-400={oxPartOk === false}
					class:text-red-900={oxPartOk === false}
					class:border-slate-300={oxPartOk === undefined}
					class:ring-transparent={oxPartOk === undefined}
					bind:value={redoxOx[task.id][inp.id]}
				/>

				{#if checked && oxPartOk === false}
					<span class="text-xs font-semibold leading-tight text-emerald-900">
						верно (любой из вариантов): {inp.accepted.join(', ')}
					</span>
				{/if}
			</label>
		{/each}
	</div>

	<p class="mt-3 text-sm font-semibold text-slate-800">
		Окислитель и восстановитель (формула)
	</p>

	<div class="mt-2 grid gap-2 sm:grid-cols-3">
		{#if true}
			{@const ag = redoxAgents[task.id]}
			{@const oxM = checked ? redoxOxidizerMatches(task, ag) : undefined}
			{@const rdM = checked ? redoxReducerMatches(task, ag) : undefined}
			{@const cfM = checked ? redoxCoeffsMatch(task, ag) : undefined}

			<div class="flex flex-col gap-1">
				<input
					type="text"
					disabled={checked}
					placeholder="Окислитель"
					class="rounded-lg border px-2 py-1.5 text-sm font-mono ring-2 ring-offset-1"
					class:border-emerald-600={oxM === true}
					class:ring-emerald-400={oxM === true}
					class:text-emerald-900={oxM === true}
					class:border-red-600={oxM === false}
					class:ring-red-400={oxM === false}
					class:text-red-900={oxM === false}
					class:border-slate-300={oxM === undefined}
					class:ring-transparent={oxM === undefined}
					bind:value={redoxAgents[task.id].oxidizer}
				/>

				{#if checked && oxM === false}
					<span class="text-xs font-semibold text-emerald-900">
						верно: {task.oxidizer}
					</span>
				{/if}
			</div>

			<div class="flex flex-col gap-1">
				<input
					type="text"
					disabled={checked}
					placeholder="Восстановитель"
					class="rounded-lg border px-2 py-1.5 text-sm font-mono ring-2 ring-offset-1"
					class:border-emerald-600={rdM === true}
					class:ring-emerald-400={rdM === true}
					class:text-emerald-900={rdM === true}
					class:border-red-600={rdM === false}
					class:ring-red-400={rdM === false}
					class:text-red-900={rdM === false}
					class:border-slate-300={rdM === undefined}
					class:ring-transparent={rdM === undefined}
					bind:value={redoxAgents[task.id].reducer}
				/>

				{#if checked && rdM === false}
					<span class="text-xs font-semibold text-emerald-900">
						верно: {task.reducer}
					</span>
				{/if}
			</div>

			<div class="flex flex-col gap-1 sm:col-span-1">
				<input
					type="text"
					disabled={checked}
					placeholder="Коэффициенты (через запятую)"
					class="rounded-lg border px-2 py-1.5 text-sm font-mono ring-2 ring-offset-1"
					class:border-emerald-600={cfM === true}
					class:ring-emerald-400={cfM === true}
					class:text-emerald-900={cfM === true}
					class:border-red-600={cfM === false}
					class:ring-red-400={cfM === false}
					class:text-red-900={cfM === false}
					class:border-slate-300={cfM === undefined}
					class:ring-transparent={cfM === undefined}
					bind:value={redoxAgents[task.id].coeffs}
				/>

				{#if checked && cfM === false}
					<span class="text-xs font-semibold text-emerald-900">
						верно: {task.balanceCoeffs}
					</span>
				{/if}
			</div>
		{/if}
	</div>

	{#if checked && task.explanationMd}
		<div class="mt-3 rounded-xl border border-teal-100 bg-teal-50/60 p-3 text-sm">
			<SvelteMarkdown
				source={task.explanationMd}
				renderers={mdRenderers}
				extensions={[markedKatex({ throwOnError: false })]}
			/>
		</div>
	{/if}
				{:else if task.type === 'classes'}
					<div class="mt-2 flex flex-wrap items-end gap-3">
						<div class="text-lg font-mono font-bold text-slate-900">{task.formula}</div>
						<select
							disabled={checked}
							class="min-w-[14rem] rounded-xl border px-3 py-2 text-sm font-medium ring-2 ring-offset-1"
							class:border-emerald-600={checked && checks.classes?.[task.id] === true}
							class:ring-emerald-400={checked && checks.classes?.[task.id] === true}
							class:text-emerald-900={checked && checks.classes?.[task.id] === true}
							class:border-red-600={checked && checks.classes?.[task.id] === false}
							class:ring-red-400={checked && checks.classes?.[task.id] === false}
							class:text-red-900={checked && checks.classes?.[task.id] === false}
							class:border-slate-300={!checked}
							class:ring-transparent={!checked}
							bind:value={classChoice[task.id]}
						>
							<option value="">Выберите класс</option>
							{#each compoundClassOptions as opt}
								<option value={opt.value}>{opt.label}</option>
							{/each}
						</select>
					</div>
					{#if task.promptMd}
						<p class="mt-2 text-sm text-slate-600">{task.promptMd}</p>
					{/if}
					{#if checked && checks.classes?.[task.id] === true}
						<p class="mt-2 text-sm font-semibold text-emerald-700">Выбран верный класс.</p>
					{:else if checked && checks.classes?.[task.id] === false}
						{@const corr = compoundClassOptions.find((o) => o.value === task.correctValue)}
						<p class="mt-2 text-sm font-medium text-red-800">
							Неверно. Правильный класс:
							<span class="font-semibold text-emerald-900">{corr?.label ?? task.correctValue}</span>
						</p>
					{/if}
				{/if}
			</article>
		{/each}

		<div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
			<div class="border-t border-slate-200 pt-0">
				<button
					type="button"
					class="w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
					disabled={activeTasks.length === 0 || checked}
					onclick={evaluateAll}
				>
					Проверить
				</button>
				{#if checked}
					<div class="mt-4 space-y-2 rounded-xl border border-slate-100 bg-slate-50/90 px-4 py-3 text-center">
						<p class="text-lg font-bold text-slate-800">
							Баллов за раунд: <span class="text-teal-700">{earnedPoints}</span>
						</p>
						{#if xpAddedFromServer > 0}
							<p class="text-base font-semibold text-emerald-700">
								Опыт в профиль: +{xpAddedFromServer}
							</p>
						{/if}
						{#if practiceXpMessage}
							<p class="text-sm text-slate-600">{practiceXpMessage}</p>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
