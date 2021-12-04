<template>
  <div class="player-page">
    <PlayerBanner />

    <div>
      <Panel title="All Pitches">
        <PitchPlot :pitches="pitches" />
      </Panel>
    </div>
  </div>
</template>
<script>
import playerSvc from "./playerSvc";

import PlayerBanner from "./PlayerBanner.vue";
import Panel from "./layout/Panel.vue";
import PitchPlot from "./plots/PitchPlot.vue";

export default {
  components: {
    PlayerBanner,
    Panel,
    PitchPlot,
  },
  data() {
    return {
      playerInfo: {},
      pitches: [],
      playerId: 105859,
      players: [],
    };
  },
  methods: {
    getPitches: function () {
      playerSvc.getPitches(this.playerId).then((pitches) => {
        this.pitches = pitches.pitches;
      });
    },
    getPlayers: function () {
      playerSvc.getPlayers().then((players) => {
        this.players = players;
      });
    },
    getPlayer: function () {
      playerSvc.getPlayers(this.playerId).then((player) => {
        this.playerInfo = player;
      });
    },
  },
  mounted() {
    this.getPitches();
    this.getPlayers();
    this.getPlayer();
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
</style>
