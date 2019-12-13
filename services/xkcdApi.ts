import axios from 'axios';

const getUrl = (num?: number) => {
  return num
    ? `http://xkcd.com/${num}/info.0.json`
    : 'http://xkcd.com/info.0.json';
};

export const getLastPic = async () => {
  let result;
  try {
    result = await axios.get(getUrl());
    // alert(JSON.stringify(result.data));
  } catch (error) {
    alert('ERRRROR!');
    return;
  }
  return result.data;
};
