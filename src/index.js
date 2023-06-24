import { Telegraf } from "telegraf";
import { config } from "dotenv";
import { getInvoice } from "./payment-functions.js";
import { emojis_obj } from "./emojis/constants-emojis.js";
import { createBtn } from "./buttons/dynamic.js";
import { botCommand } from "./bot-command.js";
import { answer } from "./db/db-reply.js";
import { generateButton } from "./buttons/generate-button.js";
config();
const bot = new Telegraf(process.env.BOT_TOKEN);
global.main_msg, global.start_msg;
global.start_msg_cnt = true;
global.start=true;


bot.start(async (ctx) => {
  try {
    global.start=true;
    await botCommand(ctx, "Наші послуги",await generateButton([[{text:"Є улюбленець ", callback_data:"withPetBtn&withPet"},{text:"Нема улюбленця ", callback_data:"withoutPetBtn&withoutPet"}],{text:"Донати ", callback_data:"donateBtn&donate"}]));
  } catch (e) {
    console.error(e);
  }
});

bot.action(/homeBtn(&[a-zA-Z]+)?/, async (ctx) => {
  try {
    await botCommand(ctx, "Наші послуги",await generateButton([[{text:"Є улюбленець ", callback_data:"withPetBtn&withPet"},{text:"Нема улюбленця ", callback_data:"withoutPetBtn&withoutPet"}],{text:"Донати ", callback_data:"donateBtn&donate"}]));
  } catch (e) {
    console.error(e);
  }
});

bot.action(/withPetBtn(&[a-zA-Z]+)?/, async (ctx) => {
  try {
    await botCommand(
      ctx,
      "Хто твій улюбленець "+emojis_obj.question,
      await generateButton([{text: "Песики ",callback_data: "dogsBtn&dog"},{text: "Котики ",callback_data: "catsBtn&cat",},{text: "На головну ",callback_data: "homeBtn&home",}]));
  } catch (e) {
    console.error(e);
  }
});

bot.action(/dogsBtn(&[a-zA-Z]+)?/, async (ctx) => {
  try {
    await botCommand(
      ctx,
      "Популярні питання про песиків "+emojis_obj.dog,
      await generateButton([
        ...createBtn("d"),
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
      "Популярні питання про котиків "+emojis_obj.cat,
      await generateButton([...createBtn("c"),
        {
          text: "На головну ",
          callback_data: "homeBtn&home",
        }]));
  } catch (e) {
    console.error(e);
  }
});

bot.action(/withoutPetBtn(&[a-zA-Z]+)?/, async (ctx) => {
  try {
    await botCommand(
      ctx,
      "Кого б ви хотіли придбати? "+emojis_obj.rainbow,
      await generateButton([{text: "Песики ",callback_data: "takeBtn&dog"},{text: "Котики ",callback_data: "takeBtn&cat",},{text: "На головну ",callback_data: "homeBtn&home",}])
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action(/takeBtn(&[a-zA-Z]+)?/, async (ctx) => {
  try {
    await botCommand(
      ctx,
      "Обирай друга або подругу "+emojis_obj.heart,
      await generateButton([{text:'Дівчинка ', callback_data:'girlBtn&girl'},{text:'Хлопчик ', callback_data:'boyBtn&boy'},{text:'Не грає ролі ', callback_data:'noDiffBtn&nodiff'},{text:'На головну ', callback_data:'homeBtn&home'}])
    );
  } catch (e) {
    console.error(e);
  }
})


bot.action(/(girl|boy)Btn(&[a-zA-Z]+)?/, async (ctx) => {
  try {
    await botCommand(
      ctx,
      "Обирай вік друга або подруги"+emojis_obj.heart,
      await generateButton([{text:'Дівчинка ', callback_data:'girlBtn&girl'},{text:'Хлопчик ', callback_data:'boyBtn&boy'},{text:'Не грає ролі ', callback_data:'noDiffBtn&nodiff'},{text:'На головну ', callback_data:'homeBtn&home'}])
    );
  } catch (e) {
    console.error(e);
  }
})

bot.action(/donateBtn(&[a-zA-Z]+)?/, async (ctx) => {
  try {
    await botCommand(
      ctx,
      "Оберіть суму "+emojis_obj.sum,
      await generateButton([{text:'50 UAH ', callback_data:'50Btn&heart'},{text:'100 UAH ', callback_data:'100Btn&heart'},{text:'150 UAH ', callback_data:'150Btn&heart'},{text:'200 UAH ', callback_data:'200Btn&heart'},{text:'На головну ', callback_data:'homeBtn&home'}])
    );
  } catch (e) {
    console.error(e);
  }
});


bot.action(/^(d|c).+/, answer);

bot.action(/[0-9]+[a-zA-Z]+/, async(ctx)=>{
  return ctx.replyWithInvoice(getInvoice(ctx.from.id, parseInt(ctx.match.input.match(/[0-9]+/))))
})

bot.help((ctx) => ctx.reply("/start - розпочати роботу\n/help - допомога"));
bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
