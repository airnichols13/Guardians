export default {
  // https://cle-fe-challenge-services.vercel.app/api/pitches?playerId=105859
  getPitches: async function (playerId) {
    if (playerId) {
      const params = {
        playerId: playerId,
      };

      const pitches = await fetch(
        "https://cle-fe-challenge-services.vercel.app/api/pitches?" +
          new URLSearchParams(params)
      ).then((response) => {
        return response.json();
      });

      return pitches;
    }

    throw Error("No player id!");
  },

  // https://cle-fe-challenge-services.vercel.app/api/players
  // https://cle-fe-challenge-services.vercel.app/api/players?playerId=105859
  getPlayers: async function (playerId) {
    let params = {};

    if (playerId) {
      params.playerId = playerId;
    }

    const players = await fetch(
      "https://cle-fe-challenge-services.vercel.app/api/players?" +
        new URLSearchParams(params)
    ).then((response) => {
      return response.json();
    });

    return players;
  },

  pitchColor: function (pitchName) {
    switch (true) {
      case pitchName === "Changeup":
        return "yellow";
      case pitchName === "Curveball":
        return "green";
      case pitchName === "Cutter":
        return "grey";
      case pitchName === "Fastball":
        return "red";
      case pitchName === "Sinker":
        return "orange";
      case pitchName === "Slider":
        return "blue";
      default:
        return "black";
    }
  },
};
