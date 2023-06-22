import { Markup, Telegraf } from "telegraf";
import { config } from "dotenv";
import { getAnswer } from "./db/db-functions.js";
import { getInvoice } from "./payment-functions.js";
import { buttons } from "./buttons/constants.js";

config();

const bot = new Telegraf(process.env.BOT_TOKEN);
let main_msg, start_msg;
let start_msg_cnt = true;

async function botCommand(ctx, text, inline_keyboard) {
  if (start_msg_cnt) {
    await ctx.telegram.deleteMessage(ctx.chat.id, start_msg.message_id);
    start_msg_cnt = false;
  }

  main_msg = await ctx.telegram.editMessageText(
    ctx.chat.id,
    main_msg.message_id,
    null,
    text,
    null,
    null
  );

  await ctx.telegram.editMessageReplyMarkup(
    ctx.chat.id,
    main_msg.message_id,
    null,
    {
      inline_keyboard,
    }
  );
}

bot.start(async (ctx) => {
  try {
    await ctx.replyWithPhoto({
      source: "poster.jpg",
    });

    start_msg = await ctx.replyWithHTML(
      `Привіт, любий друже \u{1F60A}\nТебе вітає телеграм-бот притулку "Сіріус" \u{1F436} \u{1F431} \n`,
      {
        disable_web_page_preview: true,
      }
    );

    main_msg = await ctx.replyWithHTML(
      "Наші послуги",
      Markup.inlineKeyboard(buttons.home_inline_keyboard)
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action("homeBtn", async (ctx) => {
  try {
    await botCommand(ctx, "Наші послуги", buttons.home_inline_keyboard);
  } catch (e) {
    console.error(e);
  }
});

bot.action("withPetBtn", async (ctx) => {
  try {
    await botCommand(
      ctx,
      "Хто твій улюбленець \u{2753}",
      buttons.pet_inline_keyboard
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action("dogsBtn", async (ctx) => {
  try {
    await botCommand(
      ctx,
      "Популярні питання про песиків \u{1F436}",
      buttons.dogs_inline_keyboard
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action("catsBtn", async (ctx) => {
  try {
    await botCommand(
      ctx,
      "Популярні питання про котиків \u{1F431}",
      buttons.cats_inline_keyboard
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action("withoutPetBtn", async (ctx) => {
  try {
    await botCommand(
      ctx,
      "Кого б ви хотіли придбати? \u{1F308}",
      buttons.nopet_inline_keyboard
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action("donateBtn", async (ctx) => {
  try {
    await botCommand(
      ctx,
      "Оберіть суму \u{1F308}",
      buttons.donate_inline_keyboard
    );
  } catch (e) {
    console.error(e);
  }
});

const answer = async (ctx) => {
  try {
    const title = ctx.match[0];
    let back_inline_keyboard;

    if (title.includes("d")) {
      back_inline_keyboard = buttons.dogs_back_inline_keyboard;
    } else {
      back_inline_keyboard = buttons.cats_back_inline_keyboard;
    }

    const result = await getAnswer(title);
    await botCommand(ctx, result, back_inline_keyboard);
  } catch (e) {
    console.error(e);
  }
};

bot.action(/^(d|c).+/, answer);

bot.use(Telegraf.log());

bot.action("50UAHBtn", async (ctx) => {
  return ctx.replyWithInvoice(getInvoice(ctx.from.id, 50));
});

bot.help((ctx) => ctx.reply("/start - розпочати роботу\n/help - допомога"));
bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
