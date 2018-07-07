import Axios from 'axios';

const account = {
  luiss: 'v155',
  people: 'v160',
  competitors: 'v158',
};

const getTrendAccountDataBy = (version, behaviour, startDate, endDate) =>
  Axios.get(
    `http://165.227.158.131/dp/api/${version}/trend/ma/twitter/range/${startDate}/${endDate}/order/${behaviour}`
  );

const getTrendHashtagDataBy = (version, behaviour, startDate, endDate) =>
  Axios.get(
    `http://165.227.158.131/dp/api/${version}/trend/ht/twitter/range/${startDate}/${endDate}/order/${behaviour}`
  );

const getDataBy = (version, chart, type, startDate, endDate, limit) =>
  Axios.get(
    `http://165.227.158.131/dp/api/${version}/${chart}/twitter/${type}/range/${startDate}/${endDate}/${limit}`
  );

const getAllChordData = () =>
  Axios.all([
    getDataBy('v155', 'chord', 'ma', '2018-04-01', '2018-05-30', 5),
    getDataBy('v158', 'chord', 'ma', '2018-04-01', '2018-05-30', 5),
    getDataBy('v155', 'chord', 'ht', '2018-04-01', '2018-05-30', 5),
    getDataBy('v158', 'chord', 'ht', '2018-04-01', '2018-05-30', 5),
  ]).then(arr => [
    {
      type: 'accountMa',
      data: arr[0].data,
    },
    {
      type: 'competitorMa',
      data: arr[1].data,
    },
    {
      type: 'accountHt',
      data: arr[2].data,
    },
    {
      type: 'competitorHt',
      data: arr[3].data,
    },
  ]);
const getHierarchyDataBy = (version, chart, type, limit) =>
  Axios.get(
    `http://165.227.158.131/dp/api/${version}/${chart}/twitter/${type}/${limit}`
  );

// http://165.227.158.131/dp/api/v155/hierarchy/twitter/ma/100

const getAllHierarchiesData = () =>
  Axios.all([
    getHierarchyDataBy('v155', 'hierarchy', 'ma', 100),
    getHierarchyDataBy('v160', 'hierarchy', 'ma', 100),
    getHierarchyDataBy('v158', 'hierarchy', 'ma', 100),
    getHierarchyDataBy('v155', 'hierarchy', 'ht', 100),
    getHierarchyDataBy('v160', 'hierarchy', 'ht', 100),
    getHierarchyDataBy('v158', 'hierarchy', 'ht', 100),
  ]).then(arr => [
    {
      type: 'accountMa',
      data: arr[0].data.apiData.hierarchy.data,
    },
    {
      type: 'personalitàMa',
      data: arr[1].data.apiData.hierarchy.data,
    },
    {
      type: 'competitorsMa',
      data: arr[2].data.apiData.hierarchy.data,
    },
    {
      type: 'accountHt',
      data: arr[3].data.apiData.hierarchy.data,
    },
    {
      type: 'personalitàHt',
      data: arr[4].data.apiData.hierarchy.data,
    },
    {
      type: 'competitorsHt',
      data: arr[5].data.apiData.hierarchy.data,
    },
  ]);

// netwoek personalità v160
// network competitor account
// network competior hashtag
const getAllNetworksData = () =>
  Axios.all([
    getDataBy('v155', 'network', 'ma', '2018-04-01', '2018-05-30', 20),
    getDataBy('v158', 'network', 'ma', '2018-04-01', '2018-05-30', 20),
    getDataBy('v155', 'network', 'ht', '2018-04-01', '2018-05-30', 20),
    getDataBy('v158', 'network', 'ht', '2018-04-01', '2018-05-30', 20),
  ]).then(arr => [
    {
      type: 'accountMa',
      data: arr[0].data.apiData.network.data,
    },
    {
      type: 'competitorMa',
      data: arr[1].data.apiData.network.data,
    },
    {
      type: 'accountHt',
      data: arr[2].data.apiData.network.data,
    },
    {
      type: 'competitorHt',
      data: arr[3].data.apiData.network.data,
    },
  ]);

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

const getAllTrendHashtagData = (startDate, endDate) =>
  Axios.all([
    getTrendHashtagDataBy(account.luiss, 'activity', startDate, endDate),
    getTrendHashtagDataBy(account.luiss, 'involvement', startDate, endDate),
    getTrendHashtagDataBy(account.competitors, 'activity', startDate, endDate),
    getTrendHashtagDataBy(
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
      type: 'competitors',
      activity: arr[2].data.apiData.data,
      involvement: arr[3].data.apiData.data,
    },
  ]);

export default {
  getAllTrendAccountData,
  getDataBy,
  getTrendAccountDataBy,
  getAllTrendHashtagData,
  getTrendHashtagDataBy,
  getAllNetworksData,
  getAllChordData,
  getAllHierarchiesData,
};
