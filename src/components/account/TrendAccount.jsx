import React, { Component } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  Label,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import Moment from 'moment';
import Api from '../../data/apiCalls';
import './../../css/chart.css';
import Spinner from './../Spinner';
import Chart from './../grafici/Chart';

class TrendAccount extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    Api.getAllTrendAccountData().then(res => {
      this.setState({
        isLoading: false,
        luissActivity: res[0].activity,
        luissInvolvement: res[0].involvement,
      });
    });
  }

  getEntities = dataArr => dataArr.map(el => el.entity);

  getAllLuissEntities = () => {
    const luissEntitiesByActivity = this.getEntities(this.state.luissActivity);
    const luissEntitiesByInvolvement = this.getEntities(
      this.state.luissInvolvement
    );
    const luissEntitiesArr = luissEntitiesByActivity.concat(
      luissEntitiesByInvolvement
    );

    // I set eliminano i doppioni nell'array
    const luissEntitiesSet = new Set(luissEntitiesArr);
    const luissEntities = Array.from(luissEntitiesSet);
    console.log(luissEntities);
    return luissEntities;
  };

  showProva = () => {
    this.getAllLuissEntities();
  };

  render() {
    return (
      <div className="container-charts" onClick={this.showProva}>
        {this.state.isLoading && <Spinner />}
        {!this.state.isLoading && (
          <React.Fragment>
            <Chart
              chartTitle="Quanto sono attivi gli account Luiss?"
              doesSelectExist
              selectOptions={this.getAllLuissEntities()}
            >
              <ResponsiveContainer width="95%" aspect={4.0 / 3.0}>
                <LineChart
                  width={600}
                  height={300}
                  data={[]}
                  margin={{ top: 30, right: 20, left: 10, bottom: 30 }}
                >
                  <XAxis
                    dataKey="day"
                    minTickGap={70}
                    // textAnchor=""
                    angle={0}
                    style={{ fontSize: 12, fontWeight: 100 }}
                  />
                  <YAxis style={{ fontSize: 12, fontWeight: 100 }} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Attività"
                    stroke="#ca4f24"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Coinvolgimento"
                    stroke="#6d7eb0"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Chart>
            <Chart
              chartTitle="Quanto coinvolgimento creano gli account Luiss?"
              doesSelectExist={false}
            >
              <ResponsiveContainer width="95%" aspect={4.0 / 3.0}>
                <BarChart
                  width={730}
                  height={250}
                  data={[]}
                  margin={{ top: 40, right: 20, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="entity"
                    minTickGap={-300}
                    textAnchor="end"
                    angle={-40}
                    style={{ fontSize: 0, fontWeight: 100 }}
                  />
                  <YAxis style={{ fontSize: 12, fontWeight: 100 }} />
                  <Tooltip />
                  <Bar dataKey="frequency" fill="#a6ba66">
                    <LabelList
                      dataKey="entity"
                      position="insideBottomLeft"
                      angle={-90}
                      style={{ fontSize: 12, fontWeight: 100 }}
                      offset={17}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Chart>
            <Chart
              chartTitle="Chi è più attivo e coinvolgente nel mondo Luiss?"
              doesSelectExist={false}
            >
              <ResponsiveContainer width="95%" aspect={4.0 / 3.0}>
                <BarChart
                  width={730}
                  height={250}
                  data={[]}
                  margin={{ top: 40, right: 20, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="entity"
                    minTickGap={-300}
                    textAnchor="end"
                    angle={-40}
                    style={{ fontSize: 0, fontWeight: 100 }}
                  />
                  <YAxis style={{ fontSize: 12, fontWeight: 100 }} />
                  <Tooltip />
                  <Bar dataKey="frequency" fill="#a6ba66">
                    <LabelList
                      dataKey="entity"
                      position="insideBottomLeft"
                      angle={-90}
                      style={{ fontSize: 12, fontWeight: 100 }}
                      offset={17}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Chart>
            <Chart
              chartTitle="Quale competitor è più attivo?"
              doesSelectExist={false}
            >
              <ResponsiveContainer width="95%" aspect={4.0 / 3.0}>
                <BarChart
                  width={730}
                  height={250}
                  data={[]}
                  margin={{ top: 40, right: 20, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="entity"
                    minTickGap={-300}
                    textAnchor="end"
                    angle={-40}
                    style={{ fontSize: 0, fontWeight: 100 }}
                  />
                  <YAxis style={{ fontSize: 12, fontWeight: 100 }} />
                  <Tooltip />
                  <Bar dataKey="frequency" fill="#a6ba66">
                    <LabelList
                      dataKey="entity"
                      position="insideBottomLeft"
                      angle={-90}
                      style={{ fontSize: 12, fontWeight: 100 }}
                      offset={17}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Chart>
            <Chart
              chartTitle="Quale competitor coinvolge di più?"
              doesSelectExist={false}
            >
              <ResponsiveContainer width="95%" aspect={4.0 / 3.0}>
                <BarChart
                  width={730}
                  height={250}
                  data={[]}
                  margin={{ top: 40, right: 20, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="entity"
                    minTickGap={-300}
                    textAnchor="end"
                    angle={-40}
                    style={{ fontSize: 0, fontWeight: 100 }}
                  />
                  <YAxis style={{ fontSize: 12, fontWeight: 100 }} />
                  <Tooltip />
                  <Bar dataKey="frequency" fill="#a6ba66">
                    <LabelList
                      dataKey="entity"
                      position="insideBottomLeft"
                      angle={-90}
                      style={{ fontSize: 12, fontWeight: 100 }}
                      offset={17}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Chart>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default TrendAccount;
