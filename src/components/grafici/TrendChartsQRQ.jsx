import React, { Component } from 'react';
import Axios from 'axios';
import R from 'ramda';
import '../../css/Charts.css';

class TrendCharts extends Component {
  state = {
    allDataActivity: [],
    allDataInvolvement: [],
    dataTrendAccountActivity: { accounts: null, daysAndValuesOfLGC: null },
    dataTrendAccountInvolvement: { accounts: null },
  };

  componentDidMount() {
    Axios.get(
      `http://165.227.158.131/dp/api/v155/trend/ma/twitter/order/activity`
    ).then(res => {
      const data = res.data.apiData.data;
      const entities = this.getEntities(data);
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
            accounts: entities,
            daysAndValuesOfLGC: daysAndValuesOfLGC.days,
          },
          dataTrendAccountInvolvement: {
            accounts: entitiesInv,
          },
        });
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
    console.log(entityDaysActUpdatedWithInvolvement);
    return entityDaysActUpdatedWithInvolvement;
  };

  render() {
    return (
      <div className="container-charts">
        <h1>{this.state.dataTrendAccountActivity.accounts}</h1>
        <button
          onClick={() =>
            this.formatDataForLineChart(
              'luiss guido carli',
              this.state.allDataActivity,
              this.state.allDataInvolvement
            )
          }
        >
          Premi
        </button>
        <button onClick={this.setDataForTrend}>Trasforma</button>
      </div>
    );
  }
}

export default TrendCharts;
