import {useState} from "react";
import updeep from "updeep";

const getCryptoPrice = (crypto, coin) => {
  let array = [];
  let newArray = [];
  crypto.filter((element) => {
    if (element.name === coin) {
      const newElement = element.price;
      const splitElement = newElement.split(",");
      array = splitElement;
    }
  });
  array?.map((str) => {
    newArray?.push(Number(str, 10));
  });
  return newArray;
};

const multiDimensionalArray = (arr, size, newArray = []) => {
  if (!arr.length) return newArray;
  newArray.push(arr.slice(0, size));
  return multiDimensionalArray(arr.slice(size), size, newArray);
};

const transformData = (data) => {
  const parsedData = JSON.parse(data);

  const cardanoPrices = getCryptoPrice(parsedData, "cardano");
  const maticPrices = getCryptoPrice(parsedData, "maticNetwork");
  const ripplePrices = getCryptoPrice(parsedData, "ripple");

  const cardano = multiDimensionalArray(cardanoPrices, 2);
  const matic = multiDimensionalArray(maticPrices, 2);
  const ripple = multiDimensionalArray(ripplePrices, 2);

  return {cardano, matic, ripple}
}

const useCryptoData = (intialData = {}) => {
  const [data, setData] = useState(intialData);

  const updateData = (newData) => {
    setData((currentData) => {
      const transformedData = transformData(newData);
      return updeep(transformedData, currentData);
    });
  };

  return { data, updateData };
};

export default useCryptoData;
