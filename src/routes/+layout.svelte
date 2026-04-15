<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/header.svelte';
	import { logedIn } from '$lib/logedIn.js';
	import { onMount } from 'svelte';
	import { ArticlesRepo } from '$lib/articles-repo';

	let { children, data } = $props();

	let lessonsCompleted: string[] = $state([])

	onMount( async ()=>{
		let articleRepo = new ArticlesRepo("localhost:8080")
		if (data.logedIn) {
			let dataRaw = await articleRepo.getCompletedArticlesTitles()
			lessonsCompleted = dataRaw.titles
		}
		$logedIn = data.logedIn; 
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>


<Header articlesTree={data.articlesTree} lessonsCompleted={lessonsCompleted} children={body}></Header>

{#snippet body()}
	{@render children()}
{/snippet}
