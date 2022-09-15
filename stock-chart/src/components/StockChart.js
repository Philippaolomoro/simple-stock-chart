import React from "react";

import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import useAxios from "../hooks/useAxios";

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
  console.log(array.length);
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


const StoreChart = () => {

  const { response: cryptoData } = useAxios(`/cryptoData`)

  const cardanoArrayData = getCryptoPrice(cryptoData, "cardano");
  const maticArrayData = getCryptoPrice(cryptoData, "maticNetwork");
  const rippleArrayData = getCryptoPrice(cryptoData, "ripple")

  const cardanoPriceData = multiDimensionalArray(cardanoArrayData, 2)
  const maticPriceData = multiDimensionalArray(maticArrayData, 2);
  const ripplePriceData = multiDimensionalArray(rippleArrayData, 2);

  const options = {
    title: {
      text: "My stock chart",
    },
    rangeSelector: {
      selected: 4,
    },

    yAxis: {
      labels: {
        formatter: function () {
          return (this.value > 0 ? " + " : "") + this.value + "%";
        },
      },
      plotLines: [
        {
          value: 0,
          width: 2,
          color: "silver",
        },
      ],
    },

    plotOptions: {
      series: {
        compare: "percent",
        showInNavigator: true,
      },
    },

    tooltip: {
      pointFormat:
        '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
      valueDecimals: 2,
      split: true,
    },
    series: [
      {
        name: "XRP",
        data: ripplePriceData,
      },
      {
        name: "ADA",
        data: cardanoPriceData,
      },
      {
        name: "MATIC",
        data: maticPriceData,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
    </div>
  );
};

export default StoreChart;
