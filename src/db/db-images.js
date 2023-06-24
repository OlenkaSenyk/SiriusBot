import { generateButton } from "../buttons/generate-button";
async function getPetsInfo(array){
    array.forEach(async element => {
        await ctx.replyWithPhoto({
            source: element.image,
        })
        let text="";
        for(const property of element){
            if(property!='image'){
                text+=element.property+'\n'
            }
        }
        await ctx.replyWithHTML(
            text,
            Markup.inlineKeyboard(await generateButton([
                {
                  text: "На головну ",
                  callback_data: "homeBtn&home",
                },
              ]))
          );        
    })  
}

export {getPetsInfo}
