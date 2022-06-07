<template>
  <div
    class="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed"
    :style="{ backgroundImage: 'url(' + getIllustrationsPath('14.png') + ')' }"
  >
    <!--begin::Content-->
    <div class="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
      <!--begin::Logo-->
      <a href="#" class="mb-12">
        <img
          alt="Logo"
          src="media/grasshopper-transparent-text.png"
          class="h-85px"
        />
      </a>
      <!--end::Logo-->

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
