<template>
  <div
    class="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed"
  >
    <!--begin::Content-->

    <div class="p-20">
      <router-link to="/dashboard">
        <img
          alt="Logo"
          src="media/grasshopper-transparent-text.png"
          class="h-85px"
        />
      </router-link>
      <router-view></router-view>
    </div>
    <!--end::Content-->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { Actions } from '@/store/enums/StoreEnums';
import { getIllustrationsPath } from '@/core/helpers/assets';

export default defineComponent({
  name: 'AuthLayout',
  components: {},
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch(Actions.ADD_BODY_CLASSNAME, 'bg-body');
      store.dispatch(Actions.ADD_BODY_ATTRIBUTE, {
        qulifiedName: 'style',
        value:
          'background-image: url(media/patterns/header-bg-dark-custom-2.jpg)',
      });
    });

    onUnmounted(() => {
      store.dispatch(Actions.REMOVE_BODY_CLASSNAME, 'bg-body');
    });

    return {
      getIllustrationsPath,
    };
  },
});
</script>
