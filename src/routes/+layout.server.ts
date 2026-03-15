import type { LayoutServerLoad } from './$types';
import { ArticlesRepo } from '$lib/articles-repo';

export const load: LayoutServerLoad = async () => {
	const articleRepo = new ArticlesRepo("localhost:8080");
	const articlesTree = await articleRepo.getArticlesTree();

	return {
		articlesTree
	};
};