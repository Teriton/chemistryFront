import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ArticlesRepo } from '$lib/articles-repo';
import { MdProcessor } from '$lib/md-processor';
import type { Actions } from './$types';
import { QuesionManager } from '$lib/questions-manager';

const articleRepo = new ArticlesRepo("localhost:8080");
console.log("Article repo created");

const questionManager = new QuesionManager();
console.log("Questoio mng created");
export const load: PageServerLoad = async ({ params }) => {

    const article =  await articleRepo.getArticle(params.article)

    if (article.title === "Error") {
        error(404, 'Not found');
    }


    article.content = await MdProcessor.process(article.content, questionManager);

    return article
};


export const actions = {
	question: async ({ request }) => {
		const data = await request.formData();
        const questionStr = data.keys().next().value ?? "";
        const question = questionManager.getQuestion(questionStr);
        if (!question){
            return {success: false};
        }
		const answer = data.get(question.question);

        if (question.correctAnswers.find((val)=>{return val == answer}))
    		return { success: true };
        else
            return {success: false};
	},
} satisfies Actions;