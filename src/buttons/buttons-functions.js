import { getAllQuestions } from "../db/db-functions.js";
import { emojis_obj } from "../emojis/constants-emojis.js";

const questions = await getAllQuestions();

function generateQuestionsArray(find) {
  let pets_btn = [];

  questions.forEach((question) => {
    if (question.title.includes(find)) {
      const button = {
        text: question.question,
        callback_data: question.title + "&question",
      };

      pets_btn.push(button);
    }
  });

  return pets_btn;
}

async function generateButton(array) {
  let inline_keyboard = [];
  let nested_inline = [];
  let emoji = null;

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      emoji = array[i][j].callback_data.match(/&[a-zA-Z]+/);
      nested_inline.push({
        text: array[i][j].text + emojis_obj[emoji.toString().substring(1)],
        callback_data: array[i][j].callback_data,
      });
    }

    emoji = nested_inline.length
      ? null
      : array[i].callback_data.match(/&[a-zA-Z]+/);

    inline_keyboard.push(
      nested_inline.length
        ? nested_inline
        : [
            {
              text: array[i].text + emojis_obj[emoji.toString().substring(1)],
              callback_data: array[i].callback_data,
            },
          ]
    );

    nested_inline = [];
  }

  return inline_keyboard;
}

export { generateQuestionsArray, generateButton };
