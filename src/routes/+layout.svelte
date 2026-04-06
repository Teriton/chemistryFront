<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/header.svelte';
	import { logedIn } from '$lib/logedIn.js';
	import { onMount } from 'svelte';

	let { children, data } = $props();

	onMount(()=>{
		$logedIn = data.logedIn; 
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>


<Header articlesTree={data.articlesTree} children={body}></Header>

{#snippet body()}
	{@render children()}
{/snippet}
