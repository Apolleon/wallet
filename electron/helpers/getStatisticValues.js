const getStatisticValues = (
  collections,
  buysItems,
  thisMonth = new Date().getMonth()
) => {
  let sum = {};
  for (const { collection } of collections) {
    sum[collection] = {
      monthPrice: 0,
      totalPrice: 0,
    };
  }
  for (const { collectionName, price, month } of buysItems) {
    if (month === thisMonth) {
      sum[collectionName].monthPrice += Number(price);
      sum[collectionName].totalPrice += Number(price);
    } else {
      sum[collectionName].totalPrice += Number(price);
    }
  }
  return sum;
};

module.exports = getStatisticValues;
