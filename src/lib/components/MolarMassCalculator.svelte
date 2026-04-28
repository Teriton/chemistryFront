<script lang="ts">
	import { elements } from '$lib/data/elements.js';
	import { SvelteMap } from 'svelte/reactivity';

	const elementMap = $derived.by(() => {
		const map = new SvelteMap<string, number>();
		for (const el of elements) map.set(el.symbol, el.mass);
		return map;
	});

	let formula = $state("");
	let result = $state<{ mass: number; breakdown: Record<string, number> } | null>(null);
	let error = $state<string | null>(null);

	function parseFormula(form: string): { mass: number; breakdown: Record<string, number> } | null {
		if (!form.trim()) return null;
		
		// Tokenize: elements, numbers, parentheses
		const tokens = form.match(/[A-Z][a-z]?|\d+|\(|\)/g);
		if (!tokens) return null;

		const stack: Array<Record<string, number>> = [{}];
		
		for (let i = 0; i < tokens.length; i++) {
			const token = tokens[i];
			
			if (token === '(') {
				stack.push({});
			} else if (token === ')') {
				const group = stack.pop();
				if (!group || stack.length === 0) return null;
				const num = parseInt(tokens[i + 1]);
				const mult = num ? num : 1;
				if (tokens[i + 1] && /^\d+$/.test(tokens[i + 1])) i++;
				for (const [el, cnt] of Object.entries(group)) {
					const top = stack[stack.length - 1];
					top[el] = (top[el] || 0) + cnt * mult;
				}
			} else if (/^[A-Z][a-z]?$/.test(token)) {

				const num = parseInt(tokens[i + 1]);
				const count = num ? num : 1;
				if (tokens[i + 1] && /^\d+$/.test(tokens[i + 1])) i++;
				const top = stack[stack.length - 1];
				top[token] = (top[token] || 0) + count;
			} else if (!/^\d+$/.test(token)) {
				return null; // Invalid token
			}
		}
		
		if (stack.length !== 1) return null;
		
		const breakdown = stack[0];
		let totalMass = 0;
		
		for (const [symbol, count] of Object.entries(breakdown)) {
			const mass = elementMap.get(symbol);
			if (mass === undefined) return null;
			totalMass += mass * count;
		}
		
		return { mass: Math.round(totalMass * 1000) / 1000, breakdown };
	}

	function calculate() {
		error = null;
		result = null;
		const parsed = parseFormula(formula.trim());
		if (!parsed) {
			error = "Неверная формула. Примеры: H2O, Ca(OH)2, Fe2(SO4)3";
			return;
		}
		result = parsed;
	}

	$effect(() => {
		if (formula.trim()) calculate();
	});
</script>

<div class="max-w-2xl mx-auto p-6">
	<h1 class="text-2xl font-bold text-center text-gray-900 mb-6">Калькулятор молярной массы</h1>
	
	<div class="flex gap-2 mb-4">
		<input
			type="text"
			bind:value={formula}
			placeholder="Введите формулу (напр. H2O, Ca(OH)2)"
			class="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            onkeydown={calculate}
		/>
		<button
			onclick={calculate}
			class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
		>
			Рассчитать
		</button>
	</div>

	{#if error}
		<p class="text-red-600 bg-red-50 px-4 py-3 rounded-lg text-sm">{error}</p>
	{/if}

	{#if result}
		<div class="bg-gray-50 rounded-2xl p-5 border border-gray-200 space-y-4">
			<div class="text-center">
				<p class="text-sm text-gray-500">Молярная масса</p>
				<p class="text-3xl font-bold text-gray-900">{result.mass} <span class="text-lg font-normal text-gray-500">г/моль</span></p>
			</div>
			
			<div>
				<p class="font-medium text-gray-700 mb-2">Состав:</p>
				<div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
					{#each Object.entries(result.breakdown) as [symbol, count](symbol)}
						<div class="flex justify-between items-center bg-white px-3 py-2 rounded-lg border border-gray-200">
							<span class="font-mono font-semibold text-blue-600">{symbol}</span>
							<span class="text-gray-600 text-sm">×{count}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>