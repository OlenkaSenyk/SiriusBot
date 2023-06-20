const { Telegraf, Markup } = require("telegraf");
const { message } = require("telegraf/filters");
require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN);
let main_msg, start_msg 
let start_msg_cnt=true
bot.start(async(ctx) => {
  try {
    await ctx.replyWithPhoto({
      source: "poster.jpg"
    })
    start_msg=await ctx.replyWithHTML(`Привіт, любий друже \u{1F60A}\nТебе вітає телеграм-бот притулку "Сіріус" \u{1F436} \u{1F431} \n` , {
      disable_web_page_preview: true
    })
    main_msg=await ctx.replyWithHTML('Наші послуги', Markup.inlineKeyboard(
      [
        [Markup.button.callback('Є улюбленець \u{2705}', 'withPetBtn'), Markup.button.callback('Нема улюбленця \u{274C}', 'withoutPetBtn')],
        [Markup.button.callback('Донати \u{1F4B0}', 'donateBtn')],
      ]
    ))
  } catch (e) {
    console.error(e);
  }
})
bot.action("homeBtn", async (ctx) => {
  try {
    await ctx.telegram.editMessageText(ctx.chat.id, main_msg.message_id,null,'Наші послуги', null,null);
    await ctx.telegram.editMessageReplyMarkup(
      ctx.chat.id,
      main_msg.message_id,
      null,
      {
        inline_keyboard: [
            [
                {
                    text: 'Є улюбленець \u{2705}',
                    callback_data: "withPetBtn"
                },
                {
                  text:'Нема улюбленця \u{274C}', 
                  callback_data:'withoutPetBtn'
                }
            ],
            [
              {
                  text: 'Донати \u{1F4B0}',
                  callback_data:'donateBtn'
              }
          ]
        ]
      }
      )
  } catch (e) {
    console.error(e);
  }
});
bot.action("withPetBtn", async (ctx) => {
  try {
    if(start_msg_cnt){
      await ctx.telegram.deleteMessage(ctx.chat.id, start_msg.message_id)
      start_msg_cnt=false
    }
    main_msg=await ctx.telegram.editMessageText(ctx.chat.id, main_msg.message_id,null,'Популярні питання \u{2753}', null,null);
    await ctx.telegram.editMessageReplyMarkup(
      ctx.chat.id,
      main_msg.message_id,
      null,
      {
        inline_keyboard: [
            [
                {
                    text: "Песики \u{1F436}",
                    callback_data: "dogsBtn"
                }
            ],
            [
                {
                    text: "Котики \u{1F431}",
                    callback_data: "catsBtn"
                }
            ],
            [
              {
                  text: "На головну \u{1F3E0}",
                  callback_data: "homeBtn"
              }
          ]
        ]
      }
      )
  } catch (e) {
    console.error(e);
  }
});
bot.action("withoutPetBtn", async (ctx) => {
  try {
    if(start_msg_cnt){
      await ctx.telegram.deleteMessage(ctx.chat.id, start_msg.message_id)
      start_msg_cnt=false
    }
    main_msg=await ctx.telegram.editMessageText(ctx.chat.id, main_msg.message_id,null,'Кого б ви хотіли придбати? \u{1F308}', null,null);
    await ctx.telegram.editMessageReplyMarkup(
      ctx.chat.id,
      main_msg.message_id,
      null,
      {
      inline_keyboard: [
            [
                {
                    text: "Песики \u{1F436}",
                    callback_data: "dogsBtn"
                }
            ],
            [
                {
                    text: "Котики \u{1F431}",
                    callback_data: "catsBtn"
                }
            ],
            [
              {
                  text: "На головну \u{1F3E0}",
                  callback_data: "homeBtn"
              }
          ]
        ]
      }
      )
  } catch (e) {
    console.error(e);
  }
});
bot.action("donateBtn", async (ctx) => {
  try {
    if(start_msg_cnt){
      await ctx.telegram.deleteMessage(ctx.chat.id, start_msg.message_id)
      start_msg_cnt=false
    }
    main_msg=await ctx.telegram.editMessageText(ctx.chat.id, main_msg.message_id,null,'Оберіть суму \u{1F308}', null,null);
    await ctx.telegram.editMessageReplyMarkup(
      ctx.chat.id,
      main_msg.message_id,
      null,
      {
      inline_keyboard: [
            [
                {
                    text: "50 UAH \u{1F49C}",
                    callback_data: "50UAHBtn"
                }
            ],
            [
                {
                    text: "100 UAH \u{1F49C}",
                    callback_data: "100UAHBtn"
                }
            ],
            [
              {
                  text: "250 UAH \u{1F49C}",
                  callback_data: "250UAHBtn"
              }
          ],
          [
            {
                text: "500 UAH \u{1F49C}",
                callback_data: "500UAHBtn"
            }
          ],
            [
              {
                  text: "На головну \u{1F3E0}",
                  callback_data: "homeBtn"
              }
          ]
        ]
      }
      )
  } catch (e) {
    console.error(e);
  }
});

const getInvoice = (id, amount) => {
  const invoice = {
    chat_id: id, // Уникальный идентификатор целевого чата или имя пользователя целевого канала
    provider_token: process.env.PROVIDER_TOKEN, // токен выданный через бот @SberbankPaymentBot 
    start_parameter: 'get_access', //Уникальный параметр глубинных ссылок. Если оставить поле пустым, переадресованные копии отправленного сообщения будут иметь кнопку «Оплатить», позволяющую нескольким пользователям производить оплату непосредственно из пересылаемого сообщения, используя один и тот же счет. Если не пусто, перенаправленные копии отправленного сообщения будут иметь кнопку URL с глубокой ссылкой на бота (вместо кнопки оплаты) со значением, используемым в качестве начального параметра.
    title: 'Донати', // Название продукта, 1-32 символа
    description: 'Пожертвувати', // Описание продукта, 1-255 знаков
    currency: 'UAH', // Трехбуквенный код валюты ISO 4217
    prices: [{ label: amount+'UAH', amount: amount * 100 }], // Разбивка цен, сериализованный список компонентов в формате JSON 100 копеек * 100 = 100 рублей
    payload: { // Полезные данные счета-фактуры, определенные ботом, 1–128 байт. Это не будет отображаться пользователю, используйте его для своих внутренних процессов.
      unique_id: `${id}_${Number(new Date())}`,
      provider_token: process.env.PROVIDER_TOKEN 
    }
  }

  return invoice
}

bot.use(Telegraf.log())


bot.action('50UAHBtn', async(ctx)=>{
  return ctx.replyWithInvoice(getInvoice(ctx.from.id, 50)) //  метод replyWithInvoice для выставления счета  
})

// Обработка команды /help
bot.help((ctx) => ctx.reply('Not ready yet :('))
bot.launch();
// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
