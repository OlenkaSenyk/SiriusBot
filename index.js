const { Telegraf, Markup } = require("telegraf");
const { message } = require("telegraf/filters");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
  try {
    await ctx.reply(
      "Welcome",
      Markup.inlineKeyboard([
        [Markup.button.callback("Є улюбленець", "petOwnerBtn")],
        [Markup.button.callback("Нема улюбленця", "guestBtn")],
        [Markup.button.callback("Донати", "donatesBtn")],
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action("petOwnerBtn", async (ctx) => {
  try {
    await ctx.answerCbQuery();
    await ctx.reply(
      "Що тебе цікавить?",
      Markup.inlineKeyboard([
        [Markup.button.callback("...", "Btn1")],
        [Markup.button.callback("...", "Btn2")],
        [Markup.button.callback("..", "Btn3")],
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
