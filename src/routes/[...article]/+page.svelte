<script lang="ts">
	import SvelteMarkdown, { type RendererComponent, type Renderers } from '@humanspeak/svelte-markdown';
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { resolve } from '$app/paths';
	import markedKatex from 'marked-katex-extension';
	import { QuesitonAPICalls, QuestionManager } from '$lib/questions-manager.js';
	import { completedLessons } from '$lib/completed-lessons.js';
	import KatexRenderer from '$lib/KatexRenderer.svelte';
	import Equation from '$lib/components/equation.svelte';
	import ChemElem from '$lib/components/ChemElem.svelte';
	import ChemElems from '$lib/components/ChemElems.svelte';
	import { lessonNeighbors } from '$lib/article-nav';

	let { data } = $props();

	const lessonNav = $derived(
		lessonNeighbors(data.articlesTree, page.url.pathname, page.params.article)
	);
	const articleSource = $derived((data.rawData ?? '') as string);
	let questionMngr: QuestionManager | undefined = $state();
	type QuizQuestion = { question: string; options: string[]; correctAnswers: string[] };
	let quizQuestions: QuizQuestion[] = $state([]);
	let selectedAnswers: Record<string, string> = $state({});
	let checked = $state(false);
	let score = $state(0);
	let submitMessage = $state('');
	let equationsCount = $state(0);
	const totalQuestions = $derived(quizQuestions.length + equationsCount);

	$effect(() => {
		const title = data.title;
		const backURL = data.backURL;
		if (!browser) return;
		questionMngr = new QuestionManager(new QuesitonAPICalls(backURL), title);
		quizQuestions = [];
		selectedAnswers = {};
		checked = false;
		score = 0;
		submitMessage = '';
		equationsCount = 0;
	});

	interface KatexRenderers extends Renderers {
		inlineKatex: RendererComponent;
		blockKatex: RendererComponent;
	}

	const renderers: Partial<KatexRenderers> = {
		inlineKatex: KatexRenderer,
		blockKatex: KatexRenderer
	};

	function registerQuestion(question: string, answers: string): string {
		if (!question.trim() || !answers.trim()) {
			return '';
		}
		const options = answers.split('|').map((option) => option.replace('!', '').trim());
		const correctAnswers = answers
			.split('|')
			.filter((option) => option.startsWith('!'))
			.map((option) => option.replace('!', '').trim());
		if (!quizQuestions.some((q) => q.question === question)) {
			quizQuestions = [...quizQuestions, { question, options, correctAnswers }];
			questionMngr?.addQuestion(question, answers);
		}
		return '';
	}

	async function checkQuiz() {
		checked = true;
		score = 0;
		if (!questionMngr) return;

		const results = questionMngr.buildResults(selectedAnswers);
		for (const result of results) {
			if (result.isCorrect) score += 1;
		}

		const response = await questionMngr.submitQuestionResults(results);
		if (response?.status === 'already_submitted') {
			submitMessage = 'Урок уже был пройден ранее. Баллы повторно не начисляются.';
		} else {
			submitMessage = 'Ответы сохранены. Прогресс урока обновлен.';
		}

		completedLessons.update((titles) => {
			if (titles.includes(data.title)) return titles;
			return [...titles, data.title];
		});
	}

	function registerEquationQuestion() {
		equationsCount += 1;
	}
</script>

<div class="markdown-content">
	{#key data.title}
		<SvelteMarkdown
			source={articleSource}
			{renderers}
			extensions={[markedKatex({ throwOnError: false })]}
		>
		{#snippet html_formula({ attributes })}
			<Equation
				f={attributes?.f ? (attributes?.f as string) : ''}
				answers={attributes?.answers ? (attributes?.answers as string) : ''}
				{renderers}
				{questionMngr}
				onRegister={registerEquationQuestion}
			>
			</Equation>
		{/snippet}

		{#snippet html_question({ attributes })}
			{@const q = attributes?.question ? (attributes?.question as string) : ''}
			{@const a = attributes?.answers ? (attributes?.answers as string) : ''}
			{@html registerQuestion(q, a)}
		{/snippet}

		{#snippet html_element({ attributes })}
			<div class="flex w-full justify-center py-5">
				<ChemElem elemNumber={attributes?.number ? (attributes?.number as number) : 1}></ChemElem>
			</div>
		{/snippet}
		{#snippet html_elements({ attributes })}
			<div class="flex w-full justify-center py-5">
				<ChemElems elemNumbers={attributes?.numbers ? (attributes?.numbers as string) : ''}></ChemElems>
			</div>
		{/snippet}
		</SvelteMarkdown>
	{/key}

	{#if totalQuestions > 0}
		<section class="mt-8 rounded-xl border border-teal-200 bg-teal-50 p-5">
			<h2 class="text-2xl font-bold">Тест по статье</h2>
			<p class="mt-1 text-sm text-gray-600">Выберите по одному варианту и нажмите кнопку проверки.</p>
			<div class="mt-4 space-y-5">
				{#each quizQuestions as q, index (q.question)}
					<div class="rounded-lg bg-white p-4 shadow-sm">
						<p class="font-semibold">{index + 1}. {q.question}</p>
						<div class="mt-3 grid gap-2">
							{#each q.options as option (option)}
								<label
									class="rounded-md border p-3 transition-colors
									{checked
										? q.correctAnswers.includes(option)
											? 'border-green-400 bg-green-100'
											: selectedAnswers[q.question] === option
												? 'border-red-400 bg-red-100'
												: 'border-gray-200 bg-white'
										: selectedAnswers[q.question] === option
											? 'border-teal-400 bg-teal-100'
											: 'border-gray-200 bg-white'}"
								>
									<input type="radio" name={q.question} value={option} bind:group={selectedAnswers[q.question]} />
									<span class="ml-2">{option}</span>
								</label>
							{/each}
						</div>
					</div>
				{/each}
			</div>
			<button onclick={checkQuiz} class="mt-5 rounded-lg bg-emerald-600 px-5 py-2 font-semibold text-white hover:bg-emerald-700">
				Проверить
			</button>
			{#if checked}
				<p class="mt-3 text-lg font-semibold">Результат: {score} из {totalQuestions}</p>
				<p class="mt-2 text-sm text-teal-700">{submitMessage}</p>
			{/if}
		</section>
	{/if}
</div>

{#if lessonNav.prev || lessonNav.next}
	<div
		class="pointer-events-none fixed bottom-0 left-24 right-0 z-20 flex items-end justify-between gap-4 px-4 pb-6 md:px-8"
	>
		<div class="pointer-events-auto min-w-0 shrink-0">
			{#if lessonNav.prev}
				<a
					href={resolve(lessonNav.prev as `/${string}`)}
					class="inline-flex items-center rounded-full border border-teal-200 bg-white/95 px-4 py-2.5 text-sm font-semibold text-teal-800 shadow-md backdrop-blur transition hover:border-teal-400 hover:bg-teal-50"
				>
					← Назад
				</a>
			{/if}
		</div>
		<div class="pointer-events-auto min-w-0 shrink-0 text-right">
			{#if lessonNav.next}
				<a
					href={resolve(lessonNav.next as `/${string}`)}
					class="inline-flex items-center rounded-full border border-teal-200 bg-white/95 px-4 py-2.5 text-sm font-semibold text-teal-800 shadow-md backdrop-blur transition hover:border-teal-400 hover:bg-teal-50"
				>
					Далее →
				</a>
			{/if}
		</div>
	</div>
{/if}
