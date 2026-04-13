
export interface Question {
    question: string    
    options: string[]
    correctAnswers: string[]
    answerd: boolean 
}

export interface CompleteDataRequest  {
	lesson_title: string 
	xp          : number    
}

export class QuestionManager {
    quesions: Question[]
    articleTitle: string
    api: QuesitonAPICalls

    constructor(api: QuesitonAPICalls, articleTitle: string) {
        this.quesions = []
        this.api = api
        this.articleTitle = articleTitle
    }

    addQuestion(title: string ,questionRawAnswers: string): Question{
        const splitedContent = questionRawAnswers.split("|");
        const question: Question= {question: title, options: [], correctAnswers: [], answerd: false};
        question.options = splitedContent;
        for (let i = 0; i < question.options.length; ++i) {
            if(question.options[i][0] == '!'){
                const correctOption = question.options[i].slice(1);
                question.correctAnswers.push(correctOption)
                question.options[i] = correctOption
            }
        }
        this.quesions.push(question);
        return question
    }

    getQuestion(question: string): Question | undefined {
        return this.quesions.find((val)=>{
            return val.question == question ? true: false;
        }) 
    }

    answerQuestion(question: Question){
        let allAnswerd = true;
        for (let i = 0; i < this.quesions.length; ++i ){
            if (JSON.stringify(this.quesions[i]) === JSON.stringify(question)){
                this.quesions[i].answerd = true; 
                continue;
            }
            if (this.quesions[i].answerd == false) {
                allAnswerd = false;
            }
        }

        if (allAnswerd) {
            const data: CompleteDataRequest = {
                lesson_title: this.articleTitle,
                xp: this.quesions.length * 100
            }
            this.api.answerQuestion(data)
        }
    }
}

export class QuesitonAPICalls {
    url: string;

    constructor(url: string) {
        this.url = url.startsWith('http') ? url : 'http://' + url;
    }

    async answerQuestion(data: CompleteDataRequest){
        const headers: Headers = new Headers() 

        headers.set('Accept', 'application/json') 
 
        const request: RequestInfo = new Request(this.url + "/complete", {
            method: 'POST',
            headers: headers,
            credentials: "include",
            body: JSON.stringify(data)
        })
        const response = await fetch(request)
        const dataFromReq = await response.json()
        return dataFromReq;
    }
}