<template>
  <div class="">
    <GMapMap
      :center="center"
      :zoom="7"
      map-type-id="terrain"
      style="height: 300px"
    >
      <GMapCluster>
        <GMapMarker
          v-for="(m, index) in markers"
          :key="index"
          :position="m.position"
          :clickable="true"
          :draggable="true"
        />
      </GMapCluster>
    </GMapMap>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GoogleMap',
  components: {},
  props: {
    center: {
      type: Object,
      required: true,
    },
    markers: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
