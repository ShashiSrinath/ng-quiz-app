import { QuizModel } from './quiz.model';
import { QuestionModel } from '../question/question.model';
import { CreateQuizJsonDto } from './dto/create-quiz-json.dto';

async function createAQuizFromJSON(userId: string, data: CreateQuizJsonDto) {
    const questions = {};

    for (const [key, question] of Object.entries(data.questions)) {
        questions[key] = (await QuestionModel.create(question))._id;
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
async function getQuizAsStudent(quizId: string) {
    return QuizModel.findById(quizId)
        .select('-answerSheets')
        .select('-author')
        .populate('questions', '-correctAnswer');
}

async function getQuizAsOwner() {}

export default {
    createAQuizFromJSON,
    createAQuizFromExcelSheet,
    getQuizAsOwner,
    getQuizAsStudent,
};
