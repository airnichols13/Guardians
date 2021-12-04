<template>
  <div class="selectPlayer" :class="{ playerSelected: playerId }">
    <div v-if="!playerId">
      <h1>Welcome!</h1>
    </div>

    <div>
      <label>
        <span class="inputText">
          <span v-if="!playerId">Select a Player:</span>
          <span v-else>Player Selected:</span>
        </span>
        <select name="player" v-model="playerId" @change="selectPlayer">
          <option value="">Select</option>
          <option
            v-for="player in players"
            :key="player.playerId"
            :value="player.playerId"
          >
            {{ player.fullName }}
          </option>
        </select>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    players: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {
      playerId: "", // 105859
    };
  },
  methods: {
    selectPlayer: function () {
      this.$emit("selectPlayer", this.playerId);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.selectPlayer {
  overflow: hidden;
  position: absolute;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: $space-10 $space-5;
  max-width: calc(100vw - #{$space-4});
  max-height: calc(100vh - #{$space-4});
  border-radius: $rounded;
  background-color: $white;
  box-shadow: $shadow;
  transition: top 0.2s ease, left 0.2s ease, transform 0.2s ease,
    padding 0.2s ease;

  > div {
    & ~ div {
      margin-top: $space-4;
    }
  }

  &.playerSelected {
    position: fixed;
    top: 0;
    left: 0;
    transform: translate((0, 0));
    width: 100%;
    padding: $space-3;
    border-radius: 0;
  }
}
</style>
