<script lang="ts">
	import { onMount } from 'svelte';

	// Типы и состояние
	type ModelType = 'dalton' | 'thomson' | 'rutherford' | 'bohr' | 'schrodinger';
	let currentModel: ModelType = 'dalton';

	// === МОДЕЛЬ ДАЛЬТОНА ===
	let rotationDalton = 0;

	// === МОДЕЛЬ ТОМСОНА ===
	type Electron = { x: number; y: number; dx: number; dy: number };
	const thomsonSize = 320;
	const thomsonCenter = thomsonSize / 2;
	const thomsonRadius = 95;
	let rotationThomson = 0;
	let electronsThomson: Electron[] = [
		{ x: 120, y: 110, dx: 0.25, dy: 0.18 },
		{ x: 190, y: 95, dx: -0.18, dy: 0.22 },
		{ x: 220, y: 160, dx: -0.2, dy: -0.15 },
		{ x: 160, y: 215, dx: 0.16, dy: -0.2 },
		{ x: 105, y: 185, dx: 0.22, dy: -0.12 }
	];

	// === МОДЕЛЬ РЕЗЕРФОРДА ===
	let angle1 = 0, angle2 = 120, angle3 = 240;
	function ellipsePosition(angle: number, rx: number, ry: number, rotation: number, center = 180) {
		const rad = (angle * Math.PI) / 180;
		const rot = (rotation * Math.PI) / 180;
		const ex = Math.cos(rad) * rx;
		const ey = Math.sin(rad) * ry;
		return {
			x: center + ex * Math.cos(rot) - ey * Math.sin(rot),
			y: center + ex * Math.sin(rot) + ey * Math.cos(rot)
		};
	}
	$: e1 = ellipsePosition(angle1, 70, 70, 0);
	$: e2 = ellipsePosition(angle2, 105, 82, 22);
	$: e3 = ellipsePosition(angle3, 140, 110, -28);

	// === МОДЕЛЬ БОРА ===
	type BohrElectron = { shell: number; angle: number; speed: number; delay: number; active: boolean };
	const bohrCenter = 200;
	const shellRadius = { 1: 55, 2: 100, 3: 145 };
	let electronsBohr: BohrElectron[] = [
		{ shell: 1, angle: 0, speed: 1.4, delay: 300, active: false },
		{ shell: 1, angle: 180, speed: 1.4, delay: 900, active: false },
		{ shell: 2, angle: 0, speed: 0.9, delay: 1700, active: false },
		{ shell: 2, angle: 60, speed: 0.9, delay: 2300, active: false },
		{ shell: 2, angle: 120, speed: 0.9, delay: 2900, active: false },
		{ shell: 2, angle: 180, speed: 0.9, delay: 3500, active: false },
		{ shell: 2, angle: 240, speed: 0.9, delay: 4100, active: false },
		{ shell: 2, angle: 300, speed: 0.9, delay: 4700, active: false }
	];
	function orbitPosition(angle: number, radius: number) {
		const rad = (angle * Math.PI) / 180;
		return {
			x: bohrCenter + Math.cos(rad) * radius,
			y: bohrCenter + Math.sin(rad) * radius
		};
	}

	// === МОДЕЛЬ ШРЁДИНГЕРА ===
	type Particle = { x: number; y: number; r: number; o: number; dx: number; dy: number };
	const schrodingerCenter = 200;
	let rotationSchrodinger = 0;
	let particles: Particle[] = Array.from({ length: 42 }, () => {
		const angle = Math.random() * Math.PI * 2;
		const radius = 40 + Math.random() * 90;
		return {
			x: schrodingerCenter + Math.cos(angle) * radius,
			y: schrodingerCenter + Math.sin(angle) * radius,
			r: 1 + Math.random() * 3,
			o: 0.15 + Math.random() * 0.45,
			dx: (Math.random() - 0.5) * 0.25,
			dy: (Math.random() - 0.5) * 0.25
		};
	});

	// Инициализация анимаций
	onMount(() => {
		// Dalton
		const daltonInterval = setInterval(() => { rotationDalton += 0.2; }, 16);

		// Thomson
		const thomsonInterval = setInterval(() => {
			rotationThomson += 0.08;
			electronsThomson = electronsThomson.map((e) => {
				let nx = e.x + e.dx, ny = e.y + e.dy;
				const dist = Math.hypot(nx - thomsonCenter, ny - thomsonCenter);
				if (dist > thomsonRadius - 10) { e.dx *= -1; e.dy *= -1; nx = e.x + e.dx; ny = e.y + e.dy; }
				return { ...e, x: nx, y: ny };
			});
		}, 16);

		// Rutherford
		const rutherfordInterval = setInterval(() => {
			angle1 += 0.8; angle2 -= 0.55; angle3 += 0.35;
		}, 16);

		// Bohr
		const bohrStart = performance.now();
		const bohrInterval = setInterval(() => {
			const elapsed = performance.now() - bohrStart;
			electronsBohr = electronsBohr.map((e) => ({
				...e, active: elapsed > e.delay, angle: e.angle + e.speed
			}));
		}, 16);

		// Schrödinger
		const schrodingerInterval = setInterval(() => {
			rotationSchrodinger += 0.08;
			particles = particles.map((p) => {
				let nx = p.x + p.dx, ny = p.y + p.dy;
				const dist = Math.hypot(nx - schrodingerCenter, ny - schrodingerCenter);
				if (dist > 130 || dist < 35) { p.dx *= -1; p.dy *= -1; nx = p.x + p.dx; ny = p.y + p.dy; }
				return { ...p, x: nx, y: ny };
			});
		}, 16);

		return () => {
			clearInterval(daltonInterval);
			clearInterval(thomsonInterval);
			clearInterval(rutherfordInterval);
			clearInterval(bohrInterval);
			clearInterval(schrodingerInterval);
		};
	});

	// Данные моделей для навигации
	const models = [
		{ id: 'dalton' as const, name: 'Дальтон', year: '1803', color: 'teal' },
		{ id: 'thomson' as const, name: 'Томсон', year: '1904', color: 'amber' },
		{ id: 'rutherford' as const, name: 'Резерфорд', year: '1911', color: 'sky' },
		{ id: 'bohr' as const, name: 'Бор', year: '1913', color: 'indigo' },
		{ id: 'schrodinger' as const, name: 'Шрёдингер', year: '1926', color: 'violet' }
	] as const;
