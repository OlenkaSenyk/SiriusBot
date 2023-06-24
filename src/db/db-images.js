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
            {
              disable_web_page_preview: true,
            }
          );        
    })
}
