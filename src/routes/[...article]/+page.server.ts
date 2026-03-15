import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ArticlesRepo } from '$lib/articles-repo';
import { MdProcessor } from '$lib/md-processor';

const articleRepo = new ArticlesRepo("localhost:8080");
console.log("Article repo created");
export const load: PageServerLoad = async ({ params }) => {

    const article =  await articleRepo.getArticle(params.article)

    if (article.title === "Error") {
        error(404, 'Not found');
    }

    article.content = await MdProcessor.process(article.content);

    return article
};