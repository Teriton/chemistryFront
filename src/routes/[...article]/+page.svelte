<script lang="ts">
	import type { Article } from '$lib/models/article.js';

   	let { data, form }  = $props();
	let article: Article = $derived({title: data.title, content: data.content});



</script>
{#if form?.success}
	<p>Верный ответ</p>
{/if}
<h1 class=" text-2xl">{article.title}</h1>
<div class="markdown-content">
	{@html article.content}
</div>
