<script lang="ts">
	import type { SolubilityEntry, SolubilityLevel,  } from '$lib/data/solubility';
	import { solubilityData, cations, anions, solubilityColors, solubilityLabels } from '$lib/data/solubility';
	import { dragscroll, type DragScrollParameters } from '@svelte-put/dragscroll';
	import { onMount } from 'svelte';
        
    let { initialCation = null, initialAnion = null } = $props();

    let selectedEntry: SolubilityEntry | null = $state(null);

    onMount(() => {
        if (initialCation && initialAnion) {
            selectedEntry = solubilityData.find(
                e => e.cation.symbol === initialCation && e.anion.symbol === initialAnion
            ) || null;
        }
    });

    function getCellPosition(cationIndex: number, anionIndex: number): { row: number; col: number } {
        // Row 1: header row (anions)
        // Col 1: header column (cations)
        // Data starts at row 2, col 2
        return { 
            row: cationIndex + 2, 
            col: anionIndex + 2 
        };
    } 

    let axis: DragScrollParameters['axis'] = 'both';
    
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

<div class="solubility-table-container">
    <h1 class="page-title">Таблица растворимости</h1>
    
    <div class="table-wrapper relative scroll-auto w-auto flex h-140 justify-items-center" use:dragscroll={{axis}}>
        <div  class="grid gap-px bg-gray-200 border-2 border-gray-200 rounded-lg h-max"
    style={`
        grid-template-columns: repeat(${anions.length + 1}, minmax(120px, auto));
        grid-template-rows: auto repeat(${cations.length}, minmax(60px, auto)) auto;
    `}>
        
            
            <div class=" sticky top-0 left-0 z-20 bg-white border-b-2 border-r-2 border-gray-300 p-2 font-bold">
                Катион ↓<br/>Анион →
            </div>
            
            {#each anions as anion, anionIndex(anion.name + anionIndex)}
                <div 
                    class="sticky top-0 z-10 bg-gray-50 border-b-2 border-gray-300 py-2 text-center font-medium "
                    style="grid-column: {anionIndex + 2}"
                >
                    {anion.symbol}<br/>
                    <span class="text-xs text-gray-500">{anion.name }</span>
                </div>
            {/each}
            
            {#each cations as cation, cationIndex(cationIndex)}
                <div 
                    class="header-cation sticky left-0 z-10 bg-gray-50 border-r-2 border-gray-300 p-2 font-medium min-w-25 text-right"
                    style="grid-row: {cationIndex + 2}"
                >
                    {cation.symbol}<br/>
                    <span class="text-xs text-gray-500">{cation.name}</span>
                </div>
                
                {#each anions as anion, anionIndex(anion.name + anionIndex)}
                    {@const entry = solubilityData.find(e => e.cation.symbol === cation.symbol && e.anion.symbol === anion.symbol)}
                    {@const { row, col } = getCellPosition(cationIndex, anionIndex)}
                    
                    <button
                        class="solubility-cell border border-gray-200 p-2 text-center hover:ring-2 hover:ring-blue-400 transition-all rounded cursor-pointer"
                        style="
                            grid-row: {row}; 
                            grid-column: {col}; 
                            background-color: {entry ? solubilityColors[entry.solubility] : '#f9f9f9'};
                            min-width: 80px;
                            min-height: 60px;
                        "
                        onclick={() => selectedEntry = entry || null}
                        aria-label="{cation.name} + {anion.name}: {entry?.solubility || 'no data'}"
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
    
    <div class="legend  p-4 bg-gray-50 rounded-lg">
        <h3 class="font-bold mb-3">Условные обозначения</h3>
        <div class="legend-items flex flex-wrap gap-3">
            {#each Object.entries(solubilityColors) as [solubility, color](solubility)}
                <div class="legend-item flex items-center gap-2">
                    <div class="legend-color w-6 h-6 rounded border border-gray-300" style="background-color: {color}"></div>
                    <span>{solubilityLabels[solubility as SolubilityLevel]}</span>
                </div>
            {/each}
        </div>
        <div class="grid grid-cols-2 mt-3 text-xs text-gray-500">
            <p>• <strong>Р</strong> — растворимо (>1g/100ml)</p>
            <p>• <strong>М</strong> — малорастворимо (0.01-1g/100ml)</p>
            <p>• <strong>Н</strong> — нерастворимо (&lt;0.01g/100ml)</p>
            <p>• <strong>—</strong> — разлагается или реагирует с водой</p>
        </div>
        <div class="absolute top-60 right-0  w-50   p-4 bg-blue-50 border-b-2 border-blue-200">
                {#if selectedEntry}
                    <div class="entry-details">
                        <h2 class="text-lg font-bold mb-2">
                            {selectedEntry.cation.name} + {selectedEntry.anion.name}
                        </h2>
                        <div class="detail-grid grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            <div class="detail-item">
                                <span class="label font-medium text-gray-600">Formula:</span>
                                <span class="value font-mono">{selectedEntry.formula || '—'}</span>
                            </div>
                            <div class="detail-item">
                                <span class="label font-medium text-gray-600">Solubility:</span>
                                <span class="value" style="color: {solubilityColors[selectedEntry.solubility]}">
                                    {solubilityLabels[selectedEntry.solubility]}
                                </span>
                            </div>
                            <div class="detail-item">
                                <span class="label font-medium text-gray-600">Cation:</span>
                                <span class="value">{selectedEntry.cation.symbol} ({selectedEntry.cation.charge})</span>
                            </div>
                            <div class="detail-item">
                                <span class="label font-medium text-gray-600">Anion:</span>
                                <span class="value">{selectedEntry.anion.symbol} ({selectedEntry.anion.charge})</span>
                            </div>
                        </div>
                        {#if selectedEntry.notes}
                            <div class="mt-3 p-3 bg-white rounded border border-gray-200">
                                <span class="label font-medium text-gray-600">Notes:</span>
                                <p class="text-sm mt-1">{selectedEntry.notes}</p>
                            </div>
                        {/if}
                        {#if selectedEntry.ksp}
                            <div class="mt-2 text-xs text-gray-500">
                                K<sub>sp</sub> = {selectedEntry.ksp}
                            </div>
                        {/if}
                    </div>
                {:else}
                    <p class="text-gray-500 italic">Select a cell to view compound details</p>
                {/if}
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
    
    .detail-grid {
        gap: 0.75rem 1.5rem;
    }
    
    .detail-item {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .legend-color {
        flex-shrink: 0;
    }
    
    @media (max-width: 768px) {
        .detail-grid {
            grid-template-columns: 1fr;
        }
    }
</style>