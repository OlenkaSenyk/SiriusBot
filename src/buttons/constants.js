import { createBtn } from "./dynamic.js";
import { emojis_obj } from "./emojis.js";
export const home_inline_keyboard = [
  [
    {
      text: "Є улюбленець "+emojis_obj.withPet,
      callback_data: "withPetBtn",
    },
    {
      text: "Нема улюбленця "+emojis_obj.withoutPet,
      callback_data: "withoutPetBtn",
    },
  ],
  [
    {
      text: "Донати "+emojis_obj.donate,
      callback_data: "donateBtn",
    },
  ],
];

export const pet_inline_keyboard = [
  [
    {
      text: "Песики "+emojis_obj.dog,
      callback_data: "dogsBtn",
    },
  ],
  [
    {
      text: "Котики "+emojis_obj.cat,
      callback_data: "catsBtn",
    },
  ],
  [
    {
      text: "На головну "+emojis_obj.home,
      callback_data: "homeBtn",
    },
  ],
];

export const nopet_inline_keyboard = [
  [
    {
      text: "Песики "+emojis_obj.dog,
      callback_data: "dogsBtn",
    },
  ],
  [
    {
      text: "Котики "+emojis_obj.cat,
      callback_data: "catsBtn",
    },
  ],
  [
    {
      text: "На головну "+emojis_obj.home,
      callback_data: "homeBtn",
    },
  ],
];

export const donate_inline_keyboard = [
  [
    {
      text: "50 UAH \u{1F49C}",
      callback_data: "money50UAHBtn",
    },
  ],
  [
    {
      text: "100 UAH \u{1F49C}",
      callback_data: "money100UAHBtn",
    },
  ],
  [
    {
      text: "250 UAH \u{1F49C}",
      callback_data: "money250UAHBtn",
    },
  ],
  [
    {
      text: "500 UAH \u{1F49C}",
      callback_data: "money500UAHBtn",
    },
  ],
  [
    {
      text: "На головну \u{1F3E0}",
      callback_data: "homeBtn",
    },
  ],
];

export const dogs_back_inline_keyboard = [
  [
    {
      text: "Назад \u{1F436}",
      callback_data: "dogsBtn",
    },
  ],
];

export const cats_back_inline_keyboard = [
  [
    {
      text: "Назад \u{1F431}",
      callback_data: "catsBtn",
    },
  ],
];

export const dogs_inline_keyboard = [
  ...createBtn("d"),
  [
    {
      text: "На головну "+emojis_obj.home,
      callback_data: "homeBtn",
    },
  ],
];

export const cats_inline_keyboard = [
  ...createBtn("c"),
  [
    {
      text: "На головну "+emojis_obj.home,
      callback_data: "homeBtn",
    },
  ],
];
