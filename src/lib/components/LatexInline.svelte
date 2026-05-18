<script lang="ts">
	import katex from 'katex';

	let { latex, displayMode = false }: { latex: string; displayMode?: boolean } = $props();

	const html = $derived(
		katex.renderToString(latex.trim(), { throwOnError: false, displayMode })
	);
</script>

<span class="inline-block align-middle">{@html html}</span>
