
export interface Question {
    question: string    
    options: string[]
    correctAnswers: string[]
}


export class QuestionManager {
    quesions: Question[]

    constructor() {
        this.quesions = []
    }

    addQuestion(title: string ,questionRawAnswers: string): Question{
        const splitedContent = questionRawAnswers.split("|");
        const question: Question= {question: title, options: [], correctAnswers: []};
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
}