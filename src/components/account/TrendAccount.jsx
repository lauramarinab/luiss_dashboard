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
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import Api from '../../data/apiCalls';
import './../../css/chart.css';
import Spinner from './../Spinner';
import Chart from './../grafici/Chart';
import graphExplanation from './../../data/graphExplanations.json';
import Helper from './../../helper';

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
      const luissInvolvementBarFormattedData = Helper.formatInvolvementFrequencyData(
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
      });

      this.formatDataForLineChart(
        'luiss guido carli',
        this.state.luissActivity,
        this.state.luissInvolvement
      );
    });
  }

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

  formatDataForLineChart = (ent, setOfDataAct, setOfDataInv) => {
    const entityDataAct = Helper.getSingleEntityData(ent, setOfDataAct) || [];
    const entityDataInv = Helper.getSingleEntityData(ent, setOfDataInv) || [];
    const entityDaysAct = entityDataAct.days || [];
    const entityDaysInv = entityDataInv.days || [];

    let entityDaysActUpdated = [];
    if (entityDaysAct.length !== 0) {
      entityDaysActUpdated = entityDaysAct.map(el =>
        Helper.changeProp('value', 'Attività', el)
      );
    } else {
      entityDaysActUpdated = entityDaysInv.map(el => ({
        Attività: 0,
        day: el.day,
      }));
    }

    const entityDaysActUpdatedWithInvolvement = entityDaysActUpdated.map(el =>
      Helper.assignNewPropToObj('Coinvolgimento', el)
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
        el.day = Helper.changeFormatDate(el.day);
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
      Helper.changeProp('frequency', 'Attività', el)
    );

    const peopleInvolvementFormatted = peopleInvolvement.map(el =>
      Helper.changeProp('frequency', 'Coinvolgimento', el)
    );

    const entities = Helper.getAllEntities(
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
          Coinvolgimento: Helper.formatDecimalData(
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
        Coinvolgimento: Helper.formatDecimalData(
          entitàCoinvolgimento.Coinvolgimento
        ),
        entity: entità,
      };
    };
    const peopleForDoubleBarChart = entities.map(createPeopleAccount);
    return peopleForDoubleBarChart;
  };

  formatDataForDoubleBarChartCompetitor = () => {
    const competitorsActivity = this.state.competitorsActivity;
    const competitorsInvolvement = this.state.competitorsInvolvement;

    const competitorsActivityFormatted = competitorsActivity.map(el =>
      Helper.changeProp('frequency', 'Attività', el)
    );

    const competitorsInvolvementFormatted = competitorsInvolvement.map(el =>
      Helper.changeProp('frequency', 'Coinvolgimento', el)
    );

    const entities = Helper.getAllEntities(
      this.state.competitorsActivity,
      this.state.competitorsInvolvement
    );

    const createCompetitorsAccount = entità => {
      const entitàAttività = competitorsActivityFormatted.find(
        el => el.entity === entità
      );
      const entitàCoinvolgimento = competitorsInvolvementFormatted.find(
        el => el.entity === entità
      );

      if (!entitàAttività) {
        return {
          Attività: 0,
          Coinvolgimento: Helper.formatDecimalData(
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
        Coinvolgimento: Helper.formatDecimalData(
          entitàCoinvolgimento.Coinvolgimento
        ),
        entity: entità,
      };
    };
    const competitorsForDoubleBarChart = entities.map(createCompetitorsAccount);
    return competitorsForDoubleBarChart;
  };

  updateBarchart = (startDate, endDate) => {
    Api.getTrendAccountDataBy('v155', 'involvement', startDate, endDate).then(
      res => {
        const luissInvolvementBarForattedData = Helper.formatInvolvementFrequencyData(
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

  updateDoubleBarchartCompetitors = (startDate, endDate) => {
    Api.getAllTrendAccountData(startDate, endDate).then(res => {
      this.setState({
        competitorsActivity: res[2].activity,
        competitorsInvolvement: res[2].involvement,
      });
      this.formatDataForDoubleBarChartCompetitor();
    });
  };

  render() {
    return (
      <div className="container-charts account-charts">
        {this.state.isLoading && <Spinner />}
        {!this.state.isLoading && (
          <React.Fragment>
            <Chart
              chartTitle="Quanto sono attivi gli account Luiss?"
              doesSelectExist
              selectOptions={Helper.getAllEntities(
                this.state.luissActivity,
                this.state.luissInvolvement
              )}
              selectedOption="luiss guido carli"
              formatDataForLineChart={this.updateChartByEntity}
              graphExplanation={graphExplanation[0]}
              getActivityInvolvementDates={this.getAllTrendAccountDataByDates}
              doesCalendarExist
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
              doesCalendarExist
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
              graphExplanation={graphExplanation[2]}
              getActivityInvolvementDates={this.updateDoubleBarchart}
              doesCalendarExist
            >
              <ResponsiveContainer
                width="95%"
                aspect={4.0 / 3.0}
                className="legend--align-top"
              >
                <BarChart
                  width={730}
                  height={250}
                  data={this.formatDataForDoubleBarChart()}
                  margin={{ top: 10, right: 20, left: 10, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="entity"
                    minTickGap={-300}
                    textAnchor="end"
                    angle={-40}
                    style={{ fontSize: 12, fontWeight: 100 }}
                  />
                  <YAxis style={{ fontSize: 12, fontWeight: 100 }} />
                  <Tooltip />
                  <Legend verticalAlign="top" />
                  <Bar dataKey="Attività" fill="#ca4f24" />
                  <Bar dataKey="Coinvolgimento" fill="#6d7eb0" />
                </BarChart>
              </ResponsiveContainer>
            </Chart>
            <Chart
              chartTitle="Quale competitor di Luiss è più attivo e coinvolgente?"
              doesSelectExist={false}
              graphExplanation={graphExplanation[3]}
              getActivityInvolvementDates={this.updateDoubleBarchartCompetitors}
              doesCalendarExist
            >
              <ResponsiveContainer
                width="95%"
                aspect={4.0 / 3.0}
                className="legend--align-top"
              >
                <BarChart
                  width={730}
                  height={250}
                  data={this.formatDataForDoubleBarChartCompetitor()}
                  margin={{ top: 10, right: 20, left: 10, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="entity"
                    minTickGap={-300}
                    textAnchor="end"
                    angle={-40}
                    style={{ fontSize: 12, fontWeight: 100 }}
                  />
                  <YAxis style={{ fontSize: 12, fontWeight: 100 }} />
                  <Tooltip />
                  <Legend verticalAlign="top" />
                  <Bar dataKey="Attività" fill="#ca4f24" />
                  <Bar dataKey="Coinvolgimento" fill="#6d7eb0" />
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
