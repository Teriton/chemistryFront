<script lang="ts">
	import { QuestionManager, type Question , QuesionType} from "$lib/questions-manager";
	import SvelteMarkdown from "@humanspeak/svelte-markdown";
	import markedKatex from "marked-katex-extension";
	import { onMount } from "svelte";

    let { f= "Формула не указана", answers = "Ответы не указаны" , renderers, questionMngr } = $props();
    let qMngr: QuestionManager | null = $state(null)
    let equationObj: Question = $state({question:"", options:[], correctAnswers:[], answerd: false, questionType: QuesionType.Equation});
    let answerd = $state(false)
	let values = $state([])
 

    onMount(()=>{
        qMngr  = questionMngr;
		if (qMngr) {
            equationObj = qMngr.addEquation(f,answers)
        }
    });
	function checkEquation(inputs: string[]){
		const areEqual = inputs.length === equationObj.correctAnswers.length && inputs.every((value, index) => value === equationObj.correctAnswers[index]);
		console.log(values)
		if (areEqual){
			answerd = true;
            qMngr?.answerEquation(equationObj)
			return 0
		}
    }
    
</script>
<div class="w-full  grid justify-center ">
	<SvelteMarkdown
		source={f}
		{renderers}
	    extensions={[markedKatex({ throwOnError: false })]}
	>
	{#snippet em({text})}
		<input placeholder={text} class="border-2 text-right" bind:value={values[parseInt(text,0)]} size=1/>
	{/snippet}
	</SvelteMarkdown>
	<button
		class="mt-2 px-4 py-2 m-4 bg-blue-500 text-white rounded hover:bg-blue-600"
	 	onclick={()=>{checkEquation(values)}}
		>Answer</button>
    {#if answerd}
           <h1>Верно</h1>  
    {/if} 
</div>
