<script lang="ts">
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
	import { categoryColors, elements, type ChemElement } from "$lib/data/elements";
	import { onMount } from "svelte";


    let {elemNumber = -1} = $props();
	let element: ChemElement = $state(elements[0]); 
    onMount(()=>{
        element = elements[elemNumber -1]
    })
</script>
<div>
    <button
             class="element"
             style="background-color: {categoryColors[element.category]}"
             aria-label="{element.name} - Atomic number {element.number}"
             onclick={()=>{
                goto(resolve(`/elements/${element.number}`))
             }} 
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
</div>
