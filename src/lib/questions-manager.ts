
export interface Question {
    question: string    
    options: string[]
    correctAnswers: string[]
}


export class QuesionManager {
    quesions: Question[]

    constructor() {
        this.quesions = []
    }

    addQuestion(questionRawStr: string){
        const splitedContent = questionRawStr.split("|");
        const question: Question= {question: "", options: [], correctAnswers: []};
        question.question = splitedContent[0];
        question.options = splitedContent.slice(1);
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
}