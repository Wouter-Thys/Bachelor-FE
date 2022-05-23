<template>
  <div>
    <div class="input-group mb-5">
      <span id="basic-addon1" class="input-group-text">
        <i class="fa-solid fa-magnifying-glass"></i>
      </span>
      <input type="text" class="form-control" placeholder="Search terrain..." />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UseDropzoneDemo',
  components: {},
  emits: ['searchByMap'],
  setup(props, context) {
    return {};
  },
});
</script>
