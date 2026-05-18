<script lang="ts">
	import { difficulties, taskTypes, type Difficulty, type Task, type TaskType } from "$lib/practice-manager";

	let selectedType = $state<TaskType| null>(null);
	let selectedDifficulty = $state<Difficulty>('basic');
	let currentTask = $state<Task | null>(null);
	let userAnswer = $state('');
	let feedback = $state<{ correct: boolean; message: string; showHint: boolean } | null>(null);
	let stats = $state({ solved: 0, total: 0, byType: {} as Record<TaskType, { correct: number; total: number }> });
	let showHint = $state(false);


	function generateTask(type: TaskType, diff: Difficulty): Task {
		const tasks: Record<TaskType, Task[]> = {
			equations: [
				{ id: 'eq1', type: 'equations',difficulty: diff, prompt: 'Расставьте коэффициенты: __Fe + __O₂ → __Fe₂O₃', placeholder: '1,2,3', correctAnswer: '4,3,2', hint: 'Начните с балансировки кислорода', explanation: '4Fe + 3O₂ → 2Fe₂O₃' },
				{ id: 'eq2', type: 'equations', difficulty: diff, prompt: 'Баланс: __Al + __HCl → __AlCl₃ + __H₂', placeholder: '1,2,3,4', correctAnswer: '2,6,2,3', hint: 'Уравняйте хлор сначала', explanation: '2Al + 6HCl → 2AlCl₃ + 3H₂' }
			],
			calculations: [
				{ id: 'calc1', type: 'calculations', difficulty: diff, prompt: 'Объём CO₂ (н.у.) при реакции 10 г CaCO₃ с избытком HCl. M(CaCO₃)=100 г/моль', placeholder: '1.23', unit: 'л', correctAnswer: 2.24, hint: 'n = m/M, затем V = n·Vm', explanation: 'n=0.1 моль → V=0.1·22.4=2.24 л' },
				{ id: 'calc2', type: 'calculations', difficulty: diff, prompt: 'Масса NaOH для нейтрализации 0.5 моль H₂SO₄', placeholder: '1', unit: 'г', correctAnswer: 40, hint: '2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O', explanation: 'n(NaOH)=1 моль → m=1·40=40 г' }
			],
			chains: [
				{ id: 'chain1', type: 'chains', difficulty: diff, prompt: 'Ca → ? → Ca(OH)₂ → ?', placeholder: 'H2O', correctAnswer: 'CaO, CaCO3', hint: 'Оксид → гидроксид → соль', explanation: 'Ca → CaO → Ca(OH)₂ → CaCO₃' },
				{ id: 'chain2', type: 'chains', difficulty: diff, prompt: 'S → ? → H₂SO₄ → ?', placeholder: 'H2O,HNO3', correctAnswer: 'SO2,Na2SO2', hint: 'Окисление серы', explanation: 'S → SO₂ → SO₃ → H₂SO₄ → Na₂SO₄' }
			],
			redox: [
				{ id: 'redox1', type: 'chains', difficulty: diff, prompt: 'Определите окислитель: Zn + CuSO₄ → ZnSO₄ + Cu', placeholder: 'Cu²⁺', correctAnswer: 'Cu²⁺', hint: 'Ищите элемент, который восстанавливается', explanation: 'Cu²⁺ + 2e⁻ → Cu⁰ (восстановление)' },
				{ id: 'redox2', type: 'chains', difficulty: diff, prompt: 'Степень окисления S в H₂SO₄', placeholder: '+1', correctAnswer: '+6', hint: 'Сумма степеней = 0', explanation: '2(+1) + x + 4(−2) = 0 → x = +6' }
			],
			classes: [
				{ id: 'class1', type: 'classes', difficulty: diff, prompt: 'К какому классу относится Na₂CO₃?', placeholder: '', correctAnswer: 'соль', hint: 'Металл + кислотный остаток', explanation: 'Соль (карбонат натрия)' },
				{ id: 'class2', type: 'classes', difficulty: diff, prompt: 'Формула гидроксида алюминия', placeholder: 'H2O', correctAnswer: 'Al(OH)3', hint: 'Al³⁺ + 3OH⁻', explanation: 'Al(OH)₃ — амфотерный гидроксид' }
			]
		};
		const pool = tasks[type];
		return structuredClone(pool[Math.floor(Math.random() * pool.length)]);
	}

	function startNewTask() {
		if (selectedType != null)
			currentTask = generateTask(selectedType, selectedDifficulty);
		userAnswer = '';
		feedback = null;
		showHint = false;
	}

	function normalizeAnswer(input: string): string {
		return input.toLowerCase().trim().replace(/\s+/g, '').replace(/,/g, ',');
	}

	function checkAnswer(): void {
		if (!currentTask) return;
		stats.total++;
		stats.byType[currentTask.type] = stats.byType[currentTask.type] || { correct: 0, total: 0 };
		stats.byType[currentTask.type].total++;

		const isCorrect = typeof currentTask.correctAnswer === 'number'
			? Math.abs(parseFloat(userAnswer) - currentTask.correctAnswer) < 0.01
			: normalizeAnswer(userAnswer) === normalizeAnswer(String(currentTask.correctAnswer));

		feedback = {
			correct: isCorrect,
			message: isCorrect ? '✓ Верно!' : `✗ Неверно. Правильно: ${currentTask.correctAnswer}${currentTask.unit || ''}`,
			showHint: selectedDifficulty !== 'advanced'
		};

		if (isCorrect) {
			stats.solved++;
			stats.byType[currentTask.type].correct++;
			// Update progress on server (simplified)
		}
	}

	function skipTask() {
		if (currentTask) {
			feedback = { correct: false, message: `Пропущено. Ответ: ${currentTask.correctAnswer}${currentTask.unit || ''}`, showHint: false };
		}
	}

