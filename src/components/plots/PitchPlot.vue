<template>
  <div :style="{ width: width }" ref="container" class="pitch-plot-container">
    <div
      class="pitch-plot"
      :style="{
        width: width,
      }"
    >
      <svg
        style="display: block"
        :width="width"
        :viewBox="
          coordSystem.minX +
          ' ' +
          coordSystem.minY +
          ' ' +
          coordSystem.width +
          ' ' +
          coordSystem.height
        "
        preserveAspectRatio="xMidYMid meet"
        :style="{ 'background-color': backgroundColor }"
        ref="svg"
        @mouseup="mouseupFunc($event)"
        @mousedown="mousedownFunc($event)"
        @mousemove="mousemoveFunc($event)"
      >
        <template v-for="(p, i) in pitches">
          <circle
            :key="'pitch-' + i"
            :class="[
              p.classList,
              { visible: isVisible },
              { selected: p.isSelected },
            ]"
            :cx="p.x"
            :cy="scaleY(p.y)"
            :r="radius"
            :fill="fill(p)"
            :fill-opacity="p.isSelected ? 1 : fillOpacity"
            :stroke="p.isSelected ? selectedStroke : stroke"
            :stroke-opacity="
              p.isSelected ? selectedStrokeOpacity : strokeOpacity
            "
            :stroke-width="p.isSelected ? selectedStrokeWidth : strokeWidth"
            @click="selectPitch(p)"
          />
        </template>
        <rect
          :x="strikezoneCoords.x"
          :y="scaleY(strikezoneCoords.y)"
          :width="strikezoneCoords.width"
          :height="strikezoneCoords.height"
          stroke="#000000"
          :stroke-width="0.02"
          fill-opacity="0"
          style="pointer-events: none"
        />

        <rect
          :x="lassoCoords.x"
          :y="lassoCoords.y"
          :width="lassoCoords.width"
          :height="lassoCoords.height"
          stroke="#000000"
          :stroke-width="0.04"
          fill-opacity="0"
        />
      </svg>
    </div>
  </div>
</template>

<script>
/*

Example pitches 
// [
// 		{
//			x: 0, -- REQUIRED - center of ball - in feet
//			y: 2.17, -- REQUIRED -center of ball - in feet
// 			stroke: 'black',-- REQUIRED - outline color
// 			strokeWidth: .01, -- REQUIRED - outline width - in feet
// 			strokeOpacity: 1, -- REQUIRED - outline opacity
// 			selectedStroke: 'gold', -- OPTIONAL - selected outline color
// 			selectedStrokeWidth: 2,	-- OPTIONAL - selected stroke width - in feet
// 			fillOpacity: 1,	-- REQUIRED - fill opacity
// 			fill: 'blue', -- REQUIRED - fill color
// 			radius: 1.5/12, -- REQUIRED - in feet
// 			isSelected: false, -- OPTIONAL
//			isSelectable: true, -- OPTIONAL (if falsy, balls cannot be selected)
// 			isVisible: true, -- REQUIRED
// 		},
// ]

 */
import { selectableMixin } from "../../utility/selectable";

import playerSvc from "../playerSvc";

export default {
  mixins: [selectableMixin],
  props: {
    width: {
      default: "250px",
      type: String,
    },
    backgroundColor: {
      default: "#DFDFDF",
      type: String,
    },
    pitches: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    const min = 4 / 12;
    const max = 56 / 12;
    const coordSystem = {
      minX: 0 - (max - min) / 2,
      maxX: 0 + (max - min) / 2,
      minY: min,
      maxY: max,
      width: max - min,
      height: max - min,
    };

    return {
      height: null,
      svg: null,

      coordSystem,
      strikezoneCoords: {
        x: -8.5 / 12,
        y: 40 / 12,
        width: 17 / 12,
        height: 20 / 12,
      },

      // x: 0, -- REQUIRED - center of ball - in feet
      // y: 2.17, -- REQUIRED -center of ball - in feet
      stroke: "black", //-- REQUIRED - outline color
      strokeWidth: 0.01, //-- REQUIRED - outline width - in feet
      strokeOpacity: 1, //-- REQUIRED - outline opacity
      selectedStroke: "gold", //-- OPTIONAL - selected outline color
      selectedStrokeWidth: 2, //-- OPTIONAL - selected stroke width - in feet
      fillOpacity: 0.75, //-- REQUIRED - fill opacity
      // fill: "blue", //-- REQUIRED - fill color
      radius: 1.5 / 12, //-- REQUIRED - in feet
      // isSelected: false, //-- OPTIONAL
      // isSelectable: true, //-- OPTIONAL (if falsy, balls cannot be selected)
      isVisible: true, //-- REQUIRED
    };
  },
  computed: {
    selectableItems() {
      return this.pitches.filter((p) => p.isSelectable);
    },
  },
  methods: {
    scaleY(v) {
      return this.coordSystem.maxY - v + this.coordSystem.minY;
    },
    fill(pitch) {
      return playerSvc.pitchColor(pitch.pitchName);
    },
    selectPitch(pitch) {
      this.$emit("selectedPitch", pitch);
    },
  },
};
</script>

<style scoped lang="scss"></style>
