<script lang="ts">
	import { QuestionManager, type Question, QuesionType } from "$lib/questions-manager";
	import { onMount } from "svelte";

    let { question = "Вопрос не указан", answers = "Ответы не указаны", questionMngr } = $props();
    let qMngr: QuestionManager | null = $state(null)
    let questionObj: Question = $state({question:"", options:[], correctAnswers:[], answerd: false, questionType: QuesionType.Question});
    let answerd = $state(false)
    onMount(()=>{
        qMngr  = questionMngr;
        if (qMngr) {
            questionObj = qMngr.addQuestion(question,answers)
        }
    });

    function checkQuestion(option: string){
        let isCorrect = questionObj.correctAnswers.find((value)=>{
            if (value == option) return true;
            else                 return false;
        });
        if (isCorrect) {
            answerd = true;
            qMngr?.answerQuestion(questionObj)
        }
    }
</script>

<div class="test-question border p-4 rounded bg-blue-50">
    <p class="font-semibold">{question}</p>
    <div class="grid grid-cols-2 justify-around">
        {#each questionObj.options as option (option)}
            <button 
                class="mt-2 px-4 py-2 m-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                onclick={() => checkQuestion(option)}
            >
                {option}
            </button>
        {/each}
    </div>
    {#if answerd}
        <h1>Верно</h1>  
    {/if} 
    
</div>