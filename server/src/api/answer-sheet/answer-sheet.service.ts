import { AnswerSheetModel, IAnswerSheetModel } from './answer-sheet.model';
import { CreateAnswerSheetDTO } from './dto/create-answer-sheet.dto';
import { SubmitSingleAnswerDTO } from './dto/submit-single-answer.dto';
import { IQuestion, QuestionModel } from '../question/question.model';
import { IQuizModel, QuizModel } from '../quiz/quiz.model';
import { HttpError } from '../../lib/http-error';

async function createAnswerSheet(data: CreateAnswerSheetDTO) {
    // validate passcode
    const quiz = await QuizModel.findById(data.quizId);
    if (quiz.passcode !== data.passcode) {
        throw new HttpError(401, 'Invalid Passcode');
    }
    return AnswerSheetModel.create({ ...data, status: 'Ongoing' });
}

async function submitSingleAnswer(
    answerSheerId: string,
    data: SubmitSingleAnswerDTO
) {
    const answerSheet = await AnswerSheetModel.findById(answerSheerId);

    if (answerSheet.status === 'Finished') {
        throw new HttpError(400, 'answer sheet already submitted');
    }

    const quiz = await QuizModel.findOne({
        _id: answerSheet.quizId,
    }).populate('questions');

    if (
        !quiz.questions.get(data.questionNumber.toString()) ||
        quiz.questions.get(data.questionNumber.toString()).id.toString() !==
            data.questionId
    ) {
        throw new HttpError(400, 'invalid question id');
    }

    const question = await QuestionModel.findById(data.questionId);
    if (!answerSheet.answers) {
        answerSheet.answers = new Map();
    }
    answerSheet.answers.set(question.questionNumber.toString(), {
        question: data.questionId,
        answer: data.answer,
    });

    return answerSheet.save();
}

function calculateResults(quiz: IQuizModel, answerSheet: IAnswerSheetModel) {
    let totalCorrectAnswers = 0;
    quiz.questions.forEach((question: IQuestion, key: string) => {
        const answer = answerSheet.answers.get(key);
        if (answer && answer.answer === question.correctAnswer) {
            totalCorrectAnswers++;
        }
    });
    return {
        totalQuestions: quiz.questions.size,
        totalAnswered: answerSheet.answers.size,
        totalCorrectAnswers,
        percentage: `${(
            (totalCorrectAnswers / quiz.questions.size) *
            100
        ).toFixed(2)} %`,
    };
}

async function finishAnswerSheet(answerSheetId: string) {
    const answerSheet: IAnswerSheetModel = await AnswerSheetModel.findById(
        answerSheetId
    );
    const quiz: IQuizModel = await QuizModel.findById(
        answerSheet.quizId
    ).populate('questions');

    const result = calculateResults(quiz, answerSheet);

    await AnswerSheetModel.findByIdAndUpdate(answerSheetId, {
        status: 'Finished',
    });
    return result;
}

export default {
    createAnswerSheet,
    submitSingleAnswer,
    finishAnswerSheet,
    calculateResults,
};
