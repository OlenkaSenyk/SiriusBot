import { generateButton } from "../buttons/generate-button.js";
import { Markup } from "telegraf";
import { emojis_obj } from "../emojis/constants-emojis.js";
const cycle_count=3
async function getPetsInfo(ctx, array) {
  let counter=0;
  let i=0;
    for (i=global.start_index; i<array.length; i++){
    if(i<=array.length-1&&counter<cycle_count){
      // await  console.log(i)
      if(array[i]["img"]){
        await ctx.replyWithPhoto({
          url: array[i]["img"],
        });
      }
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
      counter++
      global.start_index++
    }
  };
  
  await console.log(i)
  await console.log(array.length)
  if(global.start_index<=array.length-1){
    await ctx.replyWithHTML(
    "Показати ще "+emojis_obj.gheart,
      Markup.inlineKeyboard(
        await generateButton([
          {
            text: "Показати ",
            callback_data: "showBtn&show",
          },
        ])
      ))
  }
  else{
    await ctx.replyWithHTML(
      array.length? "Повернутись":"На жаль, нікого не знайдено "+"\nСпробуйте змінити фільтри "+emojis_obj.gheart,
      Markup.inlineKeyboard(
        await generateButton([
          {
            text: "На головну ",
            callback_data: "homeBtn&home",
          },
        ])
      ))
  }
  global.start = true;
  global.start_msg_cnt=false;
}

export { getPetsInfo };
