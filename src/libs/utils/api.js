import axios from 'axios';

const apiCall = async (apiData, endPoint, method) => {
  const URL = process.env.REACT_APP_BASE_URL + endPoint;
  console.log(apiData);
  try {
    const response = await axios({
      method,
      url: URL,
      ...apiData,
    });
    const { data } = response;
    return data;
  } catch (error) {
      console.log('jokehni woh baat ')
    return ({ message: error.message, status: 'error' });
  }
};

export default apiCall;
