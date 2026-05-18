<script lang="ts">
	import type { SolubilityEntry, SolubilityLevel } from '$lib/data/solubility';
	import { solubilityData, cations, anions, solubilityColors, solubilityLabels, solubilityDescriptions } from '$lib/data/solubility';
	import { dragscroll, type DragScrollParameters } from '@svelte-put/dragscroll';
	import { onMount } from 'svelte';

	let { initialCation = null, initialAnion = null } = $props();

	let selectedEntry: SolubilityEntry | null = $state(null);
	let popupPosition = $state<{ x: number; y: number; align: 'left' | 'right' | 'top' | 'bottom' } | null>(null);
	let tableContainer: HTMLElement | null = null;

	onMount(() => {
		if (initialCation && initialAnion) {
			const entry = solubilityData.find(
				e => e.cation.symbol === initialCation && e.anion.symbol === initialAnion
			);
			if (entry) {
				// Небольшая задержка, чтобы таблица отрендерилась
				setTimeout(() => {
					selectedEntry = entry;
					// Имитируем клик по ячейке для позиционирования
					const cell = document.querySelector(
						`[aria-label="${entry.cation.name} + ${entry.anion.name}: ${entry.solubility}"]`
					) as HTMLElement;
					if (cell) positionPopup(cell);
				}, 100);
			}
		}

		// Закрытие по клику вне попупа
		const handleClickOutside = (e: MouseEvent) => {
			if (!selectedEntry) return;
			const target = e.target as HTMLElement;
			const popup = document.querySelector('.solubility-popup');
			const cell = target.closest('.solubility-cell');
			
			if (popup && !popup.contains(target) && !cell) {
				selectedEntry = null;
				popupPosition = null;
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	});

	function positionPopup(cell: HTMLElement) {
		if (!tableContainer) return;
		
		const cellRect = cell.getBoundingClientRect();
		const containerRect = tableContainer.getBoundingClientRect();
		const popupWidth = 320; // примерная ширина попупа
		const popupHeight = 280; // примерная высота
		const padding = 12;

		// Вычисляем позицию относительно контейнера
		const cellCenterX = cellRect.left - containerRect.left + cellRect.width / 2;
		const cellCenterY = cellRect.top - containerRect.top + cellRect.height / 2;

		// Определяем, где больше места
		const spaceRight = containerRect.width - (cellRect.right - containerRect.left);
		const spaceLeft = cellRect.left - containerRect.left;
		const spaceBottom = containerRect.height - (cellRect.bottom - containerRect.top);
		const spaceTop = cellRect.top - containerRect.top;

		let x: number, y: number, align: 'left' | 'right' | 'top' | 'bottom';

		// Приоритет: справа → слева → снизу → сверху
		if (spaceRight > popupWidth + padding) {
			x = cellRect.right - containerRect.left + padding;
			y = cellCenterY - popupHeight / 2;
			align = 'right';
		} else if (spaceLeft > popupWidth + padding) {
			x = cellRect.left - containerRect.left - popupWidth - padding;
			y = cellCenterY - popupHeight / 2;
			align = 'left';
		} else if (spaceBottom > popupHeight + padding) {
			x = cellCenterX - popupWidth / 2;
			y = cellRect.bottom - containerRect.top + padding;
			align = 'bottom';
		} else {
			x = cellCenterX - popupWidth / 2;
			y = cellRect.top - containerRect.top - popupHeight - padding;
			align = 'top';
		}

		// Ограничиваем в пределах контейнера
		x = Math.max(padding, Math.min(x, containerRect.width - popupWidth - padding));
		y = Math.max(padding, Math.min(y, containerRect.height - popupHeight - padding));

		popupPosition = { x, y, align };
	}

	function handleCellClick(event: MouseEvent, entry: SolubilityEntry | undefined, cell: HTMLElement) {
		event.stopPropagation();
		if (!entry) return;
		
		selectedEntry = entry;
		positionPopup(cell);
	}

	function closePopup() {
		selectedEntry = null;
		popupPosition = null;
	}

	function getSolubilityClass(solubility: string): string {
		const map: Record<string, string> = {
			'soluble': 'text-green-700 font-semibold',
			'insoluble': 'text-red-700 font-semibold',
			'slight': 'text-yellow-700 font-medium',
			'decomposes': 'text-purple-700 italic',
			'reacts': 'text-blue-700 italic',
			'unknown': 'text-gray-500'
		};
		return map[solubility] || '';
	}

</script>

<div class="solubility-table-container mx-auto max-w-full space-y-6 px-4 py-8">
	<h1 class="text-center text-3xl font-bold text-slate-900">Таблица растворимости</h1>

	<!-- Контейнер таблицы с относительным позиционированием для попупа -->
	<div class="relative" bind:this={tableContainer}>
		<div class="flex gap-6 items-start">
			<!-- Таблица -->
			<div class="table-wrapper relative scroll-auto w-auto flex h-140 justify-items-center flex-1 overflow-auto" use:dragscroll={{axis: 'both'}}>
				<div class="grid gap-px bg-gray-200 border-2 border-gray-200 rounded-lg h-max"
					style={`
						grid-template-columns: repeat(${anions.length + 1}, minmax(120px, auto));
						grid-template-rows: auto repeat(${cations.length}, minmax(60px, auto)) auto;
					`}>

					<div class="sticky -top-5 -left-5 z-20 bg-white border-b-2 border-r-2 border-gray-300 p-2 font-bold">
						Катион ↓<br/>Анион →
					</div>

					{#each anions as anion, anionIndex}
						<div
							class="sticky -top-5 z-10 bg-gray-50 border-b-2 border-gray-300 py-2 text-center font-medium"
							style="grid-column: {anionIndex + 2}"
						>
							{anion.symbol}<br/>
							<span class="text-xs text-gray-500">{anion.name}</span>
						</div>
					{/each}

					{#each cations as cation, cationIndex}
						<div
							class="header-cation sticky -left-5 z-10 bg-gray-50 border-r-2 border-gray-300 p-2 font-medium min-w-25 text-right"
							style="grid-row: {cationIndex + 2}"
						>
							{cation.symbol}<br/>
							<span class="text-xs text-gray-500">{cation.name}</span>
						</div>

						{#each anions as anion, anionIndex}
							{@const entry = solubilityData.find(e => e.cation.symbol === cation.symbol && e.anion.symbol === anion.symbol)}
							{@const row = cationIndex + 2}
							{@const col = anionIndex + 2}

							<button
								class="solubility-cell border border-gray-200 p-2 text-center hover:ring-2 hover:ring-teal-400 transition-all rounded cursor-pointer"
								style="
									grid-row: {row};
									grid-column: {col};
									background-color: {entry ? solubilityColors[entry.solubility] : '#f9f9f9'};
									min-width: 80px;
									min-height: 60px;
								"
								onclick={(e) => handleCellClick(e, entry, e.currentTarget)}
								aria-label="{cation.name} + {anion.name}: {entry?.solubility || 'нет данных'}"
								title="{entry?.notes || ''}"
							>
								{#if entry}
									<span class={getSolubilityClass(entry.solubility)}>
										{solubilityLabels[entry.solubility]}
									</span>
									{#if entry.formula && entry.formula !== '—'}
										<div class="text-xs text-gray-600 mt-1">{entry.formula}</div>
									{/if}
								{:else}
									<span class="text-gray-400 text-sm">—</span>
								{/if}
							</button>
						{/each}
					{/each}
				</div>
			</div>
		</div>

		<!-- Всплывающий пузырёк с информацией -->
{#if selectedEntry && popupPosition}
	<div
		class="solubility-popup absolute z-50 w-80 animate-in fade-in zoom-in-95 duration-200"
		style="left: {popupPosition.x}px; top: {popupPosition.y}px;"
	>
		<!-- Карточка без тени и стрелки -->
		<div class="rounded-xl border border-blue-200 bg-white p-4">
			<div class="entry-details space-y-3">
				<div class="flex justify-between items-start gap-2">
					<h2 class="text-base font-bold text-slate-800">
						{selectedEntry.cation.name}<br/>+ {selectedEntry.anion.name}
					</h2>
					<button 
						onclick={closePopup} 
						class="solubility-popup-close text-gray-400 hover:text-gray-600 transition-colors shrink-0 p-1 hover:bg-gray-100 rounded" 
						title="Закрыть"
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
						</svg>
					</button>
				</div>
				
				<div class="space-y-2 text-sm">
					<div class="detail-item">
						<span class="label font-medium text-gray-500">Формула</span>
						<span class="value font-mono font-semibold text-slate-700">{selectedEntry.formula || '—'}</span>
					</div>
					<div class="detail-item">
						<span class="label font-medium text-gray-500">Растворимость</span>
						<span class="value font-semibold" style="color: {solubilityColors[selectedEntry.solubility]}">
							{solubilityDescriptions[selectedEntry.solubility]}
						</span>
					</div>
					<div class="detail-item flex flex-row justify-between">
						<span class="label font-medium text-gray-500">Ионы</span>
						<span class="value font-mono text-sm">
							{selectedEntry.cation.symbol}<sup>{selectedEntry.cation.charge}</sup> + 
							{selectedEntry.anion.symbol}<sup>{selectedEntry.anion.charge}</sup>
						</span>
					</div>
				</div>
				
				{#if selectedEntry.notes}
					<div class="rounded-lg border border-blue-100 bg-blue-50/50 p-2.5 text-sm">
						<span class="font-medium text-gray-600">Примечание:</span>
						<span class="ml-1 text-gray-700">{selectedEntry.notes}</span>
					</div>
				{/if}
				
				<div class="flex gap-3 pt-1">
					{#if selectedEntry.ksp}
						<div class="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
							K<sub>sp</sub> = {selectedEntry.ksp}
						</div>
					{/if}
					{#if selectedEntry.solubilityGPer100ml}
						<div class="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
							{selectedEntry.solubilityGPer100ml}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}
	</div>

	<!-- Легенда -->
	<div class="rounded-2xl border border-gray-200 bg-gray-50 p-5">
		<h3 class="font-bold text-lg text-slate-800 mb-4">Условные обозначения</h3>
		<div class="flex flex-wrap gap-x-6 gap-y-3">
			{#each Object.entries(solubilityColors) as [solubility, color]}
				<div class="flex items-center gap-2.5">
					<div class="w-6 h-6 rounded-md border border-gray-300 shrink-0" style="background-color: {color}"></div>
					<div>
						<span class="font-medium text-sm text-slate-700">{solubilityLabels[solubility as SolubilityLevel]}</span>
						<span class="text-xs text-gray-500 ml-1.5">— {solubilityDescriptions[solubility as SolubilityLevel]}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.solubility-table-container {
		font-family: system-ui, -apple-system, sans-serif;
		max-width: 100%;
	}

	.solubility-cell:hover {
		transform: scale(1.02);
		z-index: 5;
		box-shadow: 0 4px 12px rgba(0,0,0,0.1);
	}

	.detail-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	/* Анимация появления попупа */
	@keyframes fadeInZoom {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.solubility-popup {
		animation: fadeInZoom 0.15s ease-out;
	}

	/* Плавное закрытие */
	.solubility-popup-close:hover {
		background-color: rgba(0,0,0,0.05);
	}

	@media (max-width: 768px) {
		.detail-item {
			font-size: 0.85rem;
		}
		.solubility-popup {
			width: calc(100vw - 32px) !important;
			max-width: 320px;
		}
	}
</style>