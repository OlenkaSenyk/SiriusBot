import { generateButton } from "../buttons/generate-button.js";
import { Markup } from "telegraf";
import { emojis_obj } from "../emojis/constants-emojis.js";
async function getPetsInfo(ctx, array) {
    for (let i=0; i<array.length; i++){
    await ctx.replyWithPhoto({
      url: array[i]["img"],
    });
    let text = "";
    for (const property in array[i]) {
      if(property!=="img"&&property!=="url"&&property!=="_id"){
        text += array[i][property] +" "+emojis_obj.gheart+ "\n";
      }
    }
    await ctx.replyWithHTML(
      text,
      Markup.inlineKeyboard([Markup.button.url("Перейти на сторінку "+emojis_obj.rainbow, array[i]["url"])])
    )
  };
  await ctx.replyWithHTML(
    'Come back',
    Markup.inlineKeyboard(
      await generateButton([
        {
          text: "Повернутись ",
          callback_data: "homeBtn&home",
        },
      ])
    ))
  global.start = true;
  global.start_msg_cnt=false;
}

export { getPetsInfo };
