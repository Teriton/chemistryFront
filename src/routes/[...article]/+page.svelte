<script lang="ts">
	import type { Article } from '$lib/models/article.js';

	const authMngr = new AuthMngr("localhost:8080");
	let article: Article = $derived({title: data.title, content: data.content});



</script>
{#if form?.success}
	<p>Верный ответ</p>
{/if}
<div class="markdown-content">
	{@html article.content}
</div>
