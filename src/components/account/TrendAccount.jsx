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
import graphExplanation from './../../data/graphExplanations.json';

class TrendAccount extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    console.log();
    Api.getAllTrendAccountData().then(res => {
      this.setState({
        isLoading: false,
        luissActivity: res[0].activity,
        luissInvolvement: res[0].involvement,
        entitiesActivityInvolvement: [],
      });

      this.formatDataForLineChart(
        'luiss guido carli',
        this.state.luissActivity,
        this.state.luissInvolvement
      );
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

    return luissEntities;
  };

  getSingleEntityData = (ent, setOfData) => {
    const getEntity = entità => setOfData.find(el => el.entity === entità);
    return getEntity(ent);
  };

  changeProp = (prop1, prop2, ogg) => {
    const renameProp = (oldProp, newProp, { [oldProp]: old, ...others }) => ({
      [newProp]: old,
      ...others,
    });

    return renameProp(prop1, prop2, ogg);
  };

  assignNewPropToObj = (newProp, objToAssign) =>
    Object.assign({ [newProp]: 0 }, objToAssign);

  changeFormatDate = date => {
    const formattedDate = Moment(date.substring(0, 16)).format('DD MMM');
    return formattedDate;
  };

  formatDataForLineChart = (ent, setOfDataAct, setOfDataInv) => {
    const entityDataAct = this.getSingleEntityData(ent, setOfDataAct) || [];
    const entityDataInv = this.getSingleEntityData(ent, setOfDataInv) || [];
    const entityDaysAct = entityDataAct.days || [];
    const entityDaysInv = entityDataInv.days || [];

    const entityDaysActUpdated = entityDaysAct.map(el =>
      this.changeProp('value', 'Attività', el)
    );

    const entityDaysActUpdatedWithInvolvement = entityDaysActUpdated.map(el =>
      this.assignNewPropToObj('Coinvolgimento', el)
    );

    for (let i = 0; i < entityDaysActUpdatedWithInvolvement.length; i++) {
      for (let t = 0; t < entityDaysInv.length; t++) {
        if (
          entityDaysActUpdatedWithInvolvement[i].day === entityDaysInv[t].day
        ) {
          entityDaysActUpdatedWithInvolvement[i].Coinvolgimento = Math.floor(
            entityDaysInv[t].value
          );
          break;
        } else {
          entityDaysActUpdatedWithInvolvement[i].Coinvolgimento = 0;
        }
      }
    }

    const entityDaysActUpdatedWithInvolvementFormattedDate = entityDaysActUpdatedWithInvolvement.map(
      el => {
        el.day = this.changeFormatDate(el.day);
        return el;
      }
    );
    // console.log(entityDaysActUpdatedWithInvolvementFormattedDate);

    this.setState({
      entitiesActivityInvolvement: entityDaysActUpdatedWithInvolvementFormattedDate,
    });
    // console.log(entityDaysActUpdatedWithInvolvement);
    return entityDaysActUpdatedWithInvolvementFormattedDate;
  };

  updateChartByEntity = ent => {
    this.formatDataForLineChart(
      ent,
      this.state.luissActivity,
      this.state.luissInvolvement
    );
  };

  showProva = () => {};

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
              formatDataForLineChart={this.updateChartByEntity}
              graphExplanation={graphExplanation[0]}
            >
              <ResponsiveContainer width="95%" aspect={4.0 / 3.0}>
                <LineChart
                  width={600}
                  height={300}
                  data={this.state.entitiesActivityInvolvement}
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
