import { QuizModel } from './quiz.model';
import { QuestionModel } from '../question/question.model';
import { CreateQuizJsonDto } from './dto/create-quiz-json.dto';
import {HttpError} from '../../lib/http-error';

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

async function getQuizAsOwner(userId: string, quizId: string) {
    const quiz = await QuizModel.findById(quizId).populate('questions');
    if(quiz.author._id.toString() !== userId) {
        throw new HttpError(403, 'You don\'t have the permission to access this content')
    }
    return quiz;

}

export default {
    createAQuizFromJSON,
    createAQuizFromExcelSheet,
    getQuizAsOwner,
    getQuizAsStudent,
};
