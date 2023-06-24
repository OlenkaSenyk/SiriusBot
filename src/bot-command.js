import { Markup } from "telegraf";
import { emojis_obj } from "./emojis/constants-emojis.js";

async function botCommand(ctx, text, inline_keyboard) {
  if (global.start) {
    await ctx.replyWithPhoto({
      source: "poster.jpg",
    });

    global.start_msg = await ctx.replyWithHTML(
      "Привіт, любий друже " +
        emojis_obj.smile +
        '\nТебе вітає телеграм-бот притулку "Сіріус" ' +
        emojis_obj.dog +
        " " +
        emojis_obj.cat,
      {
        disable_web_page_preview: true,
      }
    );

    global.main_msg = await ctx.replyWithHTML(
      text,
      Markup.inlineKeyboard(inline_keyboard)
    );

    global.start = false;
  } else {
    if (global.start_msg_cnt) {
      await ctx.telegram.deleteMessage(
        ctx.chat.id,
        global.start_msg.message_id
      );
      global.start_msg_cnt = false;
    }

    global.main_msg = await ctx.telegram.editMessageText(
      ctx.chat.id,
      global.main_msg.message_id,
      null,
      text,
      null,
      null
    );

    await ctx.telegram.editMessageReplyMarkup(
      ctx.chat.id,
      global.main_msg.message_id,
      null,
      {
        inline_keyboard,
      }
    );
  }
}

export { botCommand };
