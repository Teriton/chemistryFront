import type { LayoutServerLoad } from './$types';
import { ArticlesRepo } from '$lib/articles-repo';

export const load: LayoutServerLoad = async ({cookies}) => {
	const articleRepo = new ArticlesRepo("localhost:8080");
	const articlesTree = await articleRepo.getArticlesTree();

	const logedIn = cookies.get("token") != null ? true : false;
	console.log(logedIn)

	return {
		articlesTree,
		logedIn
	};
};