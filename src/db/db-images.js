import { generateButton } from "../buttons/generate-button.js";
import { Markup } from "telegraf";
async function getPetsInfo(ctx, array) {
    array.forEach(async (element) => {
    // await ctx.replyWithPhoto({
    //   source: element.image,
    // });
    let text = "";
    for (const property in element) {
      if (property != "image") {
        text += element[property] + "\n";
      }
    }
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
