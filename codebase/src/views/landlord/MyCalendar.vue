<template>
  <div class="card">
    <div class="card-body">
      <FullCalendar ref="fullCalendar" :options="options" />
    </div>
  </div>
  <!--end::Col-->
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import useTerrains from '@/core/composables/terrain';
import '@fullcalendar/core/vdom';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { setCurrentPageTitle } from '@/core/helpers/breadcrumb';
import router from '@/router/router';

export default defineComponent({
  name: 'ProfileProjects',
  components: {
    FullCalendar,
  },
  props: {
    street: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { rentTerrains, getLandlordRentTerrains } = useTerrains();
    const options = ref({
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      aspectRatio: 2,
      events: [{}],
      eventClick: function (info) {
        info.jsEvent.preventDefault(); // don't let the browser navigate

        if (info.event.url) {
          router.push({ path: info.event.url });
        }
      },
    });
    onMounted(async () => {
      setCurrentPageTitle('');
      await getLandlordRentTerrains();
      options.value.events = [];
      rentTerrains.value.forEach((value) => {
        let color = '';
        if (value.approvalStatus === 'pending') color = 'orange';
        if (value.approvalStatus === 'approved') color = 'green';
        if (value.approvalStatus === 'rejected') color = 'red';
        options.value.events.push({
          title:
            value.terrain.name +
            ' - ' +
            value.user.name +
            ' - ' +
            value.approvalStatus,
          start: value.startDate,
          end: value.endDate,
          color: color,
          url: '/terrain/' + value.terrain.id,
        });
      });
    });

    return {
      options,
    };
  },
});
</script>
