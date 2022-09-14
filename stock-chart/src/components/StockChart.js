import React from "react";

import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import useAxios from "../hooks/useAxios";

const getCryptoPrice = (crypto, coin) => {
  let array ;
  crypto.filter((element) => {
    if (element.name === coin) {
      const newElement = element.price;
      const splitElement = newElement.split(",");
      array = splitElement;
    }
  });
  return array;
};

const crytpoDataToNum = (array) => {
  let newArray = [];
  array.forEach((str) => {
    newArray.push(Number(str));
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

  const cardanoArray = getCryptoPrice(cryptoData, "cardano");
  const maticNetworkArray = getCryptoPrice(cryptoData, "maticNetwork");
  const rippleArray = getCryptoPrice(cryptoData, "ripple")


  const cardanoArrayNum = crytpoDataToNum(cardanoArray);
  const maticArrayNum = crytpoDataToNum(maticNetworkArray);
  const rippleArrayNum = crytpoDataToNum(rippleArray);

  const cardanoPriceData = multiDimensionalArray(cardanoArrayNum, 2)
  const maticNetworkPriceData = multiDimensionalArray(maticArrayNum, 2);
  const ripplePriceData = multiDimensionalArray(rippleArrayNum, 2);


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
        data: maticNetworkPriceData,
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
