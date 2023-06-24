import { generateButton } from "../buttons/generate-button.js";
import { getAnswer } from "./db-functions.js";
import { botCommand } from "../bot-command.js";
const answer = async (ctx) => {
    try {
      const title = ctx.match[0].match(/^(d|c)[0-9]+/)
      let back_inline_keyboard;
      if (title[0].includes("d")) {
        back_inline_keyboard = await generateButton([
          {
            text: "Назад ",
            callback_data: "dogsBtn&dog",
          },
        ]);
      } else {
        back_inline_keyboard = await generateButton([
          {
            text: "Назад ",
            callback_data: "catsBtn&cat",
          },
        ]);;
      }
      const result = await getAnswer(title[0]);
      await botCommand(ctx, result, back_inline_keyboard);
    } catch (e) {
      console.error(e);
    }
  };
  
  export {answer}