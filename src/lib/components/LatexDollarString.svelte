<script lang="ts">
	import katex from 'katex';

	/** Строка вида «текст $...$ ещё $...$» — фрагменты вне $ выводятся как текст, внутри — KaTeX. */
	let { source }: { source: string } = $props();

	type Piece = { kind: 'text'; v: string } | { kind: 'katex'; v: string };

	const pieces = $derived.by((): Piece[] => {
		const s = source;
		const out: Piece[] = [];
		let i = 0;
		while (i < s.length) {
			const a = s.indexOf('$', i);
			if (a === -1) {
				out.push({ kind: 'text', v: s.slice(i) });
				break;
			}
			if (a > i) out.push({ kind: 'text', v: s.slice(i, a) });
			const b = s.indexOf('$', a + 1);
			if (b === -1) {
				out.push({ kind: 'text', v: s.slice(a) });
				break;
			}
			out.push({ kind: 'katex', v: s.slice(a + 1, b) });
			i = b + 1;
		}
		return out;
	});
</script>

<span class="inline-flex flex-wrap items-baseline gap-x-1 gap-y-1">
	{#each pieces as p, i (i)}
		{#if p.kind === 'text'}
			<span>{p.v}</span>
		{:else}
			<span class="inline-block align-middle">{@html katex.renderToString(p.v.trim(), { throwOnError: false })}</span>
		{/if}
	{/each}
</span>
