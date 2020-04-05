import React, { useState, useEffect }  from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label } from 'recharts';
import useWindowDimensions from './useWindowDimensions';

function Chart() {
  const BUCKET_URL = "https://odm-linecount.s3.amazonaws.com/store.json"

  const [data, setData] = useState([]);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    const mapper = array => Object.entries(array).map(e => ({"locDate": e[0], "locCount": e[1]}) )
    fetch(BUCKET_URL)
      .then(res => res.json())
      .then(res => setData(mapper(res)))
  })

  return (
    <LineChart width={width*.9} height={height*.8} data={data}>
      <Line type="monotone" dataKey="locCount" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc"/>
      <XAxis dataKey="locDate">
        <Label value="date" position="insideBottom" offSet="{0}" />
      </XAxis>
      <YAxis />
    </LineChart>
  )
}

export default Chart