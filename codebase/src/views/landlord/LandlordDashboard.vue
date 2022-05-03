<template>
  <!--begin::Dashboard-->
  <div class="row gy-5 g-xl-8">
    <div class="col-xxl-4">
      <MixedWidget2
        widget-classes="card-xl-stretch mb-xl-8"
        widget-color="danger"
        chart-height="200"
        stroke-color="#cb1e46"
      ></MixedWidget2>
    </div>
    <div class="col-xxl-4">
      <ListWidget5
        widget-classes="card-xxl-stretch mb-5 mb-xl-10"
      ></ListWidget5>
    </div>
    <div class="col-xxl-4">
      <MixedWidget7
        widget-classes="card-xxl-stretch-50 mb-5 mb-xl-8"
        chart-color="primary"
        chart-height="150"
      ></MixedWidget7>
      <MixedWidget10
        widget-classes="card-xxl-stretch-50 mb-5 mb-xl-8"
        chart-color="primary"
        chart-height="168"
      ></MixedWidget10>
    </div>
  </div>
  <!--end::Dashboard-->
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import ListWidget5 from '@/components/widgets/lists/Widget5.vue';
import MixedWidget2 from '@/components/widgets/mixed/Widget2.vue';
import MixedWidget7 from '@/components/widgets/mixed/Widget7.vue';
import MixedWidget10 from '@/components/widgets/mixed/Widget10.vue';
import { setCurrentPageTitle } from '@/core/helpers/breadcrumb';

export default defineComponent({
  name: 'LandlordDashboard',
  components: {
    ListWidget5,
    MixedWidget2,
    MixedWidget7,
    MixedWidget10,
  },
  setup() {
    onMounted(() => {
      setCurrentPageTitle('Landlord Dashboard');
    });
  },
});
</script>
