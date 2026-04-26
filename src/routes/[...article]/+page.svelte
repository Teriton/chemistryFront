<script lang="ts">
	// import type { Article } from '$lib/models/article.js';
	import SvelteMarkdown, { type RendererComponent, type Renderers } from '@humanspeak/svelte-markdown';
	import { onMount } from 'svelte';
	import markedKatex from 'marked-katex-extension'
	import Question from '$lib/components/Question.svelte';
	import { QuesitonAPICalls, QuestionManager } from '$lib/questions-manager.js';
	import KatexRenderer from '$lib/KatexRenderer.svelte'
	import Equation from '$lib/components/equation.svelte';
	import ChemElem from '$lib/components/ChemElem.svelte';
	import ChemElems from '$lib/components/ChemElems.svelte';

  	let { data }  = $props();
	let  rawData: string = $state("")
	let questionMngr: QuestionManager | undefined = $state()
	onMount(()=>{
	 rawData = data.rawData as string
	 let api = new QuesitonAPICalls(data.backURL)
	 questionMngr =  new QuestionManager(api, data.title)
	})

    interface KatexRenderers extends Renderers {
        inlineKatex: RendererComponent
        blockKatex: RendererComponent
    }

    const renderers: Partial<KatexRenderers> = {
        inlineKatex: KatexRenderer,
        blockKatex: KatexRenderer
    }
</script>

<div class="markdown-content">
	<!-- {@html article.content} -->
	<SvelteMarkdown
	source={rawData}
	{renderers}
    extensions={[markedKatex({ throwOnError: false })]}
>
	{#snippet html_formula({ attributes})}
		<Equation
		f={attributes?.f ? attributes?.f as string: "" } 
		answers={attributes?.answers ? attributes?.answers as string: ""}
		{renderers} {questionMngr}>
		</Equation> 
	{/snippet}
		
    {#snippet html_question({ attributes})}
		<Question
		questionMngr={questionMngr}
		question={attributes?.question ? attributes?.question as string: ""}
		answers={attributes?.answers ? attributes?.answers as string: ""}
		></Question>
    {/snippet}

	{#snippet html_element({ attributes})}
	<div class="w-full  flex justify-center py-5 ">
		<ChemElem elemNumber={attributes?.number ? attributes?.number as number: 1}></ChemElem>	
	</div>
    {/snippet}
	{#snippet html_elements({ attributes})}
	<div class="w-full  flex justify-center py-5">
		<ChemElems elemNumbers={attributes?.numbers ? attributes?.numbers as string: ""}></ChemElems>	
	</div>
    {/snippet}
</SvelteMarkdown>
</div>
