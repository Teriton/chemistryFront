import type { LayoutServerLoad } from './$types';
import { ArticlesRepo } from '$lib/articles-repo';

export const load: LayoutServerLoad = async () => {
	// Temporarily hardcoded for testing
	const articlesTree = {
		"title": "articles",
		"articles": [
			{
				"title": "main",
				"articles": [
					{"title": "Introduction"},
					{"title": "Глава 1. Почему шпэк тупой"}
				]
			},
			{
				"title": "test",
				"articles": [
					{"title": "Test"},
					{
						"title": "TestPage1",
						"articles": [{"title": "TestArticle1"}]
					},
					{
						"title": "TestPage2",
						"articles": [{"title": "TestArticle2"}]
					}
				]
			}
		]
	};

	// Uncomment to use from backend
	// const articleRepo = new ArticlesRepo("localhost:8080");
	// const articlesTree = await articleRepo.getArticlesTree();

	return {
		articlesTree
	};
};