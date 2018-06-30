import React, { Component } from 'react';
import Axios from 'axios';
import R from 'ramda';
import Moment from 'moment';
import Chart from './Chart';
// import data from './../../json/luissData.json';
import involvement from './../../json/accountInvolvement.json';
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
import './../../css/chart.css';
import './../../css/Charts.css';
import arrow from './../../img/arrow.svg';

class TrendCharts extends Component {
  state = {
    allDataActivity: [],
    allDataInvolvement: [],
    dataTrendAccountActivity: { accounts: [], daysAndValuesOfLGC: null },
    dataTrendAccountInvolvement: { accounts: [] },
    attivitàCoinvolgimento: [],
    accountSelected: 'luiss guido carli',
  };

  componentDidMount() {
    Axios.get(
      `http://165.227.158.131/dp/api/v155/trend/ma/twitter/order/activity`
    ).then(res => {
      const data = res.data.apiData.data;
      const entitiesAct = this.getEntities(data);
      const daysAndValuesOfLGC = this.getDaysAndValues(
        data,
        'luiss guido carli'
      );

      Axios.get(
        `http://165.227.158.131/dp/api/v155/trend/ma/twitter/order/involvement`
      ).then(resp => {
        const dataInvolvement = resp.data.apiData.data;
        // console.log(dataInvolvement);
        const entitiesInv = this.getEntities(dataInvolvement);
        this.setState({
          allDataActivity: data,
          allDataInvolvement: dataInvolvement,
          dataTrendAccountActivity: {
            accounts: entitiesAct,
            daysAndValuesOfLGC: daysAndValuesOfLGC.days,
          },
          dataTrendAccountInvolvement: {
            accounts: entitiesInv,
          },
        });

        this.formatDataForLineChart(
          'luiss guido carli',
          this.state.allDataActivity,
          this.state.allDataInvolvement
        );
      });
    });
  }

  getEntities = data => data.map(el => el.entity);

  getSingleEntityData = (ent, setOfData) => {
    const getEntity = entità => setOfData.find(el => el.entity === entità);
    return getEntity(ent);
  };

  getDaysAndValues = (data, entity) => data.find(el => el.entity === entity);

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
    // console.log(formattedDate);
    return formattedDate;
  };

  formatDataForLineChart = (ent, setOfDataAct, setOfDataInv) => {
    const entityDataAct = this.getSingleEntityData(ent, setOfDataAct);
    const entityDataInv = this.getSingleEntityData(ent, setOfDataInv);
    const entityDaysAct = entityDataAct.days;
    const entityDaysInv = entityDataInv.days;

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
      attivitàCoinvolgimento: entityDaysActUpdatedWithInvolvementFormattedDate,
    });
    // console.log(entityDaysActUpdatedWithInvolvement);
    return entityDaysActUpdatedWithInvolvementFormattedDate;
  };

  updateLinechart = e => {
    const accountSelected = e.target.innerText;
    // console.log(e.target.innerText);
    this.setState({
      accountSelected,
    });
    this.formatDataForLineChart(
      accountSelected,
      this.state.allDataActivity,
      this.state.allDataInvolvement
    );
  };

  render() {
    return (
      <div className="container-charts">
        <Chart
          title="Quanto sono attivi gli account Luiss?"
          select={this.state.dataTrendAccountActivity.accounts}
          arrow={arrow}
          handleChartSelect={this.updateLinechart}
          accountSelected={this.state.accountSelected}
        >
          <ResponsiveContainer
            width="95%"
            // height={600}
            minWidth={400}
            aspect={4.0 / 3.0}
          >
            <LineChart
              width={600}
              height={300}
              data={this.state.attivitàCoinvolgimento}
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
              <Line type="monotone" dataKey="Coinvolgimento" stroke="#6d7eb0" />
            </LineChart>
          </ResponsiveContainer>
        </Chart>

        <Chart
          title="Quanto coinvolgimento creano gli account Luiss?"
          select={[]}
        >
          <ResponsiveContainer
            width="95%"
            // height={600}
            minWidth={400}
            aspect={4.0 / 3.0}
          >
            <BarChart
              width={730}
              height={250}
              data={this.state.allDataInvolvement}
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
      </div>
    );
  }
}

export default TrendCharts;
