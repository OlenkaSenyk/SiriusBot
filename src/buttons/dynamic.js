import { getAllQuestions } from "../db-functions.js";

let pets_btn = [];
export const questions = await getAllQuestions();

export function createBtn(find) {
  pets_btn = [];
  questions.forEach((question) => {
    if (question.title.includes(find)) {
      const button = {
        text: question.question,
        callback_data: question.title,
      };
      pets_btn.push([button]);
    }
  });
  return pets_btn;
}
