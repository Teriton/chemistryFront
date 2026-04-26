<script lang="ts">
	import type { ChemElement } from '$lib/data/elements';
	import { categoryColors, elements } from '$lib/data/elements';
	import { dragscroll, type DragScrollParameters } from '@svelte-put/dragscroll';
	import { onMount } from 'svelte';
        
        let {number = null} = $props();

        let selectedElement: ChemElement | null = $state(null);

        onMount(()=>{
                if (number != null) {
                        selectedElement = elements[number-1]
                }
        });

        function getRowCol(number: number): { row: number; col: number } {
                if (number === 1) return { row: 1, col: 1 };
                if (number === 2) return { row: 1, col: 18 };

                if (number >= 3 && number <= 4) {
                        return { row: 2, col: number - 2 };
                }
                if (number >= 5 && number <= 10) {
                        return { row: 2, col: number + 8 };
                }
                if (number >= 11 && number <= 12) {
                        return { row: 3, col: number - 10 };
                }
                if (number >= 13 && number <= 18) {
                        return { row: 3, col: number  };
                }
                if (number >= 19 && number <= 36) {
                        return { row: 4, col: number - 18 };
                }
                if (number >= 37 && number <= 54) {
                        return { row: 5, col: number - 36 };
                }
                if (number >= 55 && number <= 86) {
                        if (number >= 55 && number <= 56) {
                                return { row: 6, col: number - 54 };
                        }
                        if (number >= 57 && number <= 71) {
                                return { row: 8, col: number - 54 };
                        }
                        if (number >= 72 && number <= 86) {
                                return { row: 6, col: number - 68};
                        }
                }
                if (number >= 87 && number <= 118) {
                        if (number >= 87 && number <= 88) {
                                return { row: 7, col: number - 86 };
                        }
                        if (number >= 89 && number <= 103) {
                                return { row: 9, col: number - 86 };
                        }
                        if (number >= 104 && number <= 118) {
                                return { row: 7, col: number - 100};
                                // return { row: 7, col: number - 86 };
                        }
                }
                if (number == -1) {
                    return {row: 6, col:3}
                }
                if (number == -2) {
                    return {row: 7, col:3}
                }

                return { row: 1, col: 1 };
        } 
       	let axis: DragScrollParameters['axis'] = 'both';
</script>

<div class="periodic-table-container">
        <h1 class="page-title">Переодическая таблица Менделеева</h1>
        <div class="table-wrapper scroll-auto w-auto flex h-150 justify-items-center" use:dragscroll={{axis}}>
                <div class="periodic-table grid" >
                        <div
                                class="col-3 row-1  col-end-13 row-end-4" 
                        >
                                {#if selectedElement}
                                        <div class="element-details">
                                                <h2>{selectedElement.name}</h2>
                                                <div class="detail-grid">
                                                        <div class="detail-item">
                                                                <span class="label">Atomic Number:</span>
                                                                <span class="value">{selectedElement.number}</span>
                                                        </div>
                                                        <div class="detail-item">
                                                                <span class="label">Symbol:</span>
                                                                <span class="value">{selectedElement.symbol}</span>
                                                        </div>
                                                        <div class="detail-item">
                                                                <span class="label">Atomic Mass:</span>
                                                                <span class="value">{selectedElement.mass}</span>
                                                        </div>
                                                        <div class="detail-item">
                                                                <span class="label">Category:</span>
                                                                <span class="value" style="background-color: {categoryColors[selectedElement.category]}">{selectedElement.category.replace('-', ' ')}</span>
                                                        </div>
                                                </div>
                                        </div>
                                {/if}
                        </div>
                        {#each elements as element(element.number)}
                                {@const { row, col } = getRowCol(element.number)}
                                <button
                                        class="element"
                                        style="grid-row: {row}; grid-column: {col}; background-color: {categoryColors[element.category]}"
                                        onclick={() => selectedElement = element}
                                        aria-label="{element.name} - Atomic number {element.number}"
                                >
                                        {#if element.number < 0}
                                        <div class="flex flex-col relative -top-3 w-full items-center">
                                                <span class="name">{element.name}</span>
                                        </div>
                                        {:else}
                                        <span class="atomic-number">{element.number}</span>
                                        <div class="flex flex-col relative -top-3 w-full items-center">
                                                <span class="symbol">{element.symbol}</span>
                                                <span class="name">{element.name}</span>
                                                <span class="mass">{element.mass}</span>
                                        </div>
                                        {/if}
                                        
                               </button>
                        {/each}
                </div>
        </div>
        <div class="legend">
                <h3>Legend</h3>
                <div class="legend-items">
                        {#each Object.entries(categoryColors) as [category, color](category)}
                                <div class="legend-item">
                                        <div class="legend-color" style="background-color: {color}"></div>
                                        <span>{category.replace('-', ' ')}</span>
                                </div>
                        {/each}
                </div>
        </div>
</div>

