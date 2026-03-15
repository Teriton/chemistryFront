<script lang="ts">
    import { resolve  } from '$app/paths';
    import Self from './menu-item.svelte'
	let { section, mobile = false, path = '' } = $props();

	let isOpen = $state(false);


	function toggleOpen() {
		isOpen = !isOpen;
	}
</script>

{#if section.articles && section.articles.length > 0}
	<div class="relative">
		<button
			class="font-semibold px-4 py-2 hover:bg-gray-100 {mobile ? 'text-white hover:text-blue-200' : ''} w-full text-left flex items-center justify-between"
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
		class="block px-4 py-2 hover:bg-gray-100 {mobile ? 'text-white hover:text-blue-200' : ''}"
	>
		{section.title}
	</a>
{/if}
