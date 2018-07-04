import Moment from 'moment';

const changeProp = (prop1, prop2, ogg) => {
  const renameProp = (oldProp, newProp, { [oldProp]: old, ...others }) => ({
    [newProp]: old,
    ...others,
  });
  return renameProp(prop1, prop2, ogg);
};

const formatDecimalData = decimal => Math.floor(decimal);

const formatInvolvementFrequencyData = arr => {
  const newArr = arr.concat();
  for (let i = 0; i < newArr.length; i++) {
    const dataDaysLength = newArr[i].days.length;

    newArr[i].frequency = formatDecimalData(newArr[i].frequency);
    newArr[i] = changeProp('frequency', 'Coinvolgimento', newArr[i]);
    for (let t = 0; t < dataDaysLength; t++) {
      newArr[i].days[t].value = formatDecimalData(newArr[i].days[t].value);
    }
  }
  return newArr;
};

const assignNewPropToObj = (newProp, objToAssign) =>
  Object.assign({ [newProp]: 0 }, objToAssign);

const changeFormatDate = date => {
  const formattedDate = Moment(date.substring(0, 16)).format('DD MMM');
  return formattedDate;
};

const getSingleEntityData = (ent, setOfData) => {
  const getEntity = entità => setOfData.find(el => el.entity === entità);
  return getEntity(ent);
};

const getEntities = dataArr => dataArr.map(el => el.entity);

const getAllEntities = (typeActivity, typeInvolvement) => {
  const EntitiesByActivity = getEntities(typeActivity);
  const EntitiesByInvolvement = getEntities(typeInvolvement);
  const EntitiesArr = EntitiesByActivity.concat(EntitiesByInvolvement);

  // I set eliminano i doppioni nell'array
  const EntitiesSet = new Set(EntitiesArr);
  const Entities = Array.from(EntitiesSet);

  return Entities;
};

export default {
  changeProp,
  formatDecimalData,
  formatInvolvementFrequencyData,
  assignNewPropToObj,
  changeFormatDate,
  getAllEntities,
  getSingleEntityData,
};
