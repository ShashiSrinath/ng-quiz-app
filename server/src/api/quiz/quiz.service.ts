import { QuizModel } from './quiz.model';
import { QuestionModel } from '../question/question.model';
import { CreateQuizJsonDto } from './dto/create-quiz-json.dto';
import { HttpError } from '../../lib/http-error';
import { Readable, Writable } from 'stream';
import readXlsxFile from 'read-excel-file/node';
import { read, createReadStream } from 'fs';

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

async function createAQuizFromExcelSheet(userid: string, file: unknown, title: string) {
    const readableStream = new Readable({
        read() {
            this.push(file);
            this.push(null);
        },
    });
    const rows = await readXlsxFile(readableStream);
    const arr = [];
    const [headers, ...data] = rows;
    data.forEach((d) => {
        const obj = {};
        for (let i = 0; i < headers.length; i++) {
            obj[headers[i]] = d[i];
        }
        arr.push(obj);
    });
    const questions: any = {};
    for(let i = 0;i<arr.length; i++){
        const qObject: any = {};
        const currentQuiz = arr[i];
        qObject.question = currentQuiz.Question;
        qObject.type = 'mcq';
        qObject.questionNumber = i+1;
        qObject.multipleChoices = [currentQuiz.A, currentQuiz.B, currentQuiz.C, currentQuiz.D];
        qObject.correctAnswer = currentQuiz.Answer;
        questions[qObject.questionNumber] =  qObject;

    }
    return createAQuizFromJSON(userid,{title: title, questions: questions});
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
    if (quiz.author._id.toString() !== userId) {
        throw new HttpError(
            403,
            "You don't have the permission to access this content"
        );
    }
    return quiz;
}

export default {
    createAQuizFromJSON,
    createAQuizFromExcelSheet,
    getQuizAsOwner,
    getQuizAsStudent,
};
