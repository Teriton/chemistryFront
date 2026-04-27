<script lang="ts">
	import type { ChemElement } from '$lib/data/elements.js';

	let { data } = $props<{ data: { elem: ChemElement | null } }>();

	let elem = $derived<ChemElement | null>(data.elem);

	const formatCategory = (cat: string) =>
		cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
</script>

<div class="max-w-4xl mx-auto p-6 space-y-8">
	{#if elem}
		<!-- Header -->
		<header class="text-center border-b border-gray-200 pb-6">
			<h1 class="text-4xl font-extrabold text-gray-900 tracking-tight">{elem.name}</h1>
			<div class="mt-3 flex items-center justify-center gap-6">
				<span class="text-6xl font-mono font-bold text-blue-600">{elem.symbol}</span>
				<span class="text-xl text-gray-500 font-medium">Atomic Number: {elem.number}</span>
			</div>
		</header>

		<!-- Properties Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<section class="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-3">
				<h2 class="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">General Info</h2>
				<div class="space-y-2 text-gray-700">
					<p><span class="font-medium">Category:</span> {formatCategory(elem.category)}</p>
					<p><span class="font-medium">Period / Group:</span> {elem.period} / {elem.group}</p>
					<p><span class="font-medium">Phase at STP:</span> <span class="capitalize">{elem.phaseAtSTP}</span></p>
					<p><span class="font-medium">Atomic Mass:</span> {elem.mass} u</p>
				</div>
			</section>

			<section class="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-3">
				<h2 class="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Physical Data</h2>
				<div class="space-y-2 text-gray-700">
					<p><span class="font-medium">Electron Config:</span> <code class="bg-gray-200 px-1.5 py-0.5 rounded text-sm font-mono">{elem.electronConfiguration}</code></p>
					<p><span class="font-medium">Density:</span> {elem.density !== null ? `${elem.density} g/cm³` : 'Unknown'}</p>
					<p><span class="font-medium">Melting Point:</span> {elem.meltingPoint !== null ? `${elem.meltingPoint} K` : 'Unknown'}</p>
					<p><span class="font-medium">Boiling Point:</span> {elem.boilingPoint !== null ? `${elem.boilingPoint} K` : 'Unknown'}</p>
				</div>
			</section>
		</div>

		<!-- Discovery & History -->
		<section class="space-y-4">
			<div class="bg-gray-50 p-5 rounded-xl border border-gray-200">
				<h2 class="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-2">Discovery</h2>
				<p class="text-gray-700"><span class="font-medium">Year:</span> {elem.yearOfDiscovery}</p>
			</div>
			<div class="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl">
				<h2 class="text-lg font-semibold text-blue-800 mb-2">History</h2>
				<p class="text-gray-700 leading-relaxed">{elem.history}</p>
			</div>
		</section>
	{:else}
		<div class="flex flex-col items-center justify-center py-20 text-center">
			<p class="text-2xl font-semibold text-gray-600">Element not found</p>
			<p class="text-gray-400 mt-2">The requested element data is unavailable.</p>
		</div>
	{/if}
</div>