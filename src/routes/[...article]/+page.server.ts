import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ArticlesRepo } from '$lib/articles-repo';

const articleRepo = new ArticlesRepo("localhost:8080");
console.log("Article repo created");

export const load: PageServerLoad = async ({ params }) => {

    const article =  await articleRepo.getArticle(params.article)

    const rawData = article.content

    if (article.title === "Error") {
        error(404, 'Not found');
    }


    return {
        title: article.title,
        rawData
    };
};


