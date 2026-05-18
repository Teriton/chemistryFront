<script lang="ts">
	const series = [
		'Li',
		'K',
		'Ba',
		'Ca',
		'Na',
		'Mg',
		'Al',
		'Mn',
		'Zn',
		'Cr',
		'Fe',
		'Cd',
		'Co',
		'Ni',
		'Sn',
		'Pb',
		'(H)',
		'Cu',
		'Hg',
		'Ag',
		'Pt',
		'Au'
	];
</script>

<div class="mx-auto max-w-2xl space-y-8 px-4 py-10">
	<h1 class="text-center text-3xl font-bold text-slate-900">Ряд активности металлов</h1>
	<p class="leading-relaxed text-slate-600">
		Чем выше металл в ряду, тем сильнее он как восстановитель: легче отдаёт электроны, активнее вступает в реакции
		с водой, кислотами, солями менее активных металлов. Водород <span class="font-mono">(H)</span> - условная граница:
		металлы выше него вытесняют H⁺ из разбавленных кислот (при типичных школьных условиях), ниже - обычно нет.
	</p>

	<ol class="space-y-2 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6">
		{#each series as sym, i (sym)}
			<li
				class="flex items-center justify-between rounded-lg border border-emerald-100 bg-white px-4 py-2 font-mono text-lg"
			>
				<span class="text-slate-500">{i + 1}.</span>
				<span class="font-semibold text-emerald-700">{sym}</span>
				<span class="text-xs text-slate-400"></span>
			</li>
		{/each}
	</ol>

</div>
