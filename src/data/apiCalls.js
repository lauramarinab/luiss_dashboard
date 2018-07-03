import Axios from 'axios';

const account = {
  luiss: 'v155',
  people: 'v160',
  competitors: 'v158',
};

const hashtag = {
  luiss: 'v156',
  competitors: 'v159',
};

const getTrendAccountDataBy = (version, behaviour, startDate, endDate) =>
  Axios.get(
    `http://165.227.158.131/dp/api/${version}/trend/ma/twitter/range/${startDate}/${endDate}/order/${behaviour}`
  );
// `http://165.227.158.131/dp/api/v155/trend/ma/twitter/range/${startDate}/${endDate}/order/involvement`
const getAccountDataBy = chart =>
  Axios.get(`http://165.227.158.131/dp/api/v155/${chart}/twitter/ma/100`);

const getAllTrendAccountData = (startDate, endDate) =>
  Axios.all([
    getTrendAccountDataBy(account.luiss, 'activity', startDate, endDate),
    getTrendAccountDataBy(account.luiss, 'involvement', startDate, endDate),
    getTrendAccountDataBy(account.people, 'activity', startDate, endDate),
    getTrendAccountDataBy(account.people, 'involvement', startDate, endDate),
    getTrendAccountDataBy(account.competitors, 'activity', startDate, endDate),
    getTrendAccountDataBy(
      account.competitors,
      'involvement',
      startDate,
      endDate
    ),
  ]).then(arr => [
    {
      type: 'luiss',
      activity: arr[0].data.apiData.data,
      involvement: arr[1].data.apiData.data,
    },
    {
      type: 'people',
      activity: arr[2].data.apiData.data,
      involvement: arr[3].data.apiData.data,
    },
    {
      type: 'competitors',
      activity: arr[4].data.apiData.data,
      involvement: arr[5].data.apiData.data,
    },
  ]);

const getDataByDates = (startDate, endDate) => {};

// getDataByDates = (startDate, endDate) => {
//   Axios.get(
//     `http://165.227.158.131/dp/api/v155/trend/ma/twitter/range/${startDate}/${endDate}/order/involvement`
//   ).then(resp => {
//     // dobbiam avere un riferimento all'account selezionato nel select
//     Axios.get(
//       `http://165.227.158.131/dp/api/v155/trend/ma/twitter/range/${startDate}/${endDate}/order/activity`
//     ).then(res => {
//       this.setState({
//         allDataInvolvement: resp.data.apiData.data,
//         allDataActivity: res.data.apiData.data,
//       });
//       this.formatDataForLineChart(
//         this.state.accountSelected,
//         this.state.allDataActivity,
//         this.state.allDataInvolvement
//       );
//       console.log(resp.data.apiData);
//     });
//   });
// };

export default {
  getAllTrendAccountData,
  getAccountDataBy,
  getTrendAccountDataBy,
  getDataByDates,
};