</script>

<div class="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
	<!-- Заголовок страницы -->
	<header class="max-w-5xl mx-auto mb-8 text-center">
		<h1 class="text-4xl font-bold text-slate-800 mb-3">
			Эволюция моделей строения атома
		</h1>
		<p class="text-lg text-slate-600 max-w-3xl mx-auto">
			Исследуйте исторические представления о структуре атома — 
			от неделимой частицы до современной квантовомеханической модели
		</p>
	</header>

	<!-- Навигация по моделям -->
	<nav class="max-w-5xl mx-auto mb-8">
		<div class="flex flex-wrap justify-center gap-2 sm:gap-3">
			{#each models as model}
				<button
					on:click={() => currentModel = model.id}
					class="px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 bg-white text-slate-700 border-2"
					class:border-emerald-500={currentModel === model.id}
					class:border-slate-200={currentModel !== model.id}
					class:hover:border-slate-300={currentModel !== model.id}
				>
					<span class="block">{model.name}</span>
					<span class="block text-xs opacity-80">{model.year}</span>
				</button>
			{/each}
		</div>
	</nav>

	<!-- Контент: отображается только выбранная модель -->
	<main class="max-w-5xl mx-auto">
		
		{#if currentModel === 'dalton'}
			<!-- === МОДЕЛЬ ДАЛЬТОНА === -->
			<div class="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6 sm:p-8 shadow-sm">
				<h2 class="mb-3 text-2xl font-bold text-slate-800">Модель Дальтона (1803)</h2>
				<p class="mb-4 text-slate-600 leading-relaxed">
					Джон Дальтон предложил первую научно обоснованную атомистическую теорию. 
					Согласно его представлениям, атом — это мельчайшая, <strong>неделимая и неразрушимая частица</strong> 
					материи, не имеющая внутреннего строения. Все атомы одного химического элемента 
					идентичны по массе и свойствам, атомы разных элементов отличаются друг от друга. 
					Химические реакции представлялись как перегруппировка этих «твёрдых шариков».
				</p>
				<p class="mb-6 text-slate-600 leading-relaxed">
					<strong>Историческое значение:</strong> модель Дальтона заложила основы стехиометрии 
					и объяснила законы сохранения массы, постоянства состава и кратных отношений. 
					Однако она не могла объяснить явления электролиза, существование изотопов 
					или природу химической связи, что потребовало дальнейшего развития теории.
				</p>

				<div class="relative flex items-center justify-center my-6">
					<svg width="320" height="320" viewBox="0 0 320 320" class="overflow-visible">
						<ellipse cx="160" cy="275" rx="70" ry="18" fill="rgba(0,0,0,0.08)" />
						<circle cx="160" cy="160" r="92" fill="rgba(20,184,166,0.08)" />
						<g style={`transform-origin: 160px 160px; transform: rotate(${rotationDalton}deg);`}>
							<circle cx="160" cy="160" r="80" fill="url(#daltonGradient)" stroke="#0f766e" stroke-width="4" />
							<ellipse cx="130" cy="125" rx="24" ry="16" fill="rgba(255,255,255,0.35)" transform="rotate(-25 130 125)" />
							<path d="M95 165 Q160 120 225 165" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="4" />
							<path d="M105 195 Q160 230 215 195" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="3" />
						</g>
						<defs>
							<radialGradient id="daltonGradient">
								<stop offset="0%" stop-color="#5eead4" />
								<stop offset="65%" stop-color="#14b8a6" />
								<stop offset="100%" stop-color="#0f766e" />
							</radialGradient>
						</defs>
					</svg>
					<div class="absolute bottom-2 rounded-full border border-teal-200 bg-white/90 px-4 py-1 text-sm font-medium text-teal-800 shadow">
						Неделимый атом
					</div>
				</div>

				<div class="mt-6 grid gap-3 sm:grid-cols-3">
					<div class="rounded-2xl bg-white px-4 py-3 shadow-sm">
						<div class="text-sm font-semibold text-slate-800">Без внутреннего строения</div>
						<div class="mt-1 text-xs text-slate-500">Атом — однородная твёрдая частица</div>
					</div>
					<div class="rounded-2xl bg-white px-4 py-3 shadow-sm">
						<div class="text-sm font-semibold text-slate-800">Идентичность атомов</div>
						<div class="mt-1 text-xs text-slate-500">Все атомы элемента одинаковы</div>
					</div>
					<div class="rounded-2xl bg-white px-4 py-3 shadow-sm">
						<div class="text-sm font-semibold text-slate-800">Ограничения</div>
						<div class="mt-1 text-xs text-slate-500">Не объясняет электрические явления</div>
					</div>
				</div>
			</div>
		{/if}

		{#if currentModel === 'thomson'}
			<!-- === МОДЕЛЬ ТОМСОНА === -->
			<div class="rounded-3xl border border-slate-200 bg-gradient-to-br from-amber-50 to-orange-100 p-6 sm:p-8 shadow-sm">
				<h2 class="mb-3 text-2xl font-bold text-slate-800">Модель Томсона (1904)</h2>
				<p class="mb-4 text-slate-600 leading-relaxed">
					После открытия электрона Дж. Дж. Томсоном (1897) стало ясно, что атом имеет 
					внутреннюю структуру. Томсон предложил модель, в которой атом представляет собой 
					<strong>положительно заряженную сферу</strong>, в объёме которой равномерно 
					распределён положительный заряд, а отрицательно заряженные электроны 
					вкраплены в неё, как изюм в пудинге.
				</p>
				<p class="mb-6 text-slate-600 leading-relaxed">
					<strong>Ключевые положения:</strong> атом электрически нейтрален в целом; 
					электроны могут колебаться вокруг положений равновесия, что объясняло 
					испускание света. Модель успешно описывала некоторые оптические свойства, 
					но не могла объяснить результаты опыта Резерфорда по рассеянию α-частиц, 
					где часть частиц отклонялась на большие углы, что указывало на 
					существование компактного положительно заряженного ядра.
				</p>

				<div class="relative flex items-center justify-center my-6">
					<svg width={thomsonSize} height={thomsonSize} viewBox={`0 0 ${thomsonSize} ${thomsonSize}`} class="overflow-visible">
						<ellipse cx={thomsonCenter} cy="280" rx="72" ry="18" fill="rgba(0,0,0,0.08)" />
						<circle cx={thomsonCenter} cy={thomsonCenter} r="108" fill="rgba(251,191,36,0.10)" />
						<g style={`transform-origin:${thomsonCenter}px ${thomsonCenter}px; transform: rotate(${rotationThomson}deg);`}>
							<circle cx={thomsonCenter} cy={thomsonCenter} r={thomsonRadius} fill="url(#thomsonGradient)" stroke="#d97706" stroke-width="4" />
							<path d="M80 160 Q160 120 240 160" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="5" />
							<path d="M95 205 Q160 235 225 205" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="4" />
							<ellipse cx="128" cy="120" rx="26" ry="18" fill="rgba(255,255,255,0.30)" transform="rotate(-25 128 120)" />
						</g>
						{#each electronsThomson as e}
							<g>
								<circle cx={e.x} cy={e.y} r="12" fill="rgba(59,130,246,0.18)" />
								<circle cx={e.x} cy={e.y} r="6" fill="#2563eb" stroke="white" stroke-width="2" />
								<text x={e.x} y={e.y + 3} text-anchor="middle" font-size="8" fill="white" font-weight="bold">−</text>
							</g>
						{/each}
						<defs>
							<radialGradient id="thomsonGradient">
								<stop offset="0%" stop-color="#fde68a" />
								<stop offset="70%" stop-color="#f59e0b" />
								<stop offset="100%" stop-color="#d97706" />
							</radialGradient>
						</defs>
					</svg>
					<div class="absolute bottom-2 rounded-full border border-amber-200 bg-white/90 px-4 py-1 text-sm font-medium text-amber-800 shadow">
						«Пудинг с изюмом»
					</div>
				</div>

				<div class="mt-6 grid gap-3 sm:grid-cols-3">
					<div class="rounded-2xl bg-white px-4 py-3 shadow-sm">
						<div class="text-sm font-semibold text-slate-800">Положительная «сфера»</div>
						<div class="mt-1 text-xs text-slate-500">Заряд распределён по всему объёму</div>
					</div>
					<div class="rounded-2xl bg-white px-4 py-3 shadow-sm">
						<div class="text-sm font-semibold text-slate-800">Электроны в объёме</div>
						<div class="mt-1 text-xs text-slate-500">Отрицательные частицы встроены в атом</div>
					</div>
					<div class="rounded-2xl bg-white px-4 py-3 shadow-sm">
						<div class="text-sm font-semibold text-slate-800">Недостаток</div>
						<div class="mt-1 text-xs text-slate-500">Не объясняет рассеяние α-частиц</div>
					</div>
				</div>
			</div>
		{/if}

		{#if currentModel === 'rutherford'}
			<!-- === МОДЕЛЬ РЕЗЕРФОРДА === -->
			<div class="rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-50 to-cyan-100 p-6 sm:p-8 shadow-sm">
				<h2 class="mb-3 text-2xl font-bold text-slate-800">Модель Резерфорда (1911)</h2>
				<p class="mb-4 text-slate-600 leading-relaxed">
					На основе знаменитого опыта с рассеянием α-частиц на золотой фольге 
					Эрнест Резерфорд предложил <strong>ядерную (планетарную) модель атома</strong>. 
					Согласно ей, почти вся масса и весь положительный заряд атома 
					сосредоточены в чрезвычайно малом объёме в центре — <strong>атомном ядре</strong>, 
					вокруг которого по орбитам движутся электроны, подобно планетам вокруг Солнца.
				</p>
				<p class="mb-6 text-slate-600 leading-relaxed">
					<strong>Революционные выводы:</strong> атом в основном состоит из пустого пространства; 
					размер ядра (~10⁻¹⁵ м) в 100 000 раз меньше размера атома (~10⁻¹⁰ м). 
					Однако классическая электродинамика предсказывала, что движущийся по орбите 
					электрон должен непрерывно излучать энергию и за доли секунды упасть на ядро, 
					что противоречило стабильности атомов. Это противоречие разрешил Нильс Бор.
				</p>

				<div class="relative flex items-center justify-center my-6">
					<svg width="360" height="360" viewBox="0 0 360 360" class="overflow-visible">
						<circle cx="180" cy="180" r="150" fill="rgba(14,165,233,0.05)" />
						<circle cx="180" cy="180" r="70" fill="none" stroke="rgba(14,165,233,0.35)" stroke-width="2" />
						<ellipse cx="180" cy="180" rx="105" ry="82" fill="none" stroke="rgba(59,130,246,0.28)" stroke-width="2" transform="rotate(22 180 180)" />
						<ellipse cx="180" cy="180" rx="140" ry="110" fill="none" stroke="rgba(6,182,212,0.22)" stroke-width="2" transform="rotate(-28 180 180)" />
						<circle cx="180" cy="180" r="32" fill="rgba(239,68,68,0.18)" />
						<circle cx="180" cy="180" r="20" fill="url(#nucleusGradient)" stroke="#991b1b" stroke-width="3" />
						<circle cx="172" cy="174" r="4" fill="#fca5a5" />
						<circle cx="188" cy="172" r="4" fill="#fecaca" />
						<circle cx="176" cy="188" r="4" fill="#f87171" />
						<circle cx="190" cy="188" r="4" fill="#fca5a5" />
						<g><circle cx={e1.x} cy={e1.y} r="12" fill="rgba(59,130,246,0.16)" /><circle cx={e1.x} cy={e1.y} r="6" fill="#2563eb" stroke="white" stroke-width="2" /></g>
						<g><circle cx={e2.x} cy={e2.y} r="12" fill="rgba(14,165,233,0.16)" /><circle cx={e2.x} cy={e2.y} r="6" fill="#0ea5e9" stroke="white" stroke-width="2" /></g>
						<g><circle cx={e3.x} cy={e3.y} r="12" fill="rgba(6,182,212,0.16)" /><circle cx={e3.x} cy={e3.y} r="6" fill="#06b6d4" stroke="white" stroke-width="2" /></g>
						<defs>
							<radialGradient id="nucleusGradient">
								<stop offset="0%" stop-color="#f87171" />
								<stop offset="70%" stop-color="#dc2626" />
								<stop offset="100%" stop-color="#991b1b" />
							</radialGradient>
						</defs>
					</svg>
					<div class="absolute bottom-1 rounded-full border border-sky-200 bg-white/90 px-4 py-1 text-sm font-medium text-sky-800 shadow">
						Ядерная модель атома
					</div>
				</div>

				<div class="mt-6 grid gap-3 sm:grid-cols-3">
					<div class="rounded-2xl bg-white px-4 py-3 shadow-sm">
						<div class="text-sm font-semibold text-slate-800">Компактное ядро</div>
						<div class="mt-1 text-xs text-slate-500">~99.95% массы в центре</div>
					</div>
					<div class="rounded-2xl bg-white px-4 py-3 shadow-sm">
						<div class="text-sm font-semibold text-slate-800">Пустое пространство</div>
						<div class="mt-1 text-xs text-slate-500">Электроны движутся на большом расстоянии</div>
					</div>
					<div class="rounded-2xl bg-white px-4 py-3 shadow-sm">
						<div class="text-sm font-semibold text-slate-800">Проблема стабильности</div>
						<div class="mt-1 text-xs text-slate-500">Классическая физика не объясняет устойчивость</div>
					</div>
				</div>
			</div>
		{/if}

		{#if currentModel === 'bohr'}
			<!-- === МОДЕЛЬ БОРА === -->
			<div class="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-blue-100 p-6 sm:p-8 shadow-sm">
				<h2 class="mb-3 text-2xl font-bold text-slate-800">Модель Бора (1913)</h2>
				<p class="mb-4 text-slate-600 leading-relaxed">
					Нильс Бор объединил ядерную модель Резерфорда с квантовыми идеями Планка. 
					Он постулировал, что электроны могут двигаться только по определённым 
					<strong>стационарным орбитам</strong>, на которых они не излучают энергию. 
					Излучение или поглощение света происходит только при скачкообразном 
					переходе электрона между орбитами с испусканием или поглощением кванта энергии.
				</p>
				<p class="mb-6 text-slate-600 leading-relaxed">
					<strong>Ключевые достижения:</strong> модель точно предсказала спектр атома водорода 
					и объяснила серии спектральных линий (Лаймана, Бальмера, Пашена). 
					Бор ввёл понятие <strong>квантования углового момента</strong> и энергетических уровней. 
					Ограничения: модель работала только для водородоподобных систем, 
					не объясняла интенсивность линий, тонкую структуру спектра и химическую связь. 
					Тем не менее, она стала мостом между классической и квантовой физикой.
				</p>

				<div class="relative flex items-center justify-center my-6">
					<svg width="400" height="400" viewBox="0 0 400 400" class="overflow-visible">
						<circle cx={bohrCenter} cy={bohrCenter} r="180" fill="rgba(99,102,241,0.05)" />
						<circle cx={bohrCenter} cy={bohrCenter} r="55" fill="none" stroke="rgba(99,102,241,0.45)" stroke-width="2" />
						<circle cx={bohrCenter} cy={bohrCenter} r="100" fill="none" stroke="rgba(59,130,246,0.35)" stroke-width="2" />
						<circle cx={bohrCenter} cy={bohrCenter} r="145" fill="none" stroke="rgba(14,165,233,0.22)" stroke-dasharray="6 8" stroke-width="2" />
						<circle cx={bohrCenter} cy={bohrCenter} r="34" fill="rgba(239,68,68,0.16)" />
						<circle cx={bohrCenter} cy={bohrCenter} r="22" fill="url(#bohrNucleus)" stroke="#991b1b" stroke-width="3" />
						<circle cx="192" cy="194" r="4" fill="#fecaca" />
						<circle cx="207" cy="192" r="4" fill="#fca5a5" />
						<circle cx="196" cy="208" r="4" fill="#f87171" />
						<circle cx="210" cy="207" r="4" fill="#fca5a5" />
						{#each electronsBohr as e}
							{#if e.active}
								{@const pos = orbitPosition(e.angle, shellRadius[e.shell as keyof typeof shellRadius])}
								<g>
									<circle cx={pos.x} cy={pos.y} r="13" fill="rgba(59,130,246,0.15)" />
									<circle cx={pos.x} cy={pos.y} r="6" fill="#2563eb" stroke="white" stroke-width="2" />
									<circle class="spawn" cx={pos.x} cy={pos.y} r="10" fill="none" stroke="rgba(255,255,255,0.6)" />
								</g>
							{/if}
						{/each}
						<text x="262" y="150" font-size="12" fill="#4338ca" font-weight="600">n=1</text>
						<text x="308" y="140" font-size="12" fill="#2563eb" font-weight="600">n=2</text>
						<text x="345" y="130" font-size="12" fill="#0ea5e9" font-weight="600">n=3</text>
						<defs>
							<radialGradient id="bohrNucleus">
								<stop offset="0%" stop-color="#f87171" />
								<stop offset="70%" stop-color="#dc2626" />
								<stop offset="100%" stop-color="#991b1b" />
							</radialGradient>
						</defs>
					</svg>
					<div class="absolute bottom-0 rounded-full border border-indigo-200 bg-white/90 px-4 py-1 text-sm font-medium text-indigo-800 shadow">
						Квантованные орбиты
					</div>
				</div>

				<div class="mt-6 grid gap-3 sm:grid-cols-3">
					<div class="rounded-2xl bg-white px-4 py-3 shadow-sm">
						<div class="text-sm font-semibold text-slate-800">Стационарные состояния</div>
						<div class="mt-1 text-xs text-slate-500">Электроны не излучают на разрешённых орбитах</div>
					</div>
					<div class="rounded-2xl bg-white px-4 py-3 shadow-sm">
						<div class="text-sm font-semibold text-slate-800">Квантовые переходы</div>
						<div class="mt-1 text-xs text-slate-500">Излучение при скачке между уровнями</div>
					</div>
					<div class="rounded-2xl bg-white px-4 py-3 shadow-sm">
						<div class="text-sm font-semibold text-slate-800">Успех и границы</div>
						<div class="mt-1 text-xs text-slate-500">Точно для H, не работает для сложных атомов</div>
					</div>
				</div>
			</div>
		{/if}

		{#if currentModel === 'schrodinger'}
			<!-- === МОДЕЛЬ ШРЁДИНГЕРА === -->
			<div class="rounded-3xl border border-slate-200 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-indigo-100 p-6 sm:p-8 shadow-sm">
				<h2 class="mb-3 text-2xl font-bold text-slate-800">Квантовомеханическая модель (1926)</h2>
				<p class="mb-4 text-slate-600 leading-relaxed">
					С развитием квантовой механики Эрвин Шрёдингер сформулировал волновое уравнение, 
					описывающее состояние электрона в атоме. В этой модели электрон не имеет 
					определённой траектории — его положение описывается <strong>волновой функцией</strong> ψ, 
					квадрат модуля которой |ψ|² определяет <strong>вероятность обнаружения</strong> 
					электрона в данной точке пространства.
				</p>
				<p class="mb-6 text-slate-600 leading-relaxed">
					<strong>Основные понятия:</strong> вместо орбит вводятся <strong>орбитали</strong> — 
					трёхмерные области пространства, где вероятность нахождения электрона составляет ~90%. 
					Орбитали характеризуются квантовыми числами (n, l, mₗ) и имеют различные формы: 
					сферические (s), гантелеобразные (p), сложные (d, f). Принцип неопределённости 
					Гейзенберга фундаментально запрещает одновременное точное знание координаты 
					и импульса электрона. Эта модель лежит в основе современной химии и физики твёрдого тела.
				</p>

				<div class="relative flex items-center justify-center my-6">
					<svg width="400" height="400" viewBox="0 0 400 400" class="overflow-visible">
						<circle cx={schrodingerCenter} cy={schrodingerCenter} r="165" fill="rgba(139,92,246,0.05)" />
						<circle cx={schrodingerCenter} cy={schrodingerCenter} r="78" fill="rgba(99,102,241,0.12)" />
						<g style={`transform-origin:${schrodingerCenter}px ${schrodingerCenter}px; transform: rotate(${rotationSchrodinger}deg);`}>
							<ellipse cx="135" cy="200" rx="58" ry="38" fill="rgba(168,85,247,0.16)" />
							<ellipse cx="265" cy="200" rx="58" ry="38" fill="rgba(168,85,247,0.16)" />
						</g>
						<g style={`transform-origin:${schrodingerCenter}px ${schrodingerCenter}px; transform: rotate(${-rotationSchrodinger * 0.8}deg);`}>
							<ellipse cx="200" cy="135" rx="38" ry="58" fill="rgba(59,130,246,0.10)" />
							<ellipse cx="200" cy="265" rx="38" ry="58" fill="rgba(59,130,246,0.10)" />
						</g>
						{#each particles as p}
							<circle cx={p.x} cy={p.y} r={p.r} fill={`rgba(79,70,229,${p.o})`} />
						{/each}
						<circle cx={schrodingerCenter} cy={schrodingerCenter} r="32" fill="rgba(239,68,68,0.14)" />
						<circle cx={schrodingerCenter} cy={schrodingerCenter} r="20" fill="url(#quantumNucleus)" stroke="#991b1b" stroke-width="3" />
						<circle cx="192" cy="193" r="4" fill="#fecaca" />
						<circle cx="208" cy="192" r="4" fill="#fca5a5" />
						<circle cx="195" cy="207" r="4" fill="#f87171" />
						<circle cx="209" cy="208" r="4" fill="#fca5a5" />
						<circle cx={schrodingerCenter} cy={schrodingerCenter} r="95" fill="none" stroke="rgba(99,102,241,0.08)" stroke-dasharray="4 8" />
						<circle cx={schrodingerCenter} cy={schrodingerCenter} r="125" fill="none" stroke="rgba(139,92,246,0.06)" stroke-dasharray="6 10" />
						<text x="280" y="118" font-size="12" fill="#6d28d9" font-weight="600">p-орбиталь</text>
						<text x="240" y="200" font-size="12" fill="#4338ca" font-weight="600">s-орбиталь</text>
						<defs>
							<radialGradient id="quantumNucleus">
								<stop offset="0%" stop-color="#fb7185" />
								<stop offset="70%" stop-color="#dc2626" />
								<stop offset="100%" stop-color="#7f1d1d" />
							</radialGradient>
						</defs>
					</svg>
					<div class="absolute bottom-0 rounded-full border border-violet-200 bg-white/90 px-4 py-1 text-sm font-medium text-violet-800 shadow">
						Электронное облако вероятности
					</div>
				</div>

				<div class="mt-6 grid gap-3 sm:grid-cols-3">
					<div class="rounded-2xl bg-white px-4 py-3 shadow-sm">
						<div class="text-sm font-semibold text-slate-800">Вероятностное описание</div>
						<div class="mt-1 text-xs text-slate-500">|ψ|² — плотность вероятности нахождения</div>
					</div>
					<div class="rounded-2xl bg-white px-4 py-3 shadow-sm">
						<div class="text-sm font-semibold text-slate-800">Орбитали, а не орбиты</div>
						<div class="mt-1 text-xs text-slate-500">s, p, d, f — формы областей вероятности</div>
					</div>
					<div class="rounded-2xl bg-white px-4 py-3 shadow-sm">
						<div class="text-sm font-semibold text-slate-800">Фундаментальный предел</div>
						<div class="mt-1 text-xs text-slate-500">Принцип неопределённости Гейзенберга</div>
					</div>
				</div>
			</div>
		{/if}

	</main>

	<!-- Подвал с навигацией -->
	<footer class="max-w-5xl mx-auto mt-10 pt-6 border-t border-slate-200 text-center text-sm text-slate-500">
		<p>Используйте кнопки выше для переключения между историческими моделями атома</p>
		<p class="mt-1">Каждая модель отражает уровень научных знаний своей эпохи</p>
	</footer>
</div>

<style>
	.spawn {
		animation: pulse 1s ease-out infinite;
	}
	@keyframes pulse {
		0% { opacity: 0.8; transform: scale(0.5); }
		100% { opacity: 0; transform: scale(2); }
	}
	/* Плавные переходы для кнопок */
	button {
		transition: all 0.2s ease;
	}
</style>