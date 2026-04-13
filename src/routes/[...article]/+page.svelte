<script lang="ts">
	// import type { Article } from '$lib/models/article.js';
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import { onMount } from 'svelte';
	import markedKatex from 'marked-katex-extension'
	import katex from 'katex';
	import Question from '$lib/components/Question.svelte';
	import { QuesitonAPICalls, QuestionManager } from '$lib/questions-manager.js';

  	let { data }  = $props();
	let  rawData: string = $state("")
	let questionMngr: QuestionManager | undefined = $state()
	onMount(()=>{
	 rawData = data.rawData as string
	 let api = new QuesitonAPICalls(data.backURL)
	 questionMngr =  new QuestionManager(api, data.title)
	})


</script>

<div class="markdown-content">
	<!-- {@html article.content} -->
	<SvelteMarkdown
	source={rawData}
    extensions={[markedKatex({ throwOnError: false })]}
>
    {#snippet html_question({ attributes})}
		<Question
		questionMngr={questionMngr}
		question={attributes?.question ? attributes?.question as string: ""}
		answers={attributes?.answers ? attributes?.answers as string: ""}
		></Question>
    {/snippet}
    {#snippet inlineKatex(props)}
        {@html katex.renderToString(props.text, { displayMode: false })}
    {/snippet}
    {#snippet blockKatex(props)}
        {@html katex.renderToString(props.text, { displayMode: true })}
    {/snippet}
</SvelteMarkdown>
</div>
