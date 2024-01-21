import { months, initObj } from "./statsicsObjs.ts";

const createMonthData = (purchases) => {
  const resultArr = [];
  const monthsValues = { ...initObj };

  for (let purchase of purchases) {
    monthsValues[purchase.month] += purchase.price;
  }

  const keys = Object.keys(monthsValues);
  for (let key of keys) {
    resultArr.push({
      month: months[key],
      count: monthsValues[key],
    });
  }
  return resultArr;
};

export { createMonthData };
