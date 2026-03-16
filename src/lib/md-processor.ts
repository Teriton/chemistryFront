/* eslint-disable @typescript-eslint/no-explicit-any */
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { QuesionManager, type Question } from './questions-manager';

function generateHtmlForm(question: Question) {
    const optionsHtml = question.options.map((opt, i) => 
        `<input type="radio" id="${question.question}${i}" name="${question.question}" value="${opt}">
         <label for="${question.question}${i}">${opt}</label><br>`
    ).join(''); 
    const htmlForm = `<form method="POST" action="?/question">
	<label>
        ${question.question}
	</label>
    <br/>
	<label>
        Выберите правильный ответ:
	</label>
    <br/>
    ${optionsHtml}
	<button>Ответить</button>
</form>`;
    return htmlForm;
}

function remarkCustomQuestions(questionManager: QuesionManager) {
    return (tree: any) => {
        visit(tree, 'text', (node: any, index?: number, parent?: any) => {
            if (index === undefined || !parent) return; 
            
            const regex = /\?\}(.*?)\{\?/g;
            const matches = [...node.value.matchAll(regex)];
            
            if (matches.length > 0) {
                const newChildren: any[] = [];
                let lastIndex = 0;
                
                matches.forEach((match) => {
                    const start = match.index!;
                    const end = start + match[0].length;
                    const content = match[1] ?? match[2];
                    
                    if (start > lastIndex) {
                        newChildren.push({
                            type: 'text',
                            value: node.value.slice(lastIndex, start)
                        });
                    }

                    const question = questionManager.addQuestion(content);
                    newChildren.push({
                        type: 'html',
                        value: generateHtmlForm(question)
                    });
                    
                    lastIndex = end;
                });
                
                if (lastIndex < node.value.length) {
                    newChildren.push({
                        type: 'text',
                        value: node.value.slice(lastIndex)
                    });
                }
                
                parent.children.splice(index, 1, ...newChildren);
            }
        });
    };
}

export class MdProcessor {
    static async process(md: string, questionManager: QuesionManager): Promise<string> {
        const result = await unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkMath)
            .use(remarkCustomQuestions, questionManager)
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypeRaw)
            .use(rehypeKatex)
            .use(rehypeStringify, { allowDangerousHtml: true })
            .process(md);
        return result.toString();
    }
}