<script lang="ts">
	import { page } from "$app/state";
	import ChemElements from "$lib/ref/chemElements.svelte";
	const number = page.url.searchParams.get("number")

</script>

<ChemElements number={number ? number: null} ></ChemElements>