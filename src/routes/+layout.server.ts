import type { LayoutServerLoad } from './$types';
import { ArticlesRepo } from '$lib/articles-repo';
import { BACK_URL } from '$env/static/private';

export const load: LayoutServerLoad = async ({cookies}) => {
	const token = cookies.get("token")
	const logedIn = token != null ? true : false;

	const articleRepo = new ArticlesRepo(BACK_URL);
	const articlesTree = await articleRepo.getArticlesTree();


	return {
		articlesTree,
		logedIn
	};
};