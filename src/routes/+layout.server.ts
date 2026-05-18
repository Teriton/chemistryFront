import type { LayoutServerLoad } from './$types';
import { ArticlesRepo } from '$lib/articles-repo';
import { BACK_URL } from '$env/static/private';

function isGuestRoute(pathname: string): boolean {
	return (
		pathname === '/login' ||
		pathname === '/signup' ||
		pathname.startsWith('/login/') ||
		pathname.startsWith('/signup/')
	);
}

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	const token = cookies.get('token');
	const logedIn = token != null;

	if (isGuestRoute(url.pathname)) {
		return { isGuestRoute: true as const, logedIn };
	}

	const articleRepo = new ArticlesRepo(BACK_URL);
	const articlesTree = await articleRepo.getArticlesTree();

	return {
		isGuestRoute: false as const,
		articlesTree,
		logedIn
	};
};
