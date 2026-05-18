<script lang="ts">
	import LatexInline from '$lib/components/LatexInline.svelte';
	import { parseFormulaSegments } from '$lib/practice/practice-formula-parse.js';

	let {
		formulaF,
		answers,
		values = $bindable<string[]>([]),
		correct = undefined,
		checked = false
	}: {
		formulaF: string;
		answers: string;
		values?: string[];
		correct?: boolean;
		checked?: boolean;
	} = $props();

	const slotCount = $derived.by(() =>
		Math.max(1, answers.split(',').filter((x) => x.trim() !== '').length)
	);

	const expectedSlots = $derived(
		answers
			.split(',')
			.map((s) => s.trim())
			.filter(Boolean)
	);

	const segments = $derived(parseFormulaSegments(formulaF));

	function slotOk(index: number): boolean | null {
		if (!checked) return null;
		const exp = expectedSlots[index];
		if (exp === undefined) return null;
		return String(values[index] ?? '').trim() === exp;
	}

	$effect(() => {
		const n = slotCount;
		if (values.length !== n) {
			values = Array.from({ length: n }, (_, i) => values[i] ?? '');
		}
	});
</script>

<div
	class={[
		'practice-equation-input flex flex-col items-center gap-2 rounded-xl border p-4',
		checked && correct === true && 'border-emerald-500 bg-emerald-50/90',
		checked && correct === false && 'border-red-500 bg-red-50/60',
		!checked && 'border-slate-200'
	]}
>
	<div
		class="flex min-h-[3rem] w-full flex-wrap items-center justify-center gap-x-1 gap-y-3 overflow-x-auto text-center text-sm text-slate-700"
	>
		{#each segments as seg, si (si)}
			{#if seg.kind === 'latex'}
				<LatexInline latex={seg.latex} />
			{:else}
				{@const i = seg.index}
				{@const ok = slotOk(i)}
				<div class="flex flex-col items-center gap-0.5">
					<input
						class="mx-0.5 w-10 rounded border bg-white px-1 py-1 text-center font-mono text-sm shadow-inner ring-2 ring-offset-1 transition-colors disabled:opacity-95"
						class:border-emerald-600={ok === true}
						class:ring-emerald-400={ok === true}
						class:text-emerald-800={ok === true}
						class:border-red-600={ok === false}
						class:ring-red-400={ok === false}
						class:text-red-800={ok === false}
						class:border-teal-500={ok === null}
						class:ring-transparent={ok === null}
						class:text-slate-900={ok === null}
						type="text"
						inputmode="numeric"
						placeholder={String(seg.index)}
						bind:value={values[seg.index]}
						disabled={checked}
					/>
					{#if checked && ok === false && expectedSlots[i] !== undefined}
						<span class="max-w-[6rem] text-center text-xs font-semibold leading-tight text-emerald-800">
							верно: {expectedSlots[i]}
						</span>
					{/if}
				</div>
			{/if}
		{/each}
	</div>
	{#if checked && correct === false}
		<p class="text-center text-xs font-medium text-red-800">
			Полный ответ: <span class="font-mono font-semibold text-emerald-900">{answers}</span>
		</p>
	{/if}
</div>
