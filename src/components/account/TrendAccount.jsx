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
  PieChart,
  Pie,
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
    luissActivity: [],
    luissInvolvement: [],
    luissInvolvementBar: [],
    entitiesActivityInvolvement: [],
    peopleActivity: [],
    peopleInvolvement: [],
    peopleActivityInvolvement: [],
    competitorsActivity: [],
    competitorsInvolvement: [],
  };

  componentDidMount() {
    Api.getAllTrendAccountData('2018-04-13', '2018-05-20').then(res => {
      const luissInvolvementBarFormattedData = this.formatInvolvementFrequencyData(
        res[0].involvement
      );
      this.setState({
        isLoading: false,
        luissActivity: res[0].activity,
        luissInvolvement: res[0].involvement,
        luissInvolvementBar: luissInvolvementBarFormattedData,
        peopleActivity: res[1].activity,
        peopleInvolvement: res[1].involvement,
        competitorsActivity: res[2].activity,
        competitorsInvolvement: res[2].involvement,
        // entitiesActivityInvolvement: [],
      });

      this.formatDataForLineChart(
        'luiss guido carli',
        this.state.luissActivity,
        this.state.luissInvolvement
      );
    });
  }

  formatDecimalData = decimal => Math.floor(decimal);

  formatInvolvementFrequencyData = arr => {
    const newArr = arr.concat();
    for (let i = 0; i < newArr.length; i++) {
      const dataDaysLength = newArr[i].days.length;

      newArr[i].frequency = this.formatDecimalData(newArr[i].frequency);
      newArr[i] = this.changeProp('frequency', 'Coinvolgimento', newArr[i]);
      for (let t = 0; t < dataDaysLength; t++) {
        newArr[i].days[t].value = this.formatDecimalData(
          newArr[i].days[t].value
        );
      }
    }
    return newArr;
  };

  getEntities = dataArr => dataArr.map(el => el.entity);

  // getAllLuissEntities = () => {
  //   const luissEntitiesByActivity = this.getEntities(this.state.luissActivity);
  //   const luissEntitiesByInvolvement = this.getEntities(
  //     this.state.luissInvolvement
  //   );
  //   const luissEntitiesArr = luissEntitiesByActivity.concat(
  //     luissEntitiesByInvolvement
  //   );

  //   // I set eliminano i doppioni nell'array
  //   const luissEntitiesSet = new Set(luissEntitiesArr);
  //   const luissEntities = Array.from(luissEntitiesSet);

  //   return luissEntities;
  // };
  getAllEntities = (typeActivity, typeInvolvement) => {
    const EntitiesByActivity = this.getEntities(typeActivity);
    const EntitiesByInvolvement = this.getEntities(typeInvolvement);
    const EntitiesArr = EntitiesByActivity.concat(EntitiesByInvolvement);

    // I set eliminano i doppioni nell'array
    const EntitiesSet = new Set(EntitiesArr);
    const Entities = Array.from(EntitiesSet);

    return Entities;
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

    let entityDaysActUpdated = [];
    if (entityDaysAct.length !== 0) {
      entityDaysActUpdated = entityDaysAct.map(el =>
        this.changeProp('value', 'Attività', el)
      );
    } else {
      entityDaysActUpdated = entityDaysInv.map(el => ({
        Attività: 0,
        day: el.day,
      }));
    }

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

    this.setState({
      entitiesActivityInvolvement: entityDaysActUpdatedWithInvolvementFormattedDate,
    });
    return entityDaysActUpdatedWithInvolvementFormattedDate;
  };

  updateChartByEntity = ent => {
    this.formatDataForLineChart(
      ent,
      this.state.luissActivity,
      this.state.luissInvolvement
    );
  };

  formatDataForDoubleBarChart = () => {
    const peopleActivity = this.state.peopleActivity;
    const peopleInvolvement = this.state.peopleInvolvement;

    const peopleActivityFormatted = peopleActivity.map(el =>
      this.changeProp('frequency', 'Attività', el)
    );

    const peopleInvolvementFormatted = peopleInvolvement.map(el =>
      this.changeProp('frequency', 'Coinvolgimento', el)
    );

    const entities = this.getAllEntities(
      this.state.peopleActivity,
      this.state.peopleInvolvement
    );

    const createPeopleAccount = entità => {
      const entitàAttività = peopleActivityFormatted.find(
        el => el.entity === entità
      );
      const entitàCoinvolgimento = peopleInvolvementFormatted.find(
        el => el.entity === entità
      );

      if (!entitàAttività) {
        return {
          Attività: 0,
          Coinvolgimento: this.formatDecimalData(
            entitàCoinvolgimento.Coinvolgimento
          ),
          entity: entità,
        };
      } else if (!entitàCoinvolgimento) {
        return {
          Attività: entitàAttività.Attività,
          Coinvolgimento: 0,
          entity: entità,
        };
      }
      return {
        Attività: entitàAttività.Attività,
        Coinvolgimento: this.formatDecimalData(
          entitàCoinvolgimento.Coinvolgimento
        ),
        entity: entità,
      };
    };
    const peopleForDoubleBarChart = entities.map(createPeopleAccount);
    return peopleForDoubleBarChart;
  };

  getAllTrendAccountDataByDates = (startDate, endDate, selectedOption) => {
    Api.getAllTrendAccountData(startDate, endDate).then(res => {
      this.setState({
        luissActivity: res[0].activity,
        luissInvolvement: res[0].involvement,
      });
      this.formatDataForLineChart(
        selectedOption,
        res[0].activity,
        res[0].involvement
      );
    });
  };

  updateBarchart = (startDate, endDate) => {
    Api.getTrendAccountDataBy('v155', 'involvement', startDate, endDate).then(
      res => {
        const luissInvolvementBarForattedData = this.formatInvolvementFrequencyData(
          res.data.apiData.data
        );
        this.setState({
          luissInvolvementBar: luissInvolvementBarForattedData,
        });
      }
    );
  };

  updateDoubleBarchart = (startDate, endDate) => {
    Api.getAllTrendAccountData(startDate, endDate).then(res => {
      this.setState({
        peopleActivity: res[1].activity,
        peopleInvolvement: res[1].involvement,
      });
      this.formatDataForDoubleBarChart();
    });
  };

  showProva = () => {
    // console.log(
    //   this.getAllEntities(
    //     this.state.peopleActivity,
    //     this.state.peopleInvolvement
    //   )
    // );
    this.formatDataForDoubleBarChart();
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
              selectOptions={this.getAllEntities(
                this.state.luissActivity,
                this.state.luissInvolvement
              )}
              formatDataForLineChart={this.updateChartByEntity}
              graphExplanation={graphExplanation[0]}
              getActivityInvolvementDates={this.getAllTrendAccountDataByDates}
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
              chartTitle="Quale account Luiss è più coinvolgente?"
              doesSelectExist={false}
              graphExplanation={graphExplanation[1]}
              getActivityInvolvementDates={this.updateBarchart}
            >
              <ResponsiveContainer width="95%" aspect={4.0 / 3.0}>
                <BarChart
                  width={730}
                  height={250}
                  data={this.state.luissInvolvementBar}
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
                  <Bar dataKey="Coinvolgimento" fill="#a6ba66">
                    {/* <LabelList
                      dataKey="entity"
                      position="insideBottomLeft"
                      angle={-90}
                      style={{ fontSize: 12, fontWeight: 100 }}
                      offset={17}
                    /> */}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Chart>
            <Chart
              chartTitle="Chi è più attivo e coinvolgente nel mondo Luiss?"
              doesSelectExist={false}
              graphExplanation={graphExplanation[2]}
              getActivityInvolvementDates={this.updateDoubleBarchart}
            >
              <ResponsiveContainer width="95%" aspect={4.0 / 3.0}>
                <BarChart
                  width={730}
                  height={250}
                  data={this.formatDataForDoubleBarChart()}
                  layout="vertical"
                  margin={{ top: 40, right: 20, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    style={{ fontSize: 12, fontWeight: 100 }}
                  />
                  <YAxis
                    dataKey="entity"
                    type="category"
                    minTickGap={-300}
                    textAnchor="end"
                    angle={-40}
                    style={{ fontSize: 0, fontWeight: 100 }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Attività" fill="#ca4f24">
                    {/* <LabelList
                      dataKey="entity"
                      position="left"
                      angle={0}
                      style={{ fontSize: 16, fontWeight: 700 }}
                      offset={0}
                    /> */}
                  </Bar>
                  <Bar dataKey="Coinvolgimento" fill="#6d7eb0" />
                </BarChart>
              </ResponsiveContainer>
            </Chart>
            <Chart
              chartTitle="Quale competitor è più attivo?"
              doesSelectExist={false}
            >
              <ResponsiveContainer width="95%" aspect={4.0 / 3.0}>
                <PieChart width={730} height={250}>
                  <Tooltip />
                  <Pie
                    data={this.state.competitorsActivity}
                    dataKey="frequency"
                    nameKey="entity"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#ca4f24"
                    label
                  />
                </PieChart>
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
