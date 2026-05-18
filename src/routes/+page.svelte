<script lang="ts">
	import { resolve } from "$app/paths";
</script>

<!-- Hero-блок -->
<section class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-teal-900 to-emerald-900 text-white py-24 px-6">
	<div class="max-w-4xl mx-auto text-center">
		<h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-4">Chemicals</h1>
		<p class="text-xl md:text-2xl text-teal-100 mb-6">Цифровой помощник для изучения неорганической химии</p>
		<p class="text-slate-300 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
			Структурированные уроки, интерактивные справочники и система практических заданий. 
			Всё, что нужно для подготовки к экзаменам и глубокого понимания предмета — в одном месте, без лишней воды.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a href={resolve('/articles')} class="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition shadow-lg shadow-emerald-500/20 text-center">
				Начать обучение
			</a>
			<a href={resolve('/ref')} class="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition backdrop-blur-sm text-center">
				Открыть справочник
			</a>
		</div>
	</div>
</section>

<!-- Описание приложения и ключевые возможности -->
<section class="py-16 px-6 bg-white">
	<div class="max-w-5xl mx-auto">
		<h2 class="text-3xl font-bold text-gray-900 text-center mb-6">Что представляет собой приложение?</h2>
		<p class="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
			Это образовательная платформа, разработанная специально для школьников, студентов и всех, 
			кто хочет разобраться в неорганической химии без зубрёжки. Мы объединили теорию, практику 
			и наглядные материалы в единую систему, которая адаптируется под ваш темп обучения.
		</p>
		
		<div class="grid md:grid-cols-3 gap-8">
			<div class="p-6 rounded-2xl bg-slate-50 border border-slate-100 transition hover:shadow-md">
				<div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl mb-4">📖</div>
				<h3 class="text-xl font-semibold mb-2 text-gray-900">Понятная теория</h3>
				<p class="text-gray-500">Уроки разбиты на логические блоки с формулами, схемами и примерами. Материал подаётся последовательно, от простого к сложному.</p>
			</div>
			<div class="p-6 rounded-2xl bg-slate-50 border border-slate-100 transition hover:shadow-md">
				<div class="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xl mb-4">🧪</div>
				<h3 class="text-xl font-semibold mb-2 text-gray-900">Практика и тесты</h3>
				<p class="text-gray-500">Задания на балансировку уравнений, расчёты и ОВР с мгновенной проверкой, подсказками и разбором типичных ошибок.</p>
			</div>
			<div class="p-6 rounded-2xl bg-slate-50 border border-slate-100 transition hover:shadow-md">
				<div class="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xl mb-4"></div>
				<h3 class="text-xl font-semibold mb-2 text-gray-900">Отслеживание прогресса</h3>
				<p class="text-gray-500">Личный кабинет показывает статистику, достижения и помогает планировать повторение сложных тем без потери мотивации.</p>
			</div>
		</div>
	</div>
</section>

<!-- Краткая инструкция -->
<section class="py-16 px-6 bg-slate-50 border-t border-slate-200">
	<div class="max-w-4xl mx-auto">
		<h2 class="text-3xl font-bold text-gray-900 text-center mb-10">Как начать учиться?</h2>
		<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
			<div class="flex flex-col items-center text-center">
				<span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-teal-500 text-white font-bold mb-3 shadow-sm">1</span>
				<h4 class="font-semibold text-gray-900">Создайте аккаунт</h4>
				<p class="text-sm text-gray-500 mt-1">Быстрая регистрация за 30 секунд для сохранения прогресса</p>
			</div>
			<div class="flex flex-col items-center text-center">
				<span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-teal-500 text-white font-bold mb-3 shadow-sm">2</span>
				<h4 class="font-semibold text-gray-900">Выберите тему</h4>
				<p class="text-sm text-gray-500 mt-1">Откройте каталог уроков и начните с любого раздела курса</p>
			</div>
			<div class="flex flex-col items-center text-center">
				<span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-teal-500 text-white font-bold mb-3 shadow-sm">3</span>
				<h4 class="font-semibold text-gray-900">Изучите и проверьте</h4>
				<p class="text-sm text-gray-500 mt-1">Прочитайте материал и пройдите тест для закрепления знаний</p>
			</div>
			<div class="flex flex-col items-center text-center">
				<span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-teal-500 text-white font-bold mb-3 shadow-sm">4</span>
				<h4 class="font-semibold text-gray-900">Решайте задачи</h4>
				<p class="text-sm text-gray-500 mt-1">Переходите в практический модуль для отработки навыков</p>
			</div>
		</div>
	</div>
</section>


<footer class="bg-slate-50 border-t border-slate-200 py-8 text-center text-gray-400 text-sm">
	<p>© 2026 Chemicals. Образовательный проект для изучения неорганической химии.</p>
</footer>