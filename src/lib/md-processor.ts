
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';

export class MdProcessor {
    static async process(md: string): Promise<string> {
        const result = await unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkMath)
            .use(remarkRehype)
            .use(rehypeKatex)
            .use(rehypeStringify)
            .process(md);
        return result.toString();
    }
}
