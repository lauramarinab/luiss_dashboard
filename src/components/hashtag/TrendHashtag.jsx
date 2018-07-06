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
import Helper from './../../helper';

class TrendHashtag extends Component {
  state = {
    isLoading: true,
    hashtagLuissActivity: [],
    hashtagLuissInvolvement: [],
    hashtagCompetitorsActivity: [],
    hashtagCompetitorsInvolvement: [],
    entitiesActivityInvolvement: [],
    hashtagLuissBehaviour: [],
    typeOfData: '',
  };

  componentDidMount() {
    Api.getAllTrendHashtagData('2018-04-01', '2018-05-30').then(res => {
      // Formatta i dati di involvement
      res.forEach(el => {
        Helper.formatInvolvementFrequencyData(el.involvement);
      });

      const hashtagLuissActivityFormatted = res[0].activity.map(el =>
        Helper.changeProp('frequency', 'Attività', el)
      );

      this.setState({
        isLoading: false,
        hashtagLuissActivity: res[0].activity,
        hashtagLuissInvolvement: res[0].involvement,
        // hashtagCompetitorsActivity: res[1].activity,
        // hashtagCompetitorsInvolvement: res[1].involvement,
        hashtagLuissBehaviour: hashtagLuissActivityFormatted,
        typeOfData: 'Attività',
      });

      this.formatDataForLineChart(
        'luiss',
        this.state.hashtagLuissActivity,
        this.state.hashtagLuissInvolvement
      );
    });
  }

  getAllTrendHashtagDataByDates = (startDate, endDate, selectedOption) => {
    Api.getAllTrendAccountData(startDate, endDate).then(res => {
      this.setState({
        hashtagLuissActivity: res[0].activity,
        hashtagLuissInvolvement: res[0].involvement,
      });
      this.formatDataForLineChart(
        selectedOption,
        res[0].activity,
        res[0].involvement
      );
    });
  };

  getAllTrendHashtagDataByDatesRadioButtons = (
    startDate,
    endDate,
    selectedOption
  ) => {
    Api.getAllTrendHashtagData(startDate, endDate).then(res => {
      if (this.state.typeOfData === 'Attività') {
        const hashtagLuissActivityFormatted = res[0].activity.map(el =>
          Helper.changeProp('frequency', 'Attività', el)
        );
        console.log(startDate);

        this.setState({
          hashtagLuissBehaviour: hashtagLuissActivityFormatted,
        });
      } else if (this.state.typeOfData === 'Coinvolgimento') {
        const hashtagLuissInvolvementFormatted = Helper.formatInvolvementFrequencyData(
          res[0].involvement
        );
        this.setState({
          hashtagLuissBehaviour: hashtagLuissInvolvementFormatted,
        });
      }
    });
  };

  formatDataForLineChart = (ent, setOfDataAct, setOfDataInv) => {
    const entityDataAct = Helper.getSingleEntityData(ent, setOfDataAct) || [];
    const entityDataInv = Helper.getSingleEntityData(ent, setOfDataInv) || [];
    console.log(setOfDataAct);
    console.log(setOfDataInv);
    console.log(ent);
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
      this.state.hashtagLuissActivity,
      this.state.hashtagLuissInvolvement
    );
  };

  handleCheck = (behaviour, startDate, endDate) => {
    if (behaviour === 'involvement') {
      Api.getTrendHashtagDataBy('v155', 'involvement', startDate, endDate).then(
        res => {
          const hashtagLuissInvolvement = Helper.formatInvolvementFrequencyData(
            res.data.apiData.data
          );

          this.setState({
            hashtagLuissBehaviour: hashtagLuissInvolvement,
            typeOfData: 'Coinvolgimento',
          });
          console.log(this.state.hashtagLuissBehaviour);
        }
      );
    } else if (behaviour === 'activity') {
      Api.getTrendHashtagDataBy('v155', 'activity', startDate, endDate).then(
        res => {
          const hashtagLuissActivity = res.data.apiData.data;
          const hashtagLuissActivityFormatted = hashtagLuissActivity.map(el =>
            Helper.changeProp('frequency', 'Attività', el)
          );
          this.setState({
            hashtagLuissBehaviour: hashtagLuissActivityFormatted,
            typeOfData: 'Attività',
          });
        }
      );
    }
  };

  render() {
    return (
      <div className="container-charts hashtag-trend-charts">
        {this.state.isLoading && <Spinner />}
        {!this.state.isLoading && (
          <React.Fragment>
            <Chart
              chartTitle="Quanto attivi e coinvolgenti sono gli hashtag che ruotano attorno al mondo Luiss"
              doesSelectExist
              selectOptions={Helper.getAllEntities(
                this.state.hashtagLuissActivity,
                this.state.hashtagLuissInvolvement
              )}
              selectedOption="luiss guido carli"
              formatDataForLineChart={this.updateChartByEntity}
              getActivityInvolvementDates={this.getAllTrendHashtagDataByDates}
              doesCalendarExist
              graphExplanation={graphExplanation[3]}
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
              chartTitle="Quali sono gli hashtag più attivi o coinvolgenti?"
              doesSelectExist={false}
              doesCheckExist
              handleCheck={this.handleCheck}
              getActivityInvolvementDates={this.getAllTrendHashtagDataByDates}
              doesCalendarExist
              graphExplanation={graphExplanation[3]}
            >
              <ResponsiveContainer width="95%" aspect={4.0 / 3.0}>
                <BarChart
                  width={730}
                  height={250}
                  data={this.state.hashtagLuissBehaviour}
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
                  <Bar dataKey={this.state.typeOfData} fill="#a6ba66">
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

export default TrendHashtag;
