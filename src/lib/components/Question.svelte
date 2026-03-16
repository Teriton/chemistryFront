<script lang="ts">
    let { question = "Вопрос не указан" } = $props();
</script>

<div class="test-question border p-4 rounded bg-blue-50">
    <p class="font-semibold">{question}</p>
    <button 
        class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onclick={() => alert(`Ответ на вопрос: ${question}`)}
    >
        Ответить
    </button>
</div>