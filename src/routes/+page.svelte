<script lang="ts">
	import { resolve } from "$app/paths";
</script>

<div class="mx-auto w-full max-w-6xl pb-12">
	<header class="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-12 text-center text-white shadow-xl">
		<h1 class="text-4xl font-extrabold tracking-tight md:text-5xl">Изучай химию без перегруза</h1>
		<p class="mx-auto mt-4 max-w-3xl text-lg text-emerald-100">
			Chemicals — учебное приложение по неорганической химии: простые объяснения, справочные таблицы и
			тренировочные вопросы в конце каждой статьи. Начни учиться сегодня!
		</p>
	</header>

	<main class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
		<a
			href={resolve("/ref/periodic-table")}
			class="group block rounded-2xl border border-teal-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
		>
			<div class="flex items-center gap-4">
				<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-xl font-bold text-teal-600">
					⚛
				</div>
				<div>
					<h2 class="text-xl font-semibold text-gray-900 transition-colors group-hover:text-teal-600">Периодическая таблица</h2>
					<p class="mt-1 text-gray-500">Все элементы с ключевыми свойствами и быстрым переходом к карточке элемента.</p>
				</div>
			</div>
		</a>

		<a
			href={resolve("/ref/solubility-table")}
			class="group block rounded-2xl border border-cyan-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
		>
			<div class="flex items-center gap-4">
				<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-xl font-bold text-cyan-600">
					💧
				</div>
				<div>
					<h2 class="text-xl font-semibold text-gray-900 transition-colors group-hover:text-cyan-600">Таблица растворимости</h2>
					<p class="mt-1 text-gray-500">Быстро находи растворимость солей и смотри пояснения по выбранной ячейке.</p>
				</div>
			</div>
		</a>
	</main>

	<section class="mt-8 grid grid-cols-1 gap-4 rounded-2xl bg-white p-6 shadow-sm sm:grid-cols-3 text-center">
		<div>
			<p class="text-3xl font-bold text-teal-600">118</p>
			<p class="text-sm text-gray-500">Химических элементов</p>
		</div>
		<div>
			<p class="text-3xl font-bold text-teal-600">100+</p>
			<p class="text-sm text-gray-500">Увлекательных уроков</p>
		</div>
		<div>
			<p class="text-3xl font-bold text-teal-600">10 минут</p>
			<p class="text-sm text-gray-500">В день, чтобы улучшить свои результаты</p>
		</div>
	</section>
	<footer class="py-6 text-center text-sm text-gray-500">
	</footer>
</div>