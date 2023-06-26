import { generateButton } from "../buttons/buttons-functions.js";
import { getAnswer } from "./db-functions.js";
import { botCommand } from "../bot/bot-command.js";
import { emojis_obj } from "../emojis/constants-emojis.js";
import { Markup } from "telegraf";

const cycle_count = 3;

const setAnswer = async (ctx) => {
  try {
    const title = ctx.match[0].match(/^(d|c)\d+/);
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
      ]);
    }

    const result = await getAnswer(title[0]);

    await botCommand(ctx, result, back_inline_keyboard);
  } catch (e) {
    console.error(e);
  }
};

async function setPetsInfo(ctx, array) {
  let counter = 0;
  let i = 0;

  for (i = global.start_index; i < array.length; i++) {
    if (i <= array.length - 1 && counter < cycle_count) {
      // await  console.log(i)
      if (array[i]["img"] !== "-") {
        await ctx.replyWithPhoto({
          url: array[i]["img"],
        });
      }

      let text = "";

      for (const property in array[i]) {
        if (property !== "img" && property !== "url" && property !== "_id") {
          text += array[i][property] + " " + emojis_obj.gheart + "\n";
        }
      }

      await ctx.replyWithHTML(
        text,
        Markup.inlineKeyboard([
          Markup.button.url(
            "Перейти на сторінку " + emojis_obj.rainbow,
            array[i]["url"]
          ),
        ])
      );

      counter++;
      global.start_index++;
    }
  }

  //await console.log(i);
  //await console.log(array.length);

  if (global.start_index <= array.length - 1) {
    await ctx.replyWithHTML(
      "Показати ще " + emojis_obj.gheart,
      Markup.inlineKeyboard(
        await generateButton([
          {
            text: "Показати ",
            callback_data: "showBtn&show",
          },
          {
            text: "На головну ",
            callback_data: "homeBtn&home",
          },
        ])
      )
    );
  } else {
    await ctx.replyWithHTML(
      array.length
        ? "Повернутись"
        : "На жаль, нікого не знайдено " +
            "\nСпробуйте змінити фільтри " +
            emojis_obj.gheart,
      Markup.inlineKeyboard(
        await generateButton([
          {
            text: "На головну ",
            callback_data: "homeBtn&home",
          },
        ])
      )
    );
  }

  global.start = true;
  global.start_msg_cnt = false;
}

export { setAnswer, setPetsInfo };
