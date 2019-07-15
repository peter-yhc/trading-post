import axios from 'axios';

export default {

  getStockHistory: async (symbol) => {
    const response = await axios.get(
      `https://i9demdnwbg.execute-api.ap-southeast-2.amazonaws.com/dev/stocks?symbol=${symbol}`);

    response.data.fetchedAt = new Date();
    return response.data;
  }
}

