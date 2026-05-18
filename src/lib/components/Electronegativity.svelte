<script lang="ts">
	import { type ChemElement } from '$lib/data/elements.js';
	import { localizedElements as elements } from '$lib/data/elements-ru.js';

	const electronegativityData: Record<number, number | null> = {
		1: 2.20, 2: null, 3: 0.98, 4: 1.57, 5: 2.04, 6: 2.55, 7: 3.04, 8: 3.44, 9: 3.98, 10: null,
		11: 0.93, 12: 1.31, 13: 1.61, 14: 1.90, 15: 2.19, 16: 2.58, 17: 3.16, 18: null,
		19: 0.82, 20: 1.00, 21: 1.36, 22: 1.54, 23: 1.63, 24: 1.66, 25: 1.55, 26: 1.83, 27: 1.88, 28: 1.91,
		29: 1.90, 30: 1.65, 31: 1.81, 32: 2.01, 33: 2.18, 34: 2.55, 35: 2.96, 36: 3.00,
		37: 0.82, 38: 0.95, 39: 1.22, 40: 1.33, 41: 1.60, 42: 2.16, 43: 1.90, 44: 2.20, 45: 2.28, 46: 2.20,
		47: 1.93, 48: 1.69, 49: 1.78, 50: 1.96, 51: 2.05, 52: 2.10, 53: 2.66, 54: 2.60,
		55: 0.79, 56: 0.89, 57: 1.10, 58: 1.12, 59: 1.13, 60: 1.14, 61: 1.13, 62: 1.17, 63: 1.20, 64: 1.20,
		65: 1.20, 66: 1.22, 67: 1.23, 68: 1.24, 69: 1.25, 70: 1.10, 71: 1.27, 72: 1.30, 73: 1.50, 74: 2.36,
		75: 1.90, 76: 2.20, 77: 2.20, 78: 2.28, 79: 2.54, 80: 2.00, 81: 1.80, 82: 2.33, 83: 2.02, 84: 2.00,
		85: 2.20, 86: null, 87: 0.70, 88: 0.90, 89: 1.10, 90: 1.30, 91: 1.50, 92: 1.38, 93: 1.36, 94: 1.28,
		95: 1.30, 96: 1.30, 97: 1.30, 98: 1.30, 99: 1.30, 100: 1.30, 101: 1.30, 102: 1.30, 103: 1.30,
		104: null, 105: null, 106: null, 107: null, 108: null, 109: null, 110: null, 111: null, 112: null,
		113: null, 114: null, 115: null, 116: null, 117: null, 118: null
	};

	type ElementWithEN = ChemElement & { en: number | null };
	const categoryRu: Record<string, string> = {
		'nonmetal': 'Неметалл',
		'noble-gas': 'Благородный газ',
		'alkali-metal': 'Щелочной металл',
		'alkaline-earth': 'Щелочноземельный металл',
		'metalloid': 'Металлоид',
		'halogen': 'Галоген',
		'transition': 'Переходный металл',
		'post-transition': 'Постпереходный металл',
		'lanthanide': 'Лантаноид',
		'actinide': 'Актиноид'
	};
	let enrichedElements = $derived.by((): ElementWithEN[] => 
		elements.map(e => ({ ...e, en: electronegativityData[e.number] ?? null }))
	);

	let search = $state("");
	let sortBy = $state<'number' | 'name' | 'en'>('number');
	let sortDir = $state<'asc' | 'desc'>('asc');

	const filtered = $derived.by((): ElementWithEN[] => {
		const q = search.toLowerCase().trim();
		let list = enrichedElements.filter(e => 
			!q || e.name.toLowerCase().includes(q) || e.symbol.toLowerCase().includes(q)
		);
		list.sort((a, b) => {
			let cmp = 0;
			if (sortBy === 'en') {
				const av = a.en ?? -1, bv = b.en ?? -1;
				cmp = av === bv ? 0 : av < bv ? -1 : 1;
			} else if (sortBy === 'name') {
				cmp = a.name.localeCompare(b.name, 'ru');
			} else {
				cmp = a.number - b.number;
			}
			return sortDir === 'asc' ? cmp : -cmp;
		});
		return list;
	});

	function toggleSort(field: 'number' | 'name' | 'en') {
		if (sortBy === field) {
			sortDir = sortDir === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = field;
			sortDir = 'asc';
		}
	}

	const getENColor = (en: number | null): string => {
		if (en === null) return 'bg-gray-100 text-gray-400';
		if (en < 1.5) return 'bg-green-100 text-green-800';
		if (en < 2.5) return 'bg-yellow-100 text-yellow-800';
		if (en < 3.5) return 'bg-orange-100 text-orange-800';
		return 'bg-red-100 text-red-800';
	};
