import React, { Component } from 'react';
import Chart from './Chart';
import data from './../../json/luissData.json';
import involvement from './../../json/accountInvolvement.json';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import './../../css/chart.css';
import './../../css/Charts.css';

class TrendCharts extends Component {
  componentDidMount() {
    console.log(data);
  }
  render() {
    return (
      <div className="container-charts">
        <Chart title="Quanto sono attivi gli account Luiss?">
          <ResponsiveContainer
            width="95%"
            // height={600}
            minWidth={400}
            aspect={4.0 / 3.0}
          >
            <LineChart
              width={600}
              height={300}
              data={data}
              margin={{ top: 50, right: 20, left: 10, bottom: 5 }}
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
                stroke="#ca4f24"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="involvement" stroke="#6d7eb0" />
            </LineChart>
          </ResponsiveContainer>
        </Chart>

        <Chart title="Quanto coinvolgimento creano gli account Luiss?">
          <ResponsiveContainer
            width="95%"
            // height={600}
            minWidth={400}
            aspect={4.0 / 3.0}
          >
            <BarChart width={730} height={250} data={involvement}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="entity"
                minTickGap={-200}
                textAnchor="end"
                angle={-90}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="coinvolgimento" fill="#a6ba66" />
            </BarChart>
          </ResponsiveContainer>
        </Chart>
      </div>
    );
  }
}

export default TrendCharts;
