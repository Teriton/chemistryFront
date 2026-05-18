/** Нормализация формулы для сравнения ответов. */

const SUB_SUPER_MAP: Record<string, string> = {
	'\u2080': '0',
	'\u2081': '1',
	'\u2082': '2',
	'\u2083': '3',
	'\u2084': '4',
	'\u2085': '5',
	'\u2086': '6',
	'\u2087': '7',
	'\u2088': '8',
	'\u2089': '9',
	'\u207a': '+',
	'\u207b': '-',
	'\u2044': '/'
};

export function normalizeFormula(value: string): string {
	let s = value.trim().replace(/\s+/g, '');
	for (const [k, v] of Object.entries(SUB_SUPER_MAP)) {
		s = s.split(k).join(v);
	}
	return s;
}

/** Степень окисления: допускаем «+2», «2», «+ 2». */
export function normalizeOxidationState(value: string): string {
	const t = value
		.trim()
		.replace(/\s+/g, '')
		.replace(/,/g, '.')
		.replace(/^\+/, '');
	if (t === '') return '';
	return t;
}

export function oxidationMatches(user: string, accepted: string[]): boolean {
	const u = normalizeOxidationState(user);
	if (u === '') return false;
	return accepted.some((a) => normalizeOxidationState(a) === u);
}
