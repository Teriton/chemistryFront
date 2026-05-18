export type TaskType = 'equations' | 'calculations' | 'chains' | 'redox' | 'classes';
export type Difficulty = 'basic' | 'medium' | 'advanced';

export interface Task {
		id: string;
		type: TaskType;
		difficulty: Difficulty;
		prompt: string;
		placeholder: string;
		unit?: string;
		correctAnswer: string | number;
		hint?: string;
		explanation?: string;
	}


export const taskTypes: Record<TaskType, { label: string; icon: string }> = {
		equations: { label: 'Уравнения реакций', icon: '⚗️' },
		calculations: { label: 'Расчётные задачи', icon: '🧮' },
		chains: { label: 'Цепочки превращений', icon: '🔗' },
		redox: { label: 'Окислительно-восстановительные', icon: '⚡' },
		classes: { label: 'Классы соединений', icon: '🧪' }
	};

export const difficulties: Record<Difficulty, { label: string; hints: string; scoring: string }> = {
		basic: { label: 'Базовый', hints: 'Доступны всегда', scoring: 'Без штрафов' },
		medium: { label: 'Средний', hints: 'Только первый шаг', scoring: 'Стандартная шкала' },
		advanced: { label: 'Повышенный', hints: 'Только теория', scoring: 'Строго + бонусы за скорость' }
	};
