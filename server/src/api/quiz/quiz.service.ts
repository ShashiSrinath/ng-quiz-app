import { QuizModel } from './quiz.model';
import { QuestionModel } from '../question/question.model';
import { CreateQuizJsonDto } from './dto/create-quiz-json.dto';
import { HttpError } from '../../lib/http-error';
import { Readable } from 'stream';
import readXlsxFile from 'read-excel-file/node';
import xlsx, { WorkBook } from 'xlsx';
import { CreateQuizXlsxDto } from './dto/create-quiz-xlsx.dto';
import { AnswerSheetModel } from '../answer-sheet/answer-sheet.model';
import answerSheetService from '../answer-sheet/answer-sheet.service';

async function createAQuizFromJSON(userId: string, data: CreateQuizJsonDto) {
    const questions = {};

    for (const [key, question] of Object.entries(data.questions)) {
        questions[key] = (await QuestionModel.create(question))._id;
    }

    const quizObject = {
        title: data.title,
        passcode: data.passcode,
        questions,
        author: userId,
        answerSheets: [],
    };

    return (await QuizModel.create(quizObject)).populate('questions');
}

async function createAQuizFromExcelSheet(
    userid: string,
    file: unknown,
    inputs: CreateQuizXlsxDto
) {
    /** Read Excel file and convert it to json array **/
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

    /** convert json array into required format */
    const questions: any = {};
    for (let i = 0; i < arr.length; i++) {
        const qObject: any = {};
        const currentQuiz = arr[i];
        qObject.question = currentQuiz.Question;
        qObject.type = 'mcq';
        qObject.questionNumber = i + 1;
        qObject.multipleChoices = [
            currentQuiz.A,
            currentQuiz.B,
            currentQuiz.C,
            currentQuiz.D,
        ];
        qObject.correctAnswer = currentQuiz.Answer;
        questions[qObject.questionNumber] = qObject;
    }
    return createAQuizFromJSON(userid, {
        title: inputs.title,
        passcode: inputs.passcode,
        questions: questions,
    });
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

async function getMyQuizes(userID: string) {
    // @ts-ignore
    return QuizModel.find({ author: userID });
}

async function downloadReport(userId: string, quizId: string) {
    const quiz = await QuizModel.findById(quizId)
        .populate('questions')
        .populate('answerSheets');
    if (quiz.author._id.toString() !== userId) {
        throw new HttpError(
            403,
            "You don't have the permission to access this content"
        );
    }
    const answerSheets = await AnswerSheetModel.find({
        quizId: quizId,
        status: 'Finished',
    });

    const results = [];
    answerSheets.forEach((a) => {
        results.push({
            user: a.userCode,
            ...answerSheetService.calculateResults(quiz, a),
        });
    });
    const workBook = xlsx.utils.book_new();
    const workSheet = xlsx.utils.json_to_sheet(results);
    xlsx.utils.book_append_sheet(workBook, workSheet);
    const file = xlsx.write(workBook, {
        type: 'buffer',
    });
    return { reportBuffer: file, name: `report-${quiz.title}.xlsx` };
}

export default {
    createAQuizFromJSON,
    createAQuizFromExcelSheet,
    getQuizAsOwner,
    getQuizAsStudent,
    downloadReport,
    getMyQuizes,
};
