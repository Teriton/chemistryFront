<script lang="ts">
    import { resolve  } from '$app/paths';
    import Self from './menu-item.svelte'
	import { completedLessons } from '$lib/completed-lessons.js';
	let { section, mobile = false, path = '' } = $props();

	let isOpen = $state(false);

	let isCompleted = $derived(($completedLessons as string[]).includes(section.title));
	function toggleOpen() {
		isOpen = !isOpen;
	}
</script>

{#if section.articles && section.articles.length > 0}
	<div class="relative">
		<button
			class="font-semibold px-4 py-2
			 hover:bg-teal-100 transition-all duration-200 hover:translate-x-1 {mobile ? 'text-white hover:text-teal-100' : 'text-emerald-900'}
			  w-full text-left flex items-center justify-between"
			onclick={toggleOpen}
		>
			<span>{section.title}</span>
			<span class="text-sm">{isOpen ? '▼' : '▶'}</span>
		</button>
		{#if isOpen}
			<div class="pl-4">
				{#each section.articles as item (item.title)}
					<Self section={item} {mobile} path="{path}/{encodeURIComponent(section.title)}" />
				{/each}
			</div>
		{/if}
	</div>
{:else}
	<a
		href={resolve(`${path}/${section.title}` as `/${string}`)}
		class="
		{isCompleted ? "bg-cyan-100 text-teal-900 font-semibold" : "text-emerald-900"}
		block px-4 py-2 transition-all duration-200 hover:bg-teal-100 hover:translate-x-1 {mobile ? 'text-white hover:text-teal-100' : ''}"
	>
		{section.title}
	</a>
{/if}
