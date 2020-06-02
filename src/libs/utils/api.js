import axios from 'axios';

const apiCall = async (apiData, endPoint, method) => {
  const URL = process.env.REACT_APP_BASE_URL + endPoint;
  try {
    const response = await axios({
      method,
      url: URL,
      data: {
        ...apiData,
      },
    });
    const { data } = response;
    return data;
  } catch (error) {
    return ({ message: 'There is an Error!', status: 'error' });
  }
};

export default apiCall;