</script>

<div class="max-w-5xl mx-auto p-6 space-y-6">
	<!-- Header -->
	<header class="text-center space-y-3">
		<h1 class="text-3xl font-extrabold text-gray-900">Электроотрицательность</h1>
		<p class="text-gray-600 max-w-2xl mx-auto">
			Шкала Полинга: способность атома притягивать электроны в химической связи. 
			Значения от 0.7 (Fr) до 4.0 (F).
		</p>
	</header>

	<!-- Controls -->
	<div class="flex flex-col sm:flex-row gap-3">
		<input
			type="text"
			bind:value={search}
			placeholder="Поиск по названию элемента..."
			class="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
		/>
		<div class="flex gap-2">
			<button onclick={() => toggleSort('number')} 
				class="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition-colors {sortBy === 'number' ? 'ring-2 ring-teal-500' : ''}">
				№ {sortBy === 'number' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
			</button>
			<button onclick={() => toggleSort('name')} 
				class="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition-colors {sortBy === 'name' ? 'ring-2 ring-teal-500' : ''}">
				Название {sortBy === 'name' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
			</button>
			<button onclick={() => toggleSort('en')} 
				class="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition-colors {sortBy === 'en' ? 'ring-2 ring-teal-500' : ''}">
				ЭО {sortBy === 'en' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
			</button>
		</div>
	</div>

	<!-- Legend -->
	<div class="flex flex-wrap gap-2 text-xs">
		<span class="px-2 py-1 rounded bg-green-100 text-green-800">Низкая (&lt;1.5)</span>
		<span class="px-2 py-1 rounded bg-yellow-100 text-yellow-800">Средняя (1.5–2.5)</span>
		<span class="px-2 py-1 rounded bg-orange-100 text-orange-800">Высокая (2.5–3.5)</span>
		<span class="px-2 py-1 rounded bg-red-100 text-red-800">Очень высокая (&gt;3.5)</span>
		<span class="px-2 py-1 rounded bg-gray-100 text-gray-400">Нет данных</span>
	</div>

	<!-- Table -->
	<div class="overflow-x-auto rounded-2xl border border-gray-200">
		<table class="w-full text-sm">
			<thead class="bg-gray-50 text-gray-700 font-medium">
				<tr>
					<th class="px-4 py-3 text-left">№</th>
					<th class="px-4 py-3 text-left">Элемент</th>
					<th class="px-4 py-3 text-left">Символ</th>
					<th class="px-4 py-3 text-left">Категория</th>
					<th class="px-4 py-3 text-right">ЭО</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-100">
				{#each filtered as el (el.number)}
					<tr class="hover:bg-gray-50 transition-colors">
						<td class="px-4 py-3 font-mono text-gray-500">{el.number}</td>
						<td class="px-4 py-3 font-medium text-gray-900">{el.name}</td>
						<td class="px-4 py-3 font-mono text-teal-600">{el.symbol}</td>
						<td class="px-4 py-3 text-gray-600">{categoryRu[el.category] ?? el.category}</td>
						<td class="px-4 py-3 text-right">
							<span class="inline-flex items-center justify-end min-w-12 px-2.5 py-1 rounded-lg font-mono font-semibold {getENColor(el.en)}">
								{el.en !== null ? el.en.toFixed(2) : '—'}
							</span>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	{#if filtered.length === 0}
		<p class="text-center text-gray-500 py-8">Ничего не найдено</p>
	{/if}

	<!-- Footer note -->
	<footer class="text-center text-xs text-gray-400 pt-4">
		<p>Данные: шкала Полинга. Благородные газы и некоторые синтетические элементы не имеют значений.</p>
	</footer>
</div>