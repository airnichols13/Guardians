<template>
  <div class="player-banner box">
    <div class="imageContainer">
      <img
        :src="`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/${playerInfo.imgId}/headshot/67/current`"
        alt="Player Image"
      />
    </div>

    <div class="player-info">
      <div class="player-name">
        <h2>{{ playerInfo.fullName }}</h2>
      </div>

      <div class="player-bio">
        <span>
          Age: <span>{{ playerInfo.ageDecimal }}</span>
        </span>
        <span>
          Position: <span>{{ playerInfo.position }}</span>
        </span>
        <span>
          Throws: <span>{{ playerInfo.throws }}</span>
        </span>
      </div>

      <div class="player-contract-info">
        <span>
          Organization: <span>{{ playerInfo.orgAbbr }}</span>
        </span>
        <span>
          Length of Service: <span>{{ playerInfo.serviceTime }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    playerInfo: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.player-banner {
  display: flex;

  > div {
    & ~ div {
      margin-left: $space-7;
    }
  }

  img {
    max-width: 150px;
  }

  span {
    & > span {
      font-weight: $font-bold;
    }

    & ~ span {
      &::before {
        content: " | ";
        color: $secondaryText;
      }
    }
  }
}

.player-info {
  > div {
    & ~ div {
      margin-top: $space-4;
    }
  }
}
</style>
