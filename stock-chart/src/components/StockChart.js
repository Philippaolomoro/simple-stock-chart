import React from "react";

import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import useAxios from "../hooks/useAxios";

const StoreChart = () => {
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

// import Indicators from "highcharts/indicators/indicators-all.js";
// import DragPanes from "highcharts/modules/drag-panes.js";
// import AnnotationsAdvanced from "highcharts/modules/annotations-advanced.js";
// import PriceIndicator from "highcharts/modules/price-indicator.js";
// import FullScreen from "highcharts/modules/full-screen.js";
// import StockTools from "highcharts/modules/stock-tools.js";

// init the module
// Indicators(Highcharts);
// DragPanes(Highcharts);
// AnnotationsAdvanced(Highcharts);
// PriceIndicator(Highcharts);
// FullScreen(Highcharts);
// StockTools(Highcharts);
