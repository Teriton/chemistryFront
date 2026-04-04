<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/header.svelte';

	let { children, data } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>


<Header articlesTree={data.articlesTree} children={body} logedIn={data.logedIn}></Header>

{#snippet body()}
	{@render children()}
{/snippet}
