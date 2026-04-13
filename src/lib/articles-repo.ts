
export class ArticlesRepo {
    url: string;

    constructor(url: string) {
        this.url = url.startsWith('http') ? url : 'http://' + url;
    }

    async getArticle(endPoint: string)  {
        const headers: Headers = new Headers() 

        headers.set('Content-Type', 'application/json')
        headers.set('Accept', 'application/json') 
        const request: RequestInfo = new Request(this.url + "/articles/byPath/" + endPoint, {
            method: 'GET',
            headers: headers
        })
        const response = await fetch(request)
        if (!response.ok) {
            return JSON.stringify({title: "Error", content:"Article not found"})
        }

        return await response.json();
    }

    async getArticlesTree() {
        const headers: Headers = new Headers();

        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        const request: RequestInfo = new Request(this.url + "/articles/list", {
            method: 'GET',
            headers: headers
        });
        const response = await fetch(request);
        if (!response.ok) {
            return { title: "articles", articles: []};
        }
        return await response.json();
    }
}