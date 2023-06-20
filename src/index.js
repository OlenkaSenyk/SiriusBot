import {Markup, Telegraf} from "telegraf";
import {config} from "dotenv";
import {getAllQuestions, getAnswer} from "./db-functions.js";

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
      Markup.inlineKeyboard([
        [
          Markup.button.callback("Є улюбленець \u{2705}", "withPetBtn"),
          Markup.button.callback("Нема улюбленця \u{274C}", "withoutPetBtn"),
        ],
        [Markup.button.callback("Донати \u{1F4B0}", "donateBtn")],
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action("homeBtn", async (ctx) => {
  try {
    let inline_keyboard = [
      [
        {
          text: "Є улюбленець \u{2705}",
          callback_data: "withPetBtn",
        },
        {
          text: "Нема улюбленця \u{274C}",
          callback_data: "withoutPetBtn",
        },
      ],
      [
        {
          text: "Донати \u{1F4B0}",
          callback_data: "donateBtn",
        },
      ],
    ];
    await botCommand(ctx, "Наші послуги", inline_keyboard);
  } catch (e) {
    console.error(e);
  }
});

bot.action("withPetBtn", async (ctx) => {
  try {
    let inline_keyboard = [
      [
        {
          text: "Песики \u{1F436}",
          callback_data: "dogsBtn",
        },
      ],
      [
        {
          text: "Котики \u{1F431}",
          callback_data: "catsBtn",
        },
      ],
      [
        {
          text: "На головну \u{1F3E0}",
          callback_data: "homeBtn",
        },
      ],
    ];
    await botCommand(ctx, "Хто твій улюбленець \u{2753}", inline_keyboard);
  } catch (e) {
    console.error(e);
  }
});

async function answ() {
  try {
    const result = await getAnswer("d3");
    console.log(result);
  } catch (err) {
    console.log("answ", err);
  }
}

answ();

bot.action("dogsBtn", async (ctx) => {
  try {
    const dogs_questions = await getAllQuestions();
    const dogs_inline_keyboard = [];

    dogs_questions.forEach((question) => {
      if (question.title.includes("d")) {
        const button = {
          text: question.question,
          callback_data: question.title,
        };
        dogs_inline_keyboard.push([button]);
      }
    });

    let inline_keyboard = [
      ...dogs_inline_keyboard,
      [
        {
          text: "На головну \u{1F3E0}",
          callback_data: "homeBtn",
        },
      ],
    ];

    await botCommand(
      ctx,
      "Популярні питання про песиків \u{1F436}",
      inline_keyboard
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action("catsBtn", async (ctx) => {
  try {
    const cats_questions = await getAllQuestions();
    const cats_inline_keyboard = [];

    cats_questions.forEach((question) => {
      if (question.title.includes("c")) {
        const button = {
          text: question.question,
          callback_data: question.title,
        };
        cats_inline_keyboard.push([button]);
      }
    });

    let inline_keyboard = [
      ...cats_inline_keyboard,
      [
        {
          text: "На головну \u{1F3E0}",
          callback_data: "homeBtn",
        },
      ],
    ];

    await botCommand(
      ctx,
      "Популярні питання про котиків \u{1F431}",
      inline_keyboard
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action("withoutPetBtn", async (ctx) => {
  try {
    let inline_keyboard = [
      [
        {
          text: "Песики \u{1F436}",
          callback_data: "dogsBtn",
        },
      ],
      [
        {
          text: "Котики \u{1F431}",
          callback_data: "catsBtn",
        },
      ],
      [
        {
          text: "На головну \u{1F3E0}",
          callback_data: "homeBtn",
        },
      ],
    ];
    await botCommand(
      ctx,
      "Кого б ви хотіли придбати? \u{1F308}",
      inline_keyboard
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action("donateBtn", async (ctx) => {
  try {
    let inline_keyboard = [
      [
        {
          text: "50 UAH \u{1F49C}",
          callback_data: "50UAHBtn",
        },
      ],
      [
        {
          text: "100 UAH \u{1F49C}",
          callback_data: "100UAHBtn",
        },
      ],
      [
        {
          text: "250 UAH \u{1F49C}",
          callback_data: "250UAHBtn",
        },
      ],
      [
        {
          text: "500 UAH \u{1F49C}",
          callback_data: "500UAHBtn",
        },
      ],
      [
        {
          text: "На головну \u{1F3E0}",
          callback_data: "homeBtn",
        },
      ],
    ];
    await botCommand(ctx, "Оберіть суму \u{1F308}", inline_keyboard);
  } catch (e) {
    console.error(e);
  }
});

const getInvoice = (id, amount) => {
  return {
    chat_id: id,
    provider_token: process.env.PROVIDER_TOKEN,
    start_parameter: 'get_access',
    title: 'Донати',
    description: 'Пожертвувати',
    currency: 'UAH',
    prices: [{label: amount + 'UAH', amount: amount * 100}],
    payload: {
      unique_id: `${id}_${Number(new Date())}`,
      provider_token: process.env.PROVIDER_TOKEN
    }
  }
}

bot.use(Telegraf.log())


bot.action('50UAHBtn', async(ctx)=>{
  return ctx.replyWithInvoice(getInvoice(ctx.from.id, 50)) //  метод replyWithInvoice для выставления счета
})

bot.help((ctx) => ctx.reply("Not ready yet :("));
bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
