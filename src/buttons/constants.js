import { createBtn } from "./dynamic.js";

export const home_inline_keyboard = [
  [
    {
      text: "Є улюбленець \u{2705}",
      callback_data: "withPetBtn",
    },
    {
      text: "Нема улюбленця \u{274C}",
      callback_data: "withoutPetBtn",
    },
  ],
  [
    {
      text: "Донати \u{1F4B0}",
      callback_data: "donateBtn",
    },
  ],
];

export const pet_inline_keyboard = [
  [
    {
      text: "Песики \u{1F436}",
      callback_data: "dogsBtn",
    },
  ],
  [
    {
      text: "Котики \u{1F431}",
      callback_data: "catsBtn",
    },
  ],
  [
    {
      text: "На головну \u{1F3E0}",
      callback_data: "homeBtn",
    },
  ],
];

export const nopet_inline_keyboard = [
  [
    {
      text: "Песики \u{1F436}",
      callback_data: "dogsBtn",
    },
  ],
  [
    {
      text: "Котики \u{1F431}",
      callback_data: "catsBtn",
    },
  ],
  [
    {
      text: "На головну \u{1F3E0}",
      callback_data: "homeBtn",
    },
  ],
];

export const donate_inline_keyboard = [
  [
    {
      text: "50 UAH \u{1F49C}",
      callback_data: "50UAHBtn",
    },
  ],
  [
    {
      text: "100 UAH \u{1F49C}",
      callback_data: "100UAHBtn",
    },
  ],
  [
    {
      text: "250 UAH \u{1F49C}",
      callback_data: "250UAHBtn",
    },
  ],
  [
    {
      text: "500 UAH \u{1F49C}",
      callback_data: "500UAHBtn",
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
      text: "На головну \u{1F3E0}",
      callback_data: "homeBtn",
    },
  ],
];

export const cats_inline_keyboard = [
  ...createBtn("c"),
  [
    {
      text: "На головну \u{1F3E0}",
      callback_data: "homeBtn",
    },
  ],
];
