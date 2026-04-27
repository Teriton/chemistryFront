<script lang="ts">
	import { resolve } from "$app/paths";
</script>

<div class="min-h-screen bg-linear-to-b from-blue-50 to-white">
	<!-- Hero -->
	<header class="py-12 px-4 text-center">
		<h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
			Chemistry Reference
		</h1>
		<p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
			Interactive periodic table, solubility charts, and detailed element data for students and professionals.
		</p>
	</header>

	<!-- Quick Links -->
	<main class="max-w-5xl mx-auto px-4 pb-16">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<a
				href={resolve("/ref/periodic-table")}
				class="group block p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all"
			>
				<div class="flex items-center gap-4">
					<div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
						⚛
					</div>
					<div>
						<h2 class="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
							Periodic Table
						</h2>
						<p class="text-gray-500 mt-1">Explore all 118 elements with detailed properties</p>
					</div>
				</div>
			</a>

			<a
				href={resolve("/ref/solubility-table")}
				class="group block p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all"
			>
				<div class="flex items-center gap-4">
					<div class="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xl">
						💧
					</div>
					<div>
						<h2 class="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
							Solubility Table
						</h2>
						<p class="text-gray-500 mt-1">Quick reference for compound solubility in water</p>
					</div>
				</div>
			</a>
		</div>

		<!-- Features -->
		<section class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
			<div class="p-4">
				<p class="text-3xl font-bold text-blue-600">118</p>
				<p class="text-gray-500 text-sm">Elements</p>
			</div>
			<div class="p-4">
				<p class="text-3xl font-bold text-blue-600">24/7</p>
				<p class="text-gray-500 text-sm">Offline Access</p>
			</div>
			<div class="p-4">
				<p class="text-3xl font-bold text-blue-600">RU/EN</p>
				<p class="text-gray-500 text-sm">Languages</p>
			</div>
		</section>
	</main>

	<!-- Footer -->
	<footer class="border-t border-gray-200 py-6 text-center text-gray-400 text-sm">
		<p>Built with Svelte 5 + TailwindCSS • <a href="https://github.com/Teriton/chemistryFront" class="text-blue-500 hover:underline" target="_blank">GitHub</a></p>
	</footer>
</div>