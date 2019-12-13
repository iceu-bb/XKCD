import axios from 'axios';

const getUrl = (pictureNumber?: number) => {
  return pictureNumber
    ? `http://xkcd.com/${pictureNumber}/info.0.json`
    : 'http://xkcd.com/info.0.json';
};

export const getFunnyPictures = async () => {
  try {
    //get the Lastest pics
    const result = await axios.get(getUrl());
    // get Missing 7 pics
    const values = await getLatestPictures(7, result.data.num);
    return [result.data, ...values];
  } catch (error) {
    throw new Error(`Cannot fetch data correctly, ${error}`);
  }
};

const getLatestPictures = async (picsAmount: number, initialNumber: number) => {
  const numbers = [];
  const promises = [];
  let values;

  // 1) create numbers array
  let i = 1;
  while (i < picsAmount + 1) {
    numbers.push(initialNumber - i);
    i++;
  }

  // 2) create promises array
  numbers.map(number => {
    promises.push(axios.get(getUrl(number)).then(res => res.data));
  });

  // 3) await all promises to resolve
  try {
    values = await axios.all(promises);
    return values;
  } catch (error) {
    throw new Error(`Cannot fetch data correctly, ${error}`);
  }
};
