<template>
  <div id="app" :class="{ playerSelected: playerId }">
    <CleHeader />

    <SelectPlayer :players="players" @selectPlayer="playerSelected" />

    <div class="playerContainer">
      <Player :key="playerId" :playerId="playerId" v-if="playerId" />
    </div>
  </div>
</template>

<script>
import playerSvc from "./components/playerSvc";

import CleHeader from "./components/CleHeader.vue";
import Player from "./components/Player";
import SelectPlayer from "./components/SelectPlayer";

export default {
  name: "App",
  components: {
    Player,
    SelectPlayer,
    CleHeader,
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

  &::after {
    content: "";
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 25%;
    width: 90%;
    margin: 0 auto;
    background: url("./assets/Cleveland-Guardians-logo.svg") top center
      no-repeat;
    background-size: contain;
    opacity: 0.03;
  }

  &.playerSelected {
    padding-top: calc(
      58px + #{$cleHeaderHeight}
    ); // TODO: make variable for select bar height
  }
}

.playerContainer {
  padding: $space-10;
  margin-left: auto;
  margin-right: auto;
  width: 800px;
  max-width: calc(100% - 2rem);
}
</style>
