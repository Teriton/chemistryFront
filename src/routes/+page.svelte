<script lang="ts">
    let count = $state(0);
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit /site goes here/ to read the documentation {count}</p>
<button onclick={()=>count++}>Click</button>
