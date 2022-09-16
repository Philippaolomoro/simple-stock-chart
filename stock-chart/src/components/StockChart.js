import React, { useMemo } from "react";

import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import useCryptoData from "../hooks/useCryptoData";
import useEventSource from "../hooks/useEventSource";

const StoreChart = () => {
  const { data, updateData } = useCryptoData();
  useEventSource(updateData, console.error);

  const options = useMemo(
    () => ({
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
          name: "ADA",
          data: data.cardano || [],
        },
        {
          name: "MATIC",
          data: data.matic || [],
        },
        {
          name: "XRP",
          data: data.ripple || [],
        },
      ],
    }),
    [data]
  );

  return (
    <div>
      <HighchartsReact
        options={options}
        highcharts={Highcharts}
        constructorType="stockChart"
      />
    </div>
  );
};

export default StoreChart;
