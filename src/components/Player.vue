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
  props: {
    playerId: {
      default: undefined, // 105859
      type: [Number, undefined],
    },
  },
  data() {
    return {
      playerInfo: {},
      pitches: [],
    };
  },
  methods: {
    getPitches: function () {
      playerSvc.getPitches(this.playerId).then((pitches) => {
        this.pitches = pitches.pitches;
      });
    },
    getPlayer: function () {
      playerSvc.getPlayers(this.playerId).then((player) => {
        this.playerInfo = player;
      });
    },
  },
  mounted() {
    // TODO: chain these api calls
    this.getPitches();
    this.getPlayer();
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
</style>
