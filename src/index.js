import { Telegraf } from "telegraf";
import { config } from "dotenv";
import { botCommand } from "./bot/bot-command.js";
import {
  generateButton,
  generateQuestionsArray,
} from "./buttons/buttons-functions.js";
import { emojis_obj } from "./emojis/constants-emojis.js";
import { getPets } from "./db/db-functions.js";
import { setAnswer, setPetsInfo } from "./db/db-reply.js";
import { getInvoice } from "./bot/payment-functions.js";

config();

const bot = new Telegraf(process.env.BOT_TOKEN);

global.main_msg, global.start_msg;
global.start_msg_cnt = true;
global.start = true;
global.start_index = 0;

let kind = "",
  sex = "",
  age = "",
  size = "";

bot.start(async (ctx) => {
  try {
    global.start = true;
    global.start_msg_cnt = true;
    global.start_index = 0;
    await botCommand(
      ctx,
      "Наші послуги",
      await generateButton([
        [
          { text: "Є улюбленець ", callback_data: "withPetBtn&withPet" },
          {
            text: "Нема улюбленця ",
            callback_data: "withoutPetBtn&withoutPet",
          },
        ],
        { text: "Донати ", callback_data: "donateBtn&donate" },
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action(/homeBtn(&[a-zA-Z]+)?/, async (ctx) => {
  try {
    await botCommand(
      ctx,
      "Наші послуги",
      await generateButton([
        [
          { text: "Є улюбленець ", callback_data: "withPetBtn&withPet" },
          {
            text: "Нема улюбленця ",
            callback_data: "withoutPetBtn&withoutPet",
          },
        ],
        { text: "Донати ", callback_data: "donateBtn&donate" },
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action(/withPetBtn(&[a-zA-Z]+)?/, async (ctx) => {
  try {
    await botCommand(
      ctx,
      "Хто твій улюбленець " + emojis_obj.question,
      await generateButton([
        { text: "Песики ", callback_data: "dogsBtn&dog" },
        { text: "Котики ", callback_data: "catsBtn&cat" },
        { text: "На головну ", callback_data: "homeBtn&home" },
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action(/withoutPetBtn(&[a-zA-Z]+)?/, async (ctx) => {
  try {
    await botCommand(
      ctx,
      "Кого б ви хотіли придбати? " + emojis_obj.rainbow,
      await generateButton([
        { text: "Песики ", callback_data: "takeBtn&dog" },
        { text: "Котики ", callback_data: "takeBtn&cat" },
        { text: "На головну ", callback_data: "homeBtn&home" },
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action(/dogsBtn(&[a-zA-Z]+)?/, async (ctx) => {
  try {
    await botCommand(
      ctx,
      "Популярні питання про песиків " + emojis_obj.dog,
      await generateButton([
        ...generateQuestionsArray("d"),
        {
          text: "На головну ",
          callback_data: "homeBtn&home",
        },
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action(/catsBtn(&[a-zA-Z]+)?/, async (ctx) => {
  try {
    await botCommand(
      ctx,
      "Популярні питання про котиків " + emojis_obj.cat,
      await generateButton([
        ...generateQuestionsArray("c"),
        {
          text: "На головну ",
          callback_data: "homeBtn&home",
        },
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action(/takeBtn(&[a-zA-Z]+)?/, async (ctx) => {
  try {
    if (ctx.match[0].includes("dog")) {
      kind = "песик";
    } else {
      kind = "котик";
    }
    await botCommand(
      ctx,
      "Обирай друга або подругу " + emojis_obj.heart,
      await generateButton([
        { text: "Дівчинка ", callback_data: "girlBtn&girl" },
        { text: "Хлопчик ", callback_data: "boyBtn&boy" },
        { text: "Не грає ролі ", callback_data: "nosexBtn&nodiff" },
        { text: "На головну ", callback_data: "homeBtn&home" },
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action(/(girl|boy|nosex)Btn(&[a-zA-Z]+)?/, async (ctx) => {
  try {
    if (ctx.match[0].includes("boy")) {
      sex = "хлопчик";
    } else if (ctx.match[0].includes("girl")) {
      sex = "дівчинка";
    } else {
      sex = "";
    }

    await botCommand(
      ctx,
      "Обирай вік друга або подруги " + emojis_obj.heart,
      await generateButton([
        { text: "До 1 року ", callback_data: "under1yBtn&heart" },
        { text: "1-5 років ", callback_data: "bet1-5yBtn&heart" },
        { text: "5 і більше років ", callback_data: "more5yBtn&heart" },
        { text: "Не грає ролі ", callback_data: "age0yBtn&nodiff" },
        { text: "На головну ", callback_data: "homeBtn&home" },
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action(/[a-zA-Z]+[0-9]-?[0-9]?yBtn(&[a-zA-Z]+)?/, async (ctx) => {
  try {
    if (ctx.match[0].includes("under1y")) {
      age = "міс";
    } else if (ctx.match[0].includes("bet1-5y")) {
      age = /[1-4] р/;
    } else if (ctx.match[0].includes("more5y")) {
      age = "років";
    } else {
      age = "";
    }
    await botCommand(
      ctx,
      "Обирай розмір друга або подруги " + emojis_obj.heart,
      await generateButton([
        { text: "Маленький ", callback_data: "smallBtn&heart" },
        { text: "Середній ", callback_data: "middleBtn&heart" },
        { text: "Великий ", callback_data: "bigBtn&heart" },
        { text: "Не грає ролі ", callback_data: "nosizeBtn&nodiff" },
        { text: "На головну ", callback_data: "homeBtn&home" },
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action(/(small|middle|big|nosize)Btn&(heart|nodiff)/, async (ctx) => {
  try {
    if (ctx.match[0].includes("small")) {
      size = "маленький";
    } else if (ctx.match[0].includes("middle")) {
      size = "середній";
    } else if (ctx.match[0].includes("big")) {
      size = "великий";
    } else {
      size = "";
    }
    global.start_index = 0;

    const pets = await getPets(kind, sex, age, size);
    // await console.log(pets);

    await setPetsInfo(ctx, pets, global.start_index);
  } catch (e) {
    console.error(e);
  }
});

bot.action(/donateBtn(&[a-zA-Z]+)?/, async (ctx) => {
  try {
    await botCommand(
      ctx,
      "Оберіть суму " + emojis_obj.sum,
      await generateButton([
        { text: "50 UAH ", callback_data: "50Btn&heart" },
        { text: "100 UAH ", callback_data: "100Btn&heart" },
        { text: "150 UAH ", callback_data: "150Btn&heart" },
        { text: "200 UAH ", callback_data: "200Btn&heart" },
        { text: "На головну ", callback_data: "homeBtn&home" },
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action(/^(d|c).+/, setAnswer);

bot.action(/^[0-9]+[a-zA-Z]+/, async (ctx) => {
  await console.log(ctx.match.input.match(/[0-9]+/).toString());
  return ctx.replyWithInvoice(
    getInvoice(ctx.from.id, parseInt(ctx.match.input.match(/[0-9]+/)))
  );
});

bot.action(/showBtn(&[a-zA-Z]+)?/, async (ctx) => {
  const pets = await getPets(kind, sex, age, size);
  await setPetsInfo(ctx, pets, global.start_index);
});

bot.help(async (ctx) => {
  ctx.reply("/start - розпочати роботу\n/help - допомога");
});
bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
