import { CreateQuizJsonDto } from './dto/create-quiz-json.dto';
import { QuizModel } from './quiz.model';
import { QuestionModel } from '../question/question.model';

async function createAQuizFromJSON(userId: string, data: CreateQuizJsonDto) {
    const questions = [];
    for (let i = 0; i < data.questions.length; i++) {
        questions.push((await QuestionModel.create(data.questions[i]))._id);
    }

    const quizObject = {
        title: data.title,
        questions,
        author: userId,
        answerSheets: [],
    };

    return (await QuizModel.create(quizObject)).populate('questions');
}

async function createAQuizFromExcelSheet() {
    // todo: parse excel data
    // return createAQuizFromJSON();
}

// without answers
async function getQuizAsStudent() {}

async function getQuizAsOwner() {}

export default {
    createAQuizFromJSON,
    createAQuizFromExcelSheet,
};
