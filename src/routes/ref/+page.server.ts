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
		name: "Растворимостей таблица",
		path: "/ref/solubility-table"
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
 
