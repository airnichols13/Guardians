<template>
  <div id="app" :class="{ playerSelected: playerId }">
    <SelectPlayer :players="players" @selectPlayer="playerSelected" />

    <Player :key="playerId" :playerId="playerId" v-if="playerId" />
  </div>
</template>

<script>
import playerSvc from "./components/playerSvc";

import Player from "./components/Player";
import SelectPlayer from "./components/SelectPlayer";

export default {
  name: "App",
  components: {
    Player,
    SelectPlayer,
  },
  data() {
    return {
      players: [],
      playerId: "",
    };
  },
  methods: {
    getPlayers: function () {
      playerSvc.getPlayers().then((players) => {
        this.players = players.players;
      });
    },
    playerSelected: function (playerId) {
      this.playerId = playerId;
    },
  },
  mounted() {
    this.getPlayers();
  },
};
</script>

<style lang="scss">
@import "./scss/_variables.scss";

#app {
  background-color: $pageBg;
  min-height: 100%;

  &.playerSelected {
    padding-top: 58px;
  }
}
</style>
