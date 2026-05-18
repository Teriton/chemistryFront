<script lang="ts">
	import type { ChemElement } from '$lib/data/elements.js';

	let { data } = $props<{ data: { elem: ChemElement | null } }>();

	let elem = $derived<ChemElement | null>(data.elem);

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
	const phaseRu: Record<string, string> = {
		solid: 'твердое',
		liquid: 'жидкое',
		gas: 'газообразное',
		unknown: 'неизвестно'
	};

	const formatCategory = (cat: string) => categoryRu[cat] ?? cat;
</script>

<div class="max-w-4xl mx-auto p-6 space-y-8">
	{#if elem}
		<!-- Header -->
		<header class="text-center border-b border-gray-200 pb-6">
			<h1 class="text-4xl font-extrabold text-gray-900 tracking-tight">{elem.name}</h1>
			<div class="mt-3 flex items-center justify-center gap-6">
				<span class="text-6xl font-mono font-bold text-blue-600">{elem.symbol}</span>
				<span class="text-xl text-gray-500 font-medium">Порядковый номер: {elem.number}</span>
			</div>
		</header>

		<!-- Properties Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<section class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
				<h2 class="text-lg font-semibold text-gray-800 flex items-center gap-2 pb-3 border-b border-gray-100">
					<svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
					Общая информация
				</h2>
				<dl class="space-y-3 text-gray-700">
					<div class="flex justify-between items-baseline gap-4">
						<dt class="text-sm text-gray-500 shrink-0">Категория</dt>
						<dd class="font-medium text-right">{formatCategory(elem.category)}</dd>
					</div>
					<div class="flex justify-between items-baseline gap-4">
						<dt class="text-sm text-gray-500 shrink-0">Период / Группа</dt>
						<dd class="font-medium text-right">{elem.period} / {elem.group}</dd>
					</div>
					<div class="flex justify-between items-baseline gap-4">
						<dt class="text-sm text-gray-500 shrink-0">Агрегатное состояние (н.у.)</dt>
						<dd class="font-medium text-right capitalize">{phaseRu[elem.phaseAtSTP]}</dd>
					</div>
					<div class="flex justify-between items-baseline gap-4">
						<dt class="text-sm text-gray-500 shrink-0">Атомная масса</dt>
						<dd class="font-medium text-right">{elem.mass} u</dd>
					</div>
				</dl>
			</section>

			<section class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
				<h2 class="text-lg font-semibold text-gray-800 flex items-center gap-2 pb-3 border-b border-gray-100">
					<svg class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
					Физические данные
				</h2>
				<dl class="space-y-3 text-gray-700">
					<div class="flex justify-between items-baseline gap-4">
						<dt class="text-sm text-gray-500 shrink-0">Электронная конфигурация</dt>
						<dd><code class="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">{elem.electronConfiguration}</code></dd>
					</div>
					<div class="flex justify-between items-baseline gap-4">
						<dt class="text-sm text-gray-500 shrink-0">Плотность</dt>
						<dd class="font-medium text-right">{elem.density !== null ? `${elem.density} g/cm³` : '—'}</dd>
					</div>
					<div class="flex justify-between items-baseline gap-4">
						<dt class="text-sm text-gray-500 shrink-0">Температура плавления</dt>
						<dd class="font-medium text-right">{elem.meltingPoint !== null ? `${elem.meltingPoint} °C` : '—'}</dd>
					</div>
					<div class="flex justify-between items-baseline gap-4">
						<dt class="text-sm text-gray-500 shrink-0">Температура кипения</dt>
						<dd class="font-medium text-right">{elem.boilingPoint !== null ? `${elem.boilingPoint} °C` : '—'}</dd>
					</div>
				</dl>
			</section>
		</div>

		<!-- History -->
		<section class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
			<div class="p-6 space-y-4">
				<h2 class="text-lg font-semibold text-blue-900 flex items-center gap-2">
					<svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
					История открытия и применение
				</h2>
				<div class="flex items-center gap-3 flex-wrap">
					<span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-blue-200 text-sm text-blue-800 shadow-sm">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
						Год открытия: <span class="font-semibold">{elem.yearOfDiscovery}</span>
					</span>
				</div>
				<p class="text-gray-700 leading-relaxed whitespace-pre-line">{elem.history}</p>
			</div>
		</section>
	{:else}
		<div class="flex flex-col items-center justify-center py-20 text-center">
			<p class="text-2xl font-semibold text-gray-600">Элемент не найден</p>
			<p class="mt-2 text-gray-400">Данные по запрошенному элементу недоступны.</p>
		</div>
	{/if}
</div>