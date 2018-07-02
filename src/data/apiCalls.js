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

const getTrendAccountDataBy = (version, behaviour) =>
  Axios.get(
    `http://165.227.158.131/dp/api/${version}/trend/ma/twitter/order/${behaviour}`
  );

const getAccountDataBy = chart =>
  Axios.get(`http://165.227.158.131/dp/api/v155/${chart}/twitter/ma/100`);

const getAllTrendAccountData = () =>
  Axios.all([
    getTrendAccountDataBy(account.luiss, 'activity'),
    getTrendAccountDataBy(account.luiss, 'involvement'),
    getTrendAccountDataBy(account.people, 'activity'),
    getTrendAccountDataBy(account.people, 'involvement'),
    getTrendAccountDataBy(account.competitors, 'activity'),
    getTrendAccountDataBy(account.competitors, 'involvement'),
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

export default { getAllTrendAccountData, getAccountDataBy };
