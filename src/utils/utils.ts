const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatAsPrice = (price: string) =>
  priceFormatter.format(parseFloat(price));
