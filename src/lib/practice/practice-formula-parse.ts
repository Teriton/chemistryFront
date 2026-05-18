/** Разбор строки уравнения с плейсхолдерами *0*, *1*… для рендера без Markdown (иначе `_` и `$` ломают разметку). */

export type FormulaSegment =
	| { kind: 'latex'; latex: string }
	| { kind: 'slot'; index: number };

function unwrapDollars(raw: string): string {
	let t = raw.trim();
	while (t.startsWith('$')) t = t.slice(1).trimStart();
	while (t.endsWith('$')) t = t.slice(0, -1).trimEnd();
	return t.trim();
}

export function parseFormulaSegments(formulaF: string): FormulaSegment[] {
	const re = /\*(\d+)\*/g;
	const out: FormulaSegment[] = [];
	let last = 0;
	let m: RegExpExecArray | null;
	while ((m = re.exec(formulaF)) !== null) {
		if (m.index > last) {
			const latex = unwrapDollars(formulaF.slice(last, m.index));
			if (latex.length > 0) out.push({ kind: 'latex', latex });
		}
		out.push({ kind: 'slot', index: Number.parseInt(m[1] ?? '0', 10) });
		last = m.index + m[0].length;
	}
	if (last < formulaF.length) {
		const latex = unwrapDollars(formulaF.slice(last));
		if (latex.length > 0) out.push({ kind: 'latex', latex });
	}
	return out;
}
