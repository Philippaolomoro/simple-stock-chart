import React from "react";

import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import useAxios from "../hooks/useAxios";

const StoreChart = () => {
  const { response: ethereum } = useAxios(
    `/coins/ripple/market_chart?vs_currency=usd&days=90`
  ); 
  const { response: ripple } = useAxios(
    `/coins/ripple/market_chart?vs_currency=usd&days=90`
  );
  const { response: cardano } = useAxios(
    `/coins/cardano/market_chart?vs_currency=usd&days=90`
  );
  const { response: maticNetwork } = useAxios(
    `/coins/matic-network/market_chart?vs_currency=usd&days=90`
  );

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
        name: "ETH",
        data: ethereum?.prices,
      },
      {
        name: "XRP",
        data: ripple?.prices,
      },
      {
        name: "ADA",
        data: cardano?.prices,
      },
      {
        name: "MATIC",
        data: maticNetwork?.prices,
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