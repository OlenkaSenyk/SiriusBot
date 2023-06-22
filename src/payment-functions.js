export const getInvoice = (id, amount) => {
  return {
    chat_id: id,
    provider_token: process.env.PROVIDER_TOKEN,
    start_parameter: "get_access",
    title: "Донати",
    description: "Пожертвувати",
    currency: "UAH",
    prices: [{ label: amount + "UAH", amount: amount * 100 }],
    payload: {
      unique_id: `${id}_${Number(new Date())}`,
      provider_token: process.env.PROVIDER_TOKEN,
    },
  };
};
