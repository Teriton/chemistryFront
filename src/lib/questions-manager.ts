
export enum QuesionType {
    Question,
    Equation
}


export interface Question {
    question: string    
    options: string[]
    correctAnswers: string[]
    answerd: boolean 
    questionType: QuesionType
    userAnswers?: string[]
}

export interface CompleteDataRequest  {
	lesson_title: string 
	xp          : number    
}

export class QuestionManager {
    quesions: Question[]
    articleTitle: string
    api: QuesitonAPICalls
    xpToSend: number
    hasSubmitted: boolean

    constructor(api: QuesitonAPICalls, articleTitle: string) {
        this.quesions = []
        this.api = api
        this.articleTitle = articleTitle
        this.xpToSend = 0
        this.hasSubmitted = false
    }

    async submitQuestionResults(results: { question: Question; isCorrect: boolean }[]) {
        if (this.hasSubmitted) {
            return { status: "already_submitted" };
        }
        for (let i = 0; i < results.length; i++) {
            const current = results[i];
            const index = this.quesions.findIndex((q) => q.question === current.question.question);
            if (index < 0) {
                continue;
            }
            if (!this.quesions[index].answerd && current.isCorrect) {
                this.xpToSend += 100;
            }
            this.quesions[index].answerd = true;
        }
        this.hasSubmitted = true;
        return await this.#sendQuestion();
    }

    addQuestion(title: string ,questionRawAnswers: string): Question{
        const splitedContent = questionRawAnswers.split("|");
        const question: Question= {question: title, options: [], correctAnswers: [], answerd: false, questionType: QuesionType.Question, userAnswers: []};
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
    addEquation(f: string ,rawAnswers: string): Question{
        const splitedContent = rawAnswers.split(",");
        console.log(splitedContent)
        const question: Question= {question: f, options: [], correctAnswers: [], answerd: false, questionType: QuesionType.Equation, userAnswers: []};
        question.correctAnswers = splitedContent;

        this.quesions.push(question);
        return question
    }

    getQuestion(question: string): Question | undefined {
        return this.quesions.find((val)=>{
            return val.question == question ? true: false;
        }) 
    }

    setEquationAnswers(questionTitle: string, answers: string[]) {
        const question = this.quesions.find((val) => val.question === questionTitle && val.questionType === QuesionType.Equation);
        if (!question) return;
        question.userAnswers = answers;
    }

    #isCorrect(question: Question, selectedAnswers: Record<string, string>): boolean {
        if (question.questionType === QuesionType.Equation) {
            const answers = question.userAnswers ?? [];
            return answers.length === question.correctAnswers.length
                && answers.every((value, index) => value === question.correctAnswers[index]);
        }
        const picked = selectedAnswers[question.question];
        return question.correctAnswers.includes(picked);
    }

    buildResults(selectedAnswers: Record<string, string>) {
        return this.quesions.map((question) => ({
            question,
            isCorrect: this.#isCorrect(question, selectedAnswers)
        }));
    }

    async #sendQuestion() {
        const data: CompleteDataRequest = {
            lesson_title: this.articleTitle,
            xp: this.xpToSend 
        }
        return await this.api.answerQuestion(data)
    }

    answerQuestion(question: Question){
        let allAnswerd = true;
        for (let i = 0; i < this.quesions.length; ++i ){
            if (JSON.stringify(this.quesions[i]) === JSON.stringify(question)){
                this.quesions[i].answerd = true; 
                this.xpToSend += 100
                continue;
            }
            if (this.quesions[i].answerd == false) {
                allAnswerd = false;
            }
        }

        if (allAnswerd) {
            this.#sendQuestion()    
        }
    }

    answerEquation(equation: Question){
        let allAnswerd = true;
        for (let i = 0; i < this.quesions.length; ++i ){
            if (JSON.stringify(this.quesions[i]) === JSON.stringify(equation)){
                this.quesions[i].answerd = true; 
                this.xpToSend += equation.correctAnswers.length * 75
                continue;
            }
            if (this.quesions[i].answerd == false) {
                allAnswerd = false;
            }
        }

        if (allAnswerd) {
            this.#sendQuestion()
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