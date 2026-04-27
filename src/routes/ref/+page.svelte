<script lang="ts">
	import { resolve } from "$app/paths";
	import { SvelteMap } from "svelte/reactivity";
	import type { RefPage } from "./proxy+page.server";
	import { onMount } from "svelte";

	let { data } = $props();
	let sortedPages = $state(new Map<string, RefPage[]>());
	let searchQuery = $state("");

    onMount(()=>{
        sortedPages = data.sortedPages
    })


	let filteredPages = $derived.by((): Map<string, RefPage[]> => {
		if (!searchQuery.trim()) return sortedPages;
		const query = searchQuery.toLowerCase();
		const result = new SvelteMap<string, RefPage[]>();
		for (const [letter, pages] of sortedPages) {
			const matched = pages.filter(p => p.name.toLowerCase().includes(query));
			if (matched.length) result.set(letter, matched);
		}
		return result;
	});

	let resultsCount = $derived.by((): number => {
		let count = 0;
		for (const pages of filteredPages.values()) count += pages.length;
		return count;
	});

	let totalCount = $derived.by((): number => {
		let count = 0;
		for (const pages of sortedPages.values()) count += pages.length;
		return count;
	});
</script>

<div class="m-auto p-10 w-full max-w-2xl">
	<h1 class="text-2xl font-bold text-center mb-6">Справочная информация</h1>
	
	<div class="mb-6">
		<input
			type="text"
			bind:value={searchQuery}
			placeholder="Поиск по названию..."
			autocomplete="off"
			class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
		/>
		{#if searchQuery}
			<p class="text-sm text-gray-500 mt-1.5">
				Найдено: <span class="font-medium text-gray-700">{resultsCount}</span>
				{#if resultsCount !== totalCount}
					из {totalCount}
				{/if}
			</p>
		{/if}
	</div>

	{#if resultsCount === 0 && searchQuery}
		<p class="text-center text-gray-500 py-8">Ничего не найдено</p>
	{:else}
		{#each Array.from(filteredPages.entries()) as [letter, pages](letter)}
			<div class="mb-6">
				<h2 class="text-lg font-semibold text-gray-700 mb-2 pb-1 border-b border-gray-200">
					{letter}
				</h2>
				<ul class="space-y-1.5 pl-2">
					{#each pages as page (page.path)}
						<li>
							<a href={resolve(page.path)} class="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
								{page.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	{/if}
</div>