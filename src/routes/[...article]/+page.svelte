<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import type { Article } from '$lib/models/article.js';

   	let { data }  = $props();
	let article: Article = $derived({title: data.title, content: data.content});



</script>
<h1 class=" text-2xl">{article.title}</h1>
<div class="markdown-content">
	{@html article.content}
</div>
