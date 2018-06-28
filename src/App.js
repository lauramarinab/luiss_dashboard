import React, { Component } from 'react';
import './css/App.css';
// import { Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Chart from './components/grafici/Chart';
import data from './json/luissData.json';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

class App extends Component {
  componentDidMount() {
    console.log(data);
  }

  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <Chart>
          <ResponsiveContainer
            width="60%"
            // height={600}
            minWidth={400}
            aspect={4.0 / 3.0}
          >
            <LineChart
              width={600}
              height={300}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                dataKey="day"
                minTickGap={-200}
                textAnchor="end"
                angle={-90}
              />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="activity"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="involvement" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Chart>
      </div>
    );
  }
}

export default App;
