<script lang="ts">
	import { QuestionManager, type Question , QuesionType} from "$lib/questions-manager";
	import SvelteMarkdown from "@humanspeak/svelte-markdown";
	import markedKatex from "marked-katex-extension";
	import { onMount } from "svelte";

    let { f= "Формула не указана", answers = "Ответы не указаны" , renderers, questionMngr, onRegister } = $props();
    let qMngr: QuestionManager | null = $state(null)
    let equationObj: Question = $state({question:"", options:[], correctAnswers:[], answerd: false, questionType: QuesionType.Equation});
	let values = $state([])
 

    onMount(()=>{
        qMngr  = questionMngr;
		if (qMngr) {
            equationObj = qMngr.addEquation(f,answers)
            onRegister?.()
        }
    });
    $effect(() => {
		qMngr?.setEquationAnswers(equationObj.question, values as string[]);
	});
    
</script>
<div class="w-full grid justify-center">
	<SvelteMarkdown
		source={f}
		{renderers}
	    extensions={[markedKatex({ throwOnError: false })]}
	>
	{#snippet em(props)}
		{@const text = String((props as { text?: string }).text ?? '')}
		<input placeholder={text} class="border-2 text-right" bind:value={values[parseInt(text,0)]} size=1/>
	{/snippet}
	</SvelteMarkdown>
</div>
