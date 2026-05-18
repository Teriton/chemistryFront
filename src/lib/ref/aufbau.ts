/** Порядок подуровней (Aufbau) и заполнение до заданного числа электронов. */

const SUBSHELL_ORDER = [
	'1s',
	'2s',
	'2p',
	'3s',
	'3p',
	'4s',
	'3d',
	'4p',
	'5s',
	'4d',
	'5p',
	'6s',
	'4f',
	'5d',
	'6p',
	'7s',
	'5f',
	'6d',
	'7p'
];

function capacity(label: string): number {
	const t = label.slice(-1);
	if (t === 's') return 2;
	if (t === 'p') return 6;
	if (t === 'd') return 10;
	if (t === 'f') return 14;
	return 0;
}

export interface SubshellOccupancy {
	label: string;
	electrons: number;
	capacity: number;
}

/** Распределение электронов по подуровням (до limitElectrons, макс. ~118 для демонстрации). */
export function fillSubshells(limitElectrons: number): SubshellOccupancy[] {
	const n = Math.max(0, Math.min(Math.round(limitElectrons), 118));
	let left = n;
	const out: SubshellOccupancy[] = [];
	for (const label of SUBSHELL_ORDER) {
		if (left <= 0) break;
		const cap = capacity(label);
		const e = Math.min(cap, left);
		if (e > 0) out.push({ label, electrons: e, capacity: cap });
		left -= e;
	}
	return out;
}

/** Группировка по главной оболочке (n) для визуализации колец. */
export function groupByShell(
	subs: SubshellOccupancy[]
): { shell: number; subshells: SubshellOccupancy[] }[] {
	const map = new Map<number, SubshellOccupancy[]>();
	for (const s of subs) {
		const n = Number.parseInt(s.label[0] ?? '1', 10);
		const arr = map.get(n) ?? [];
		arr.push(s);
		map.set(n, arr);
	}
	return [...map.entries()]
		.sort((a, b) => a[0] - b[0])
		.map(([shell, subshells]) => ({ shell, subshells }));
}
