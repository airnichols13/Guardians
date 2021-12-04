<template>
  <div class="player-page">
    <PlayerBanner :playerInfo="playerInfo" />

    <div class="pitchPlotContainer box">
      <div class="pitchSelectionContainer">
        <div>
          <h3>Available Pitches:</h3>
        </div>

        <div class="inputFields">
          <!-- TODO: is toggling all useful? -->
          <!-- <label class="checkboxLabel">
            <input
              type="checkbox"
              name="selectAllPitchNames"
              v-model="selectAllPitchNames"
              @change="selectAllPitches"
            />
            <span class="checkMark"></span>
            <span class="inputText">Toggle All</span>
          </label> -->

          <label
            class="checkboxLabel"
            v-for="pitchName in pitchNames"
            :key="pitchName"
          >
            <input
              type="checkbox"
              name="selectedPitchNames"
              :value="pitchName"
              v-model="selectedPitchNames"
            />
            <span class="checkMark"></span>
            <span class="inputText">
              <span>
                <span
                  >{{ pitchName }} ({{
                    pitchStats(pitchName).pitches.length
                  }})</span
                >
                <span
                  class="pitchColorSwatch"
                  :style="{ backgroundColor: pitchColor(pitchName) }"
                ></span>
              </span>

              <span class="pitchDetails">
                <span
                  >In Strike Zone:
                  {{ pitchStats(pitchName).inStrikeZone.length }}</span
                >
                <span>Strikes: {{ pitchStats(pitchName).strikes.length }}</span>
                <span>Balls: {{ pitchStats(pitchName).balls.length }}</span>
              </span>
            </span>
          </label>
        </div>
      </div>

      <div class="pitchPlotGraph">
        <Panel title="Pitch Plot">
          <PitchPlot :pitches="pitches" @selectedPitch="pitchSelected" />
        </Panel>
      </div>
    </div>

    <div class="selectedPitchContainer box" v-if="selectedPitch.pitcherId">
      <div>
        <h3>Selected Pitch:</h3>
      </div>

      <div class="pitchPropContainer">
        <span
          class="pitchProp"
          v-for="(value, name, index) in selectedPitch"
          :key="index"
        >
          <span class="name">{{ name }}:</span>
          <span class="value">{{ value }}</span>
        </span>
      </div>
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
      default: undefined, // ex: 105859
      type: [Number, undefined],
    },
  },
  data() {
    return {
      playerInfo: {},
      allPitches: [],
      selectAllPitchNames: true,
      selectedPitchNames: [],
      selectedPitch: {},
    };
  },
  computed: {
    pitchNames: function () {
      return this.allPitches
        .map((pitch) => pitch.pitchName)
        .filter((value, index, self) => self.indexOf(value) === index);
    },
    pitches: function () {
      return this.allPitches.filter((pitch) => {
        return this.selectedPitchNames.indexOf(pitch.pitchName) > -1;
      });
    },
  },
  methods: {
    pitchSelected: function (pitch) {
      this.selectedPitch = pitch;
    },
    pitchColor: function (pitchName) {
      return playerSvc.pitchColor(pitchName);
    },
    pitchStats: function (pitchName) {
      const pitchArray = this.allPitches.filter((pitch) => {
        return pitch.pitchName === pitchName;
      });

      const strikes = pitchArray.filter((pitch) => {
        return pitch.strikes > 0;
      });
      const balls = pitchArray.filter((pitch) => {
        return pitch.balls > 0;
      });
      const inStrikeZone = pitchArray.filter((pitch) => {
        return pitch.inStrikeZone;
      });

      return {
        pitches: pitchArray,
        strikes: strikes,
        balls: balls,
        inStrikeZone: inStrikeZone,
      };
    },
    selectAllPitches: function () {
      this.selectedPitchNames = [];

      if (this.selectAllPitchNames) {
        for (var i = 0; i < this.pitchNames.length; i++) {
          this.selectedPitchNames.push(this.pitchNames[i]);
        }
      }
    },
    getPitches: function () {
      playerSvc.getPitches(this.playerId).then((pitches) => {
        this.allPitches = pitches.pitches;
        this.selectAllPitches();
      });
    },
    getPlayer: function () {
      playerSvc.getPlayers(this.playerId).then((player) => {
        this.playerInfo = player.playerDetail;
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

.pitchPlotContainer {
  display: flex;

  > div {
    flex: 1 1 100%;

    & ~ div {
      margin-left: $space-10;
    }
  }
}

.player-page {
  > div {
    & ~ div {
      margin-top: $space-7;
    }
  }
}

.pitchSelectionContainer {
  > div {
    & ~ div {
      margin-top: $space-3;
    }
  }
}

.pitchColorSwatch {
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: solid 1px black; // TODO: should use same outline as plot circle
}

.pitchPlotGraph {
  display: flex;
  justify-content: center;
}

.pitchDetails {
  display: flex;
  font-size: $text-sm;
  color: $secondaryText;

  > span {
    display: inline-block;

    & ~ span {
      margin-left: $space-2;

      &::before {
        content: " | ";
        color: $secondaryText;
      }
    }
  }
}

.selectedPitchContainer {
  > div {
    & ~ div {
      margin-top: $space-4;
    }
  }
}

.pitchPropContainer {
  column-count: 2;
  column-gap: $space-10;
}

.pitchProp {
  display: flex;
  align-items: center;

  & ~ span {
    margin-top: $space-4;
  }

  > span {
    flex: 1 1 100%;

    &::after {
      content: "";
      display: block;
      border-bottom: dotted 1px #ccc;
    }
  }

  .name {
    text-transform: capitalize;
  }
  .value {
    text-align: right;
  }
}
</style>
