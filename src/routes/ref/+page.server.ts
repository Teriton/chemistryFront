import type { PageServerLoad } from "./$types";

export interface RefPage {
	name: string;
	path: string;
}
const refsPages: RefPage[] = [
	{
		name: "Периодическая таблица",
		path: "/ref/periodic-table"
	},
	{
		name: "Таблица растворимости",
		path: "/ref/solubility-table"
	},
	{
		name: "Калькулятор молярной массы",
		path: "/ref/molar-mass"
	},
	{
		name: "Электроотрицательность",
		path: "/ref/electronegativity"
	},
	{
		name: "Конструктор атома",
		path: "/ref/atom-constructor"
	},
	{
		name: "Модели строения атома",
		path: "/ref/atom-models"
	},
	{
		name: "Ряд активности металлов",
		path: "/ref/metal-activity"
	}
];
 

export const load: PageServerLoad = async () => {

	const sortedPages = new Map<string, RefPage[]>();
    makeSortedList(refsPages, sortedPages)
	return {
        sortedPages: sortedPages
	};
}

function makeSortedList(pages: RefPage[], sortedPages: Map<string,RefPage[]>): void {
		const grouped = new Map<string, RefPage[]>();
		pages.forEach(page => {
			const key = page.name.charAt(0).toUpperCase();
			const group = grouped.get(key) ?? [];
			group.push(page);
			grouped.set(key, group);
		});
		sortedPages.clear();
		Array.from(grouped.keys())
			.sort((a, b) => a.localeCompare(b, 'ru'))
			.forEach(key => sortedPages.set(key, grouped.get(key)!));
}
 
