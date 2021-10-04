import { AnswerSheetModel } from './answer-sheet.model';
import { CreateAnswerSheetDTO } from './dto/create-answer-sheet.dto';
import { SubmitSingleAnswerDTO } from './dto/submit-single-answer.dto';
import { QuestionModel } from '../question/question.model';
import { QuizModel } from '../quiz/quiz.model';
import { HttpError } from '../../lib/http-error';

async function createAnswerSheet(data: CreateAnswerSheetDTO) {
    // validate passcode
    const quiz = await QuizModel.findById(data.quizId);
    if (quiz.passcode !== data.passcode) {
        throw new HttpError(401, 'Invalid Passcode');
    }
    return AnswerSheetModel.create({ ...data, status: 'Ongoing' });
}

async function submitSingleAnswer(data: SubmitSingleAnswerDTO) {
    const answerSheet = await AnswerSheetModel.findById(data._id);

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
    answerSheet.answers.set(question.questionNumber.toString(), {
        question: data.questionId,
        answer: data.answer,
    });

    return answerSheet.save();
}

async function finishAnswerSheet(_id: string) {
    return AnswerSheetModel.findByIdAndUpdate(_id, {
        status: 'Finished',
    });
}

export default {
    createAnswerSheet,
    submitSingleAnswer,
    finishAnswerSheet,
};
