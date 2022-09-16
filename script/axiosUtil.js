const axios = require("axios");

// TODO add crypto api keys

exports.axiosUtil = async () => {
  let list;

  const ripple = axios.get(
    "https://api.coingecko.com/api/v3/coins/ripple/market_chart?vs_currency=usd&days=3"
  );
  const cardano = axios.get(
    "https://api.coingecko.com/api/v3/coins/cardano/market_chart?vs_currency=usd&days=3"
  );
  const maticNetwork = axios.get(
    "https://api.coingecko.com/api/v3/coins/matic-network/market_chart?vs_currency=usd&days=3"
  );

  await axios
    .all([ripple, cardano, maticNetwork])
    .then((responses) => {
      const ripple = responses[0];
      const cardano = responses[1];
      const maticNetwork = responses[2];

      list = { ripple, cardano, maticNetwork };
    })
    .catch((err) => {
      console.error(err);
      return err;
    });

  return list;
};
