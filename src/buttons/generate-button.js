import { emojis_obj } from "../emojis/constants-emojis.js";
async function generateButton(array){
    let inline_keyboard=[];
    let nested_inline=[]
    let emoji=null
    for(let i=0; i<array.length; i++){
        for(let j=0; j<array[i].length;j++){
            emoji=array[i][j].callback_data.match(/&[a-zA-Z]+/)
            nested_inline.push({text:array[i][j].text+emojis_obj[emoji.toString().substring(1)],callback_data:array[i][j].callback_data})
        }
        emoji=nested_inline.length?null:array[i].callback_data.match(/&[a-zA-Z]+/)
        inline_keyboard.push(nested_inline.length?nested_inline:[{text:array[i].text+emojis_obj[emoji.toString().substring(1)],callback_data:array[i].callback_data}])
        nested_inline=[]
    }
    console.log(inline_keyboard)
    return inline_keyboard
}
export {generateButton}