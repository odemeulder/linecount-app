import React, { useState, useEffect }  from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

// const data = [
//   {quarter: 1, earnings: 10000},
//   {quarter: 2, earnings: 16500},
//   {quarter: 3, earnings: 14250},
//   {quarter: 4, earnings: 19000}
// ];
const BUCKET_URL = "https://odm-linecount.s3.amazonaws.com/store.json"

function Chart() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const mapper = array => Object.entries(array).map(e => ({"quarter": e[0], "earnings": e[1]}) )
    fetch(BUCKET_URL)
      .then(res => res.json())
      .then(res => setData(mapper(res)))
  })

  return (
    <VictoryChart
      domainPadding={20}
      theme={VictoryTheme.material}
    >
      <VictoryAxis
        // tickValues specifies both the number of ticks and where
        // they are placed on the axis
        tickValues={["2020-03-04", "2020-03-05", "2020-03-09", "2020-03-10"]}
        tickFormat={["2020-03-04", "2020-03-05", "2020-03-09", "2020-03-10"]}
      />
      <VictoryAxis
        dependentAxis
        // tickFormat specifies how ticks should be displayed
        tickFormat={(x) => (`${x / 1000}k`)}
      />

      <VictoryBar
        data={data}
        // data accessor for x values
        x="quarter"
        // data accessor for y values
        y="earnings"
      ></VictoryBar>
    </VictoryChart>
  );
}

export default Chart;
