import { generateButton } from "../buttons/generate-button.js";
import { Markup } from "telegraf";
import { emojis_obj } from "../emojis/constants-emojis.js";
async function getPetsInfo(ctx, array) {
    array.forEach(async (element) => {
    await ctx.replyWithPhoto({
      url: element["img"],
    });
    let text = "";
    for (const property in element) {
      if(property!=="img"&&property!=="url"&&property!=="_id"){
        text += element[property] +" "+emojis_obj.gheart+ "\n";
      }
    }
    global.start = true;
    global.start_msg_cnt=false;
    await ctx.replyWithHTML(
      text,
      Markup.inlineKeyboard(
        await generateButton([
          {
            text: "На головну ",
            callback_data: "homeBtn&home",
          },
        ])
      )
    );
  });
}

export { getPetsInfo };
