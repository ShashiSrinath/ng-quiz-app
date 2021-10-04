import { AnswerSheetModel } from './answer-sheet.model';
import { CreateAnswerSheetDTO } from './dto/create-answer-sheet.dto';
import { SubmitSingleAnswerDTO } from './dto/submit-single-answer.dto';

async function createAnswerSheet(data: CreateAnswerSheetDTO) {
    return AnswerSheetModel.create({ ...data, status: 'Ongoing' });
}

async function submitSingleAnswer(data: SubmitSingleAnswerDTO) {
    const { answers } = await AnswerSheetModel.findById(data._id);
    return AnswerSheetModel.findByIdAndUpdate(data._id, {
        answers: { ...answers, ...data.answers },
    });
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
