<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/header.svelte';
	import PracticeIntroModal from '$lib/components/PracticeIntroModal.svelte';
	import { logedIn } from '$lib/logedIn.js';
	import { completedLessons } from '$lib/completed-lessons.js';
	import { onMount } from 'svelte';
	import { ArticlesRepo } from '$lib/articles-repo';

	let { children, data } = $props();

	onMount(async () => {
		if (data.isGuestRoute) return;
		const articleRepo = new ArticlesRepo('localhost:8080');
		if (data.logedIn) {
			const dataRaw = await articleRepo.getCompletedArticlesTitles();
			completedLessons.set(dataRaw.titles);
		}
		$logedIn = data.logedIn;
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{#if data.isGuestRoute}
	<div class="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 text-white">
		{@render children()}
	</div>
{:else}
	<Header articlesTree={data.articlesTree} children={body}></Header>
	<PracticeIntroModal />

	{#snippet body()}
		{@render children()}
	{/snippet}
{/if}
