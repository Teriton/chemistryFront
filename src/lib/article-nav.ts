export type ArticleTreeNode = {
	title: string;
	articles?: ArticleTreeNode[];
};

/** Same path shape as in `menu-item.svelte` leaf links (encoded parents, raw leaf title). */
export function flattenLessonPaths(nodes: ArticleTreeNode[], prefix = ''): string[] {
	const out: string[] = [];
	for (const n of nodes) {
		if (n.articles?.length) {
			const next = prefix
				? `${prefix}/${encodeURIComponent(n.title)}`
				: `/${encodeURIComponent(n.title)}`;
			out.push(...flattenLessonPaths(n.articles, next));
		} else {
			out.push(prefix ? `${prefix}/${n.title}` : `/${n.title}`);
		}
	}
	return out;
}

function normalizePath(p: string): string {
	try {
		return decodeURI(p.replace(/\/$/, '') || '/');
	} catch {
		return p.replace(/\/$/, '') || '/';
	}
}

/** `articleRest` — значение `params.article` у маршрута `[...article]` (надёжнее, чем только pathname). */
export function lessonNeighbors(
	tree: { articles?: ArticleTreeNode[] } | null | undefined,
	pathname: string,
	articleRest?: string
): { prev: string | null; next: string | null } {
	const roots = tree?.articles;
	if (!roots?.length) return { prev: null, next: null };

	const paths = flattenLessonPaths(roots);
	const cur =
		articleRest != null && articleRest !== ''
			? normalizePath(`/${articleRest}`)
			: normalizePath(pathname);
	const idx = paths.findIndex((p) => normalizePath(p) === cur);
	if (idx < 0) return { prev: null, next: null };

	return {
		prev: idx > 0 ? paths[idx - 1]! : null,
		next: idx < paths.length - 1 ? paths[idx + 1]! : null
	};
}
