let currencySymbol = "Inr";
export const setCurrencySymbol = (symbol) => {
  currencySymbol = symbol;
};
export const formatPrice = (price) => {
  return `${currencySymbol}: ${price}`;
};
