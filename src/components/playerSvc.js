import axios from "axios";

axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";

export default {
  // https://cle-fe-challenge-services.vercel.app/api/pitches?playerId=105859
  getPitches: function (playerId) {
    if (playerId) {
      const params = {
        playerId: playerId,
      };

      return axios
        .get("api/pitches", {
          params: params,
        })
        .then(function (response) {
          return response.data;
        });
    }

    throw Error("No player id!");
  },

  // https://cle-fe-challenge-services.vercel.app/api/players
  // https://cle-fe-challenge-services.vercel.app/api/players?playerId=105859
  getPlayers: function (playerId) {
    let params = {};

    if (playerId) {
      params = {
        playerId: playerId,
      };
    }

    return axios
      .get("api/players", {
        params: params,
      })
      .then(function (response) {
        return response.data;
      });
  },
};
