export type PracticeCategory =
	| 'equations'
	| 'calculations'
	| 'chains'
	| 'redox'
	| 'classes';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface EquationPracticeItem {
	id: string;
	type: 'equations';
	difficulty: Difficulty;
	title: string;
	promptMd: string;
	/** То же поле `f`, что в `<formula f="..." answers="..." />`. */
	formulaF: string;
	/** Ответы через запятую, как в `answers` у formula. */
	answers: string;
	points?: number;
}

export interface CalculationPracticeItem {
	id: string;
	type: 'calculations';
	difficulty: Difficulty;
	title: string;
	promptMd: string;
	answer: number;
	tolerance?: number;
	unit: string;
	explanationMd: string;
	points?: number;
}

export type ChainStepPart =
	| { kind: 'text'; value: string; after?: string }
	| { kind: 'blank'; after?: string };

export interface ChainPracticeItem {
	id: string;
	type: 'chains';
	difficulty: Difficulty;
	title: string;
	/** Показ цепочки (markdown / LaTeX). */
	chainMd: string;
	promptMd?: string;
	steps: { parts: ChainStepPart[] }[];
	/** Ожидаемые вещества в пропусках по порядку (нормализуются при проверке). */
	expectedBlanks: string[];
	points?: number;
}

export interface RedoxOxidationInput {
	id: string;
	/** Подпись к полю, например «Cu (реагент)». */
	label: string;
	/** Допустимые ответы: «0», «+2», «-1» и т.д. */
	accepted: string[];
}

export interface RedoxPracticeItem {
	id: string;
	type: 'redox';
	difficulty: Difficulty;
	title: string;
	promptMd: string;
	reactionMd?: string;
	oxidationInputs: RedoxOxidationInput[];
	oxidizer: string;
	reducer: string;
	/** Коэффициенты уравнения через запятую (упрощённый баланс). */
	balanceCoeffs: string;
	explanationMd?: string;
	points?: number;
}

export interface ClassOption {
	value: string;
	label: string;
}

export interface ClassPracticeItem {
	id: string;
	type: 'classes';
	difficulty: Difficulty;
	title: string;
	promptMd?: string;
	formula: string;
	correctValue: string;
	points?: number;
}

export type PracticeItem =
	| EquationPracticeItem
	| CalculationPracticeItem
	| ChainPracticeItem
	| RedoxPracticeItem
	| ClassPracticeItem;

export const practiceCategoryLabels: Record<PracticeCategory, string> = {
	equations: 'Составление и балансировка уравнений',
	calculations: 'Расчётные задачи',
	chains: 'Цепочки превращений',
	redox: 'Окислительно-восстановительные реакции',
	classes: 'Классы неорганических соединений'
};

export const difficultyLabels: Record<Difficulty, string> = {
	easy: 'Базовый',
	medium: 'Средний',
	hard: 'Сложный'
};