</script>
<div class="max-w-3xl mx-auto p-4 md:p-6">
	<!-- Header -->
	<header class="text-center mb-8">
		<h1 class="text-3xl font-extrabold text-gray-900">Практический модуль</h1>
		<p class="text-gray-600 mt-2">Отработка навыков решения задач по неорганической химии</p>
	</header>
	{#if !currentTask}
		
	<!-- Settings -->
	<div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-6 space-y-5">
		<!-- Task Type -->
		<div>
			<label class="block text-sm font-medium text-gray-700 mb-2">Тип задания</label>
			<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
				{#each Object.entries(taskTypes) as [key, value](key)}
				<button
						onclick={() => selectedType = key as TaskType}
						class="p-3 rounded-xl border text-left transition-all {selectedType === key ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}"
					>
						<span class="text-xl mb-1 block">{value.icon}</span>
						<span class="text-xs font-medium text-gray-800">{value.label}</span>
					</button>
					{/each}
			</div>
		</div>
		
		<!-- Difficulty -->
		<div>
			<label class="block text-sm font-medium text-gray-700 mb-2">Уровень сложности</label>
			<div class="space-y-2">
				{#each ['basic', 'medium', 'advanced'] as level(level)}
				<label class="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors {selectedDifficulty === level ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}">
					<input type="radio" name="difficulty" bind:group={selectedDifficulty} value={level} class="w-4 h-4 text-blue-600" />
					<div class="flex-1">
						<p class="font-medium text-gray-900">{difficulties[level as Difficulty].label}</p>
						<p class="text-xs text-gray-500">Подсказки: {difficulties[level as Difficulty].hints} • Оценка: {difficulties[level as Difficulty].scoring}</p>
						</div>
					</label>
				{/each}
			</div>
			<button onclick={()=>{}} class="px-6  py-2.5 my-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors">
				Приступить к изучению химии с помощью задач
			</button>
		</div>
	</div>
	{/if}

	<!-- Task Card -->
	{#if currentTask}
		<div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
			<div class="flex items-center gap-2 mb-4">
				<span class="text-2xl">{taskTypes[currentTask.type].icon}</span>
				<h2 class="text-lg font-semibold text-gray-900">{taskTypes[currentTask.type].label}</h2>
				<span class="ml-auto text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">
					{difficulties[currentTask.difficulty].label}
				</span>
			</div>

			<p class="text-gray-800 mb-5 leading-relaxed whitespace-pre-line">{currentTask.prompt}</p>

			<!-- Answer Input -->
			<div class="flex gap-3 mb-4">
				<input
					type="text"
					bind:value={userAnswer}
					placeholder={currentTask.placeholder}
					class="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-mono"
					disabled={!!feedback}
				/>
				{#if currentTask.unit}
					<span class="flex items-center px-3 bg-gray-100 rounded-xl text-gray-600 font-medium">{currentTask.unit}</span>
				{/if}
			</div>

			<!-- Actions -->
			<div class="flex flex-wrap gap-3">
				{#if !feedback}
					<button onclick={checkAnswer} class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors">
						Проверить
					</button>
					<button onclick={skipTask} class="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors">
						Пропустить
					</button>
					{#if selectedDifficulty !== 'advanced'}
						<button onclick={() => showHint = !showHint} class="px-4 py-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors text-sm font-medium">
							{showHint ? 'Скрыть подсказку' : '💡 Подсказка'}
						</button>
					{/if}
				{:else}
					<button onclick={startNewTask} class="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors">
						Следующее задание →
					</button>
				{/if}
			</div>

			<!-- Hint -->
			{#if showHint && currentTask.hint && !feedback}
				<div class="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl">
					<p class="text-sm text-yellow-800"><strong>Подсказка:</strong> {currentTask.hint}</p>
				</div>
			{/if}

			<!-- Feedback -->
			{#if feedback}
				<div class="mt-5 p-4 rounded-xl {feedback.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}">
					<p class="font-medium {feedback.correct ? 'text-green-800' : 'text-red-800'}">{feedback.message}</p>
					{#if currentTask.explanation && !feedback.correct}
						<p class="text-sm text-gray-600 mt-2"><strong>Решение:</strong> {currentTask.explanation}</p>
					{/if}
				</div>
			{/if}
		</div>
	{/if}

	<!-- Statistics -->
	<div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
		<h3 class="font-semibold text-gray-900 mb-4">Ваш прогресс</h3>
		<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
			<div class="p-3 bg-gray-50 rounded-xl">
				<p class="text-2xl font-bold text-blue-600">{stats.solved}/{stats.total}</p>
				<p class="text-xs text-gray-500">Решено</p>
			</div>
			<div class="p-3 bg-gray-50 rounded-xl">
				<p class="text-2xl font-bold text-green-600">{stats.total > 0 ? Math.round(stats.solved / stats.total * 100) : 0}%</p>
				<p class="text-xs text-gray-500">Точность</p>
			</div>
			{#each ['equations', 'calculations'] as t (t)}
				{#if stats.byType[t as TaskType]}
					<div class="p-3 bg-gray-50 rounded-xl">
						<p class="text-lg font-bold text-gray-900">{taskTypes[t as TaskType].icon}</p>
						<p class="text-xs text-gray-500">
							{stats.byType[t as TaskType].correct}/{stats.byType[t as TaskType].total}
						</p>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>