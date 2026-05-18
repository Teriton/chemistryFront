<script lang="ts">
  import { elements } from '$lib/data/elements';
  import { fillSubshells, groupByShell } from '$lib/ref/aufbau';

  // Состояние
  let protons = $state(6);
  let neutrons = $state(6);
  let electrons = $state(6);

  // Производные данные
  const Z = $derived(Math.max(1, Math.min(118, Math.round(protons))));
  const eCount = $derived(Math.max(0, Math.min(118, Math.round(electrons))));
  const nCount = $derived(Math.max(0, Math.round(neutrons)));
  const element = $derived(elements.find((el) => el.number === Z));
  const charge = $derived(Z - eCount);
  const massNumber = $derived(Z + nCount);
  const subs = $derived(fillSubshells(eCount));
  const shellsData = $derived(groupByShell(subs));

  // Управление частицами
  function adjust(key: 'protons' | 'neutrons' | 'electrons', delta: number) {
    const min = key === 'protons' ? 1 : 0;
    const max = key === 'neutrons' ? 200 : 118;
    const cur = key === 'protons' ? protons : key === 'neutrons' ? neutrons : electrons;
    const next = Math.min(max, Math.max(min, Math.round(cur + delta)));
    if (key === 'protons') protons = next;
    else if (key === 'neutrons') neutrons = next;
    else electrons = next;
  }

  // Визуальная упаковка ядра (спираль Фибоначчи)
  const nucleusParticles = $derived.by(() => {
    const total = Z + nCount;
    const particles: Array<{ id: number; type: 'p' | 'n'; x: number; y: number }> = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < total; i++) {
      const r = 6.5 * Math.sqrt(i) + 2.5;
      const theta = i * goldenAngle;
      particles.push({
        id: i,
        type: i < Z ? 'p' : 'n',
        x: r * Math.cos(theta),
        y: r * Math.sin(theta)
      });
    }
    return particles;
  });

  // Визуальные электронные оболочки
  const electronShellsVisual = $derived.by(() => {
    const shells: Array<{ n: number; count: number; radius: number; electrons: Array<{ angle: number }> }> = [];
    let remaining = eCount;
    for (let n = 1; n <= 7; n++) {
      const maxInShell = 2 * n * n;
      const count = Math.min(remaining, maxInShell);
      if (count > 0) {
        shells.push({
          n,
          count,
          radius: 40 + n * 35,
          electrons: Array.from({ length: count }, (_, i) => ({
            angle: (2 * Math.PI * i) / count - Math.PI / 2
          }))
        });
        remaining -= count;
      } else break;
    }
    return shells;
  });

  // Динамический viewBox для SVG
  const svgSize = $derived.by(() => {
    const maxShellR = electronShellsVisual.length > 0 ? electronShellsVisual[electronShellsVisual.length - 1].radius : 40;
    const maxNucleusR = Math.sqrt(Z + nCount) * 8 + 10;
    const totalR = Math.max(maxShellR, maxNucleusR) + 30;
    return { width: totalR * 2, height: totalR * 2, center: totalR };
  });
</script>

<div class="mx-auto max-w-6xl px-4 py-10 space-y-8 select-none">
  <div class="text-center space-y-2">
    <h1 class="text-3xl font-bold text-slate-900">Конструктор атома</h1>
    <p class="text-slate-600 max-w-xl mx-auto">
      Добавляйте или убирайте частицы. Модель атома обновляется в реальном времени.
    </p>
  </div>

  <div class="grid lg:grid-cols-5 gap-8 items-start">
    <!-- ЛЕВАЯ КОЛОНКА: 2D Модель -->
    <div class="lg:col-span-3 relative aspect-square w-full max-w-lg mx-auto rounded-2xl shadow-2xl border overflow-hidden" style="background-color: #003049; border-color: #003049;">
      <svg viewBox="0 0 {svgSize.width} {svgSize.height}" class="w-full h-full">
        <defs>
          <radialGradient id="nucleus-glow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stop-color="#669bbc" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#669bbc" stop-opacity="0"/>
          </radialGradient>
          <radialGradient id="bg-grad" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stop-color="#003049"/>
            <stop offset="100%" stop-color="#001a2e"/>
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg-grad)"/>

        <!-- Орбитали -->
        {#each electronShellsVisual as shell (shell.n)}
          <circle
            cx={svgSize.center} cy={svgSize.center}
            r={shell.radius}
              fill="none" stroke="#fdf0d5" stroke-opacity="0.25" stroke-width="1.5" stroke-dasharray="4 4"
            class="transition-all duration-500"
          />
          <!-- Электроны -->
          {#each shell.electrons as e, idx}
            <circle
              key={`${shell.n}-${idx}`}
              cx={svgSize.center + shell.radius * Math.cos(e.angle)}
              cy={svgSize.center + shell.radius * Math.sin(e.angle)}
              r="4" fill="#e63946"
              class="particle-enter"
              style="filter: drop-shadow(0 0 6px #e63946);"
            />
          {/each}
        {/each}

        <!-- Ядро -->
        <circle 
          cx={svgSize.center} cy={svgSize.center} 
          r={Math.sqrt(Z + nCount) * 5.5} 
          fill="url(#nucleus-glow)" 
          class="animate-pulse-slow"
        />
        {#each nucleusParticles as p (p.id)}
          <circle
            key={p.id}
            cx={svgSize.center + p.x} cy={svgSize.center + p.y}
            r="4.5"
            class="particle-enter"
            fill={p.type === 'p' ? '#669bbc' : '#fdf0d5'}
            style="filter: drop-shadow(0 0 3px {p.type === 'p' ? '#669bbc' : '#fdf0d5'});"
          />
        {/each}
      </svg>

      <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-4 text-xs font-medium backdrop-blur px-4 py-2 rounded-full mx-auto w-fit border" style="background-color: #003049cc; border-color: #669bbc; color: #fdf0d5;">
        <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full shadow" style="background-color: #669bbc;"></span> Протон (p⁺)</span>
        <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full shadow" style="background-color: #fdf0d5;"></span> Нейтрон (n⁰)</span>
        <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full shadow" style="background-color: #e63946;"></span> Электрон (e⁻)</span>
      </div>
    </div>

    <!-- ПРАВАЯ КОЛОНКА: Управление и данные -->
    <div class="lg:col-span-2 space-y-5">
      <!-- Панель управления -->
      <div class="grid gap-3">
        {#each [
          { key: 'protons', label: 'Протоны (Z)', cur: Z, min: 1, max: 118, color: 'teal' },
          { key: 'neutrons', label: 'Нейтроны (N)', cur: nCount, min: 0, max: 200, color: 'slate' },
          { key: 'electrons', label: 'Электроны (e⁻)', cur: eCount, min: 0, max: 118, color: 'indigo' }
        ] as cfg}
          <div class="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div>
              <span class="text-sm font-semibold text-slate-800">{cfg.label}</span>
              <p class="text-2xl font-mono font-bold text-slate-900">{cfg.cur}</p>
            </div>
            <div class="flex gap-2">
              <button onclick={() => adjust(cfg.key as any, -1)} 
                class="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-rose-100 hover:text-rose-600 transition-colors font-bold text-slate-600" title="Убрать">−</button>
              <button onclick={() => adjust(cfg.key as any, 1)} 
                class="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-600 transition-colors font-bold text-slate-600" title="Добавить">+</button>
            </div>
          </div>
        {/each}
      </div>

      <!-- Информация об элементе -->
      <div class="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 text-center space-y-2">
        <p class="text-xs uppercase tracking-widest text-emerald-700 font-semibold">Элемент</p>
        <div class="flex items-center justify-center gap-3">
          <span class="text-4xl font-bold text-emerald-900">{element?.symbol ?? '?'}</span>
          <span class="text-lg text-emerald-800">{element?.name ?? 'Вне таблицы'}</span>
        </div>
        <div class="pt-2 border-t border-emerald-200/60 space-y-1 text-sm text-slate-700">
          <p>Массовое число A ≈ <span class="font-mono font-semibold">{massNumber}</span></p>
          <p>Заряд: {#if charge === 0}нейтральная частица{:else if charge > 0}{element?.symbol ?? 'X'}<sup class="text-base">{charge}+</sup> (катион){:else}{element?.symbol ?? 'X'}<sup class="text-base">{Math.abs(charge)}−</sup> (анион){/if}</p>
        </div>
      </div>

      <!-- Конфигурация -->
      <div class="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
        <div>
          <h3 class="text-sm font-semibold text-slate-800">Электронная конфигурация</h3>
          <p class="text-xs text-slate-500">{element?.electronConfiguration ?? '—'}</p>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-slate-800">Подуровни</h3>
          <div class="mt-2 flex flex-wrap gap-1.5">
            {#each subs as s (s.label)}
              <span class="inline-flex items-center gap-1 rounded bg-teal-50 border border-teal-200 px-2 py-0.5 text-xs font-mono text-teal-900">
                {s.label}<sup>{s.electrons}</sup>
              </span>
            {/each}
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100">
          <h3 class="text-sm font-semibold text-slate-800">Оболочки (n)</h3>
          <div class="mt-2 space-y-1.5">
            {#each shellsData as ring (ring.shell)}
              <div class="flex items-center gap-2 text-xs">
                <span class="w-6 text-right font-medium text-slate-600">n={ring.shell}:</span>
                <div class="flex flex-wrap gap-1">
                  {#each ring.subshells as s (s.label)}
                    <span class="rounded bg-slate-100 border border-slate-200 px-1.5 py-0.5 font-mono text-slate-700">{s.label}<sup>{s.electrons}</sup></span>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .particle-enter {
    animation: pop-in 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  @keyframes pop-in {
    from { opacity: 0; transform: scale(0); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-pulse-slow {
    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.4; transform: scale(0.95); }
    50% { opacity: 0.7; transform: scale(1.05); }
  }
</style>