/**
 * Каталог задач практики.
 *
 * Чтобы добавить задания без правки этого файла:
 * - Отредактируйте JSON в `src/lib/practice/content/` (по одному типу на файл).
 * - `class-options.json` — подписи классов для выпадающего списка.
 * - После изменения JSON пересоберите/обновите страницу — импорты подхватываются на этапе сборки.
 *
 * Для расчётных задач поддерживается Markdown в `promptMd` и `explanationMd` (в т.ч. LaTeX $...$).
 * Для уравнений поле `formulaF` — то же, что атрибут `f` у `<formula ... />` в уроках (плейсхолдеры *0* и т.д.).
 */
import type {
	ChainStepPart,
	ClassOption,
	Difficulty,
	PracticeCategory,
	PracticeItem
} from './practice-types';
import equationsJson from './content/equations.json';
import calculationsJson from './content/calculations.json';
import chainsJson from './content/chains.json';
import redoxJson from './content/redox.json';
import classesJson from './content/classes.json';
import classOptionsJson from './content/class-options.json';

/** Сколько заданий в одном заходе практики (при достаточном числе задач в каталоге). */
export const TASKS_PER_ROUND = 10;

function asChainParts(raw: unknown): { parts: ChainStepPart[] }[] {
	const steps = raw as { parts: { kind: string; value?: string; after?: string; blank?: boolean }[] }[];
	return steps.map((step) => ({
		parts: step.parts.map((p): ChainStepPart => {
			if (p.kind === 'blank') {
				return { kind: 'blank', after: p.after ?? '' };
			}
			return { kind: 'text', value: String(p.value ?? ''), after: p.after ?? '' };
		})
	}));
}

/** Все задачи из JSON — правка файлов не требует изменения TypeScript-кода. */
export const allPracticeItems: PracticeItem[] = [
	...(equationsJson as EquationPracticeItemRaw[]).map(parseEquation),
	...(calculationsJson as CalculationPracticeItemRaw[]).map(parseCalc),
	...(chainsJson as ChainPracticeItemRaw[]).map(parseChain),
	...(redoxJson as RedoxPracticeItemRaw[]).map(parseRedox),
	...(classesJson as ClassPracticeItemRaw[]).map(parseClass)
];

type EquationPracticeItemRaw = {
	id: string;
	difficulty: Difficulty;
	title: string;
	promptMd: string;
	formulaF: string;
	answers: string;
	points?: number;
};

type CalculationPracticeItemRaw = {
	id: string;
	difficulty: Difficulty;
	title: string;
	promptMd: string;
	answer: number;
	tolerance?: number;
	unit: string;
	explanationMd: string;
	points?: number;
};

type ChainPracticeItemRaw = {
	id: string;
	difficulty: Difficulty;
	title: string;
	chainMd: string;
	promptMd?: string;
	steps: { parts: { kind: string; value?: string; after?: string }[] }[];
	expectedBlanks: string[];
	points?: number;
};

type RedoxPracticeItemRaw = {
	id: string;
	difficulty: Difficulty;
	title: string;
	promptMd: string;
	reactionMd?: string;
	oxidationInputs: { id: string; label: string; accepted: string[] }[];
	oxidizer: string;
	reducer: string;
	balanceCoeffs: string;
	explanationMd?: string;
	points?: number;
};

type ClassPracticeItemRaw = {
	id: string;
	difficulty: Difficulty;
	title: string;
	promptMd?: string;
	formula: string;
	correctValue: string;
	points?: number;
};

function parseEquation(raw: EquationPracticeItemRaw): PracticeItem {
	return {
		id: raw.id,
		type: 'equations',
		difficulty: raw.difficulty,
		title: raw.title,
		promptMd: raw.promptMd,
		formulaF: raw.formulaF,
		answers: raw.answers,
		points: raw.points
	};
}

function parseCalc(raw: CalculationPracticeItemRaw): PracticeItem {
	return {
		id: raw.id,
		type: 'calculations',
		difficulty: raw.difficulty,
		title: raw.title,
		promptMd: raw.promptMd,
		answer: raw.answer,
		tolerance: raw.tolerance,
		unit: raw.unit,
		explanationMd: raw.explanationMd,
		points: raw.points
	};
}

function parseChain(raw: ChainPracticeItemRaw): PracticeItem {
	return {
		id: raw.id,
		type: 'chains',
		difficulty: raw.difficulty,
		title: raw.title,
		chainMd: raw.chainMd,
		promptMd: raw.promptMd,
		steps: asChainParts(raw.steps),
		expectedBlanks: raw.expectedBlanks,
		points: raw.points
	};
}

function parseRedox(raw: RedoxPracticeItemRaw): PracticeItem {
	return {
		id: raw.id,
		type: 'redox',
		difficulty: raw.difficulty,
		title: raw.title,
		promptMd: raw.promptMd,
		reactionMd: raw.reactionMd,
		oxidationInputs: raw.oxidationInputs.map((x) => ({
			id: x.id,
			label: x.label,
			accepted: x.accepted
		})),
		oxidizer: raw.oxidizer,
		reducer: raw.reducer,
		balanceCoeffs: raw.balanceCoeffs,
		explanationMd: raw.explanationMd,
		points: raw.points
	};
}

function parseClass(raw: ClassPracticeItemRaw): PracticeItem {
	return {
		id: raw.id,
		type: 'classes',
		difficulty: raw.difficulty,
		title: raw.title,
		promptMd: raw.promptMd,
		formula: raw.formula,
		correctValue: raw.correctValue,
		points: raw.points
	};
}

export const compoundClassOptions: ClassOption[] = classOptionsJson as ClassOption[];

export function pickPracticeTasks(category: PracticeCategory, difficulty: Difficulty): PracticeItem[] {
	const exact = allPracticeItems.filter((t) => t.type === category && t.difficulty === difficulty);
	if (exact.length >= TASKS_PER_ROUND) return shuffle(exact).slice(0, TASKS_PER_ROUND);
	const sameCat = allPracticeItems.filter((t) => t.type === category);
	const merged = [...exact, ...sameCat.filter((t) => !exact.includes(t))];
	return shuffle(merged).slice(0, TASKS_PER_ROUND);
}

function shuffle<T>(arr: T[]): T[] {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

/** Баллы в интерфейсе практики (профиль: +50 XP за каждое полностью верное задание через API). */
export function defaultPoints(_item: PracticeItem): number {
	return 50;
}
