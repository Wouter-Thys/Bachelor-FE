<template>
  <div class="row mb-10">
    <div class="col-10">
      <label class="d-flex align-items-center fs-5 fw-bold mb-2">
        <span class="required">Street</span>
      </label>
      <input
        ref="streetRef"
        class="form-control form-control-lg form-control-solid"
        type="text"
        :value="street"
        placeholder="street..."
        @input="$emit('update:street', $event.target.value)"
      />
    </div>
    <div class="col-2">
      <label class="d-flex align-items-center fs-5 fw-bold mb-2">
        <span class="required">Number</span>
      </label>
      <input
        class="form-control form-control-lg form-control-solid"
        type="text"
        :value="streetNumber"
        placeholder="Number"
        @input="$emit('update:streetNumber', $event.target.value)"
      />
    </div>
  </div>
  <div class="fv-row mb-10">
    <label class="d-flex align-items-center fs-5 fw-bold mb-2">
      <span class="required">Province</span>
    </label>
    <input
      type="text"
      class="form-control form-control-lg form-control-solid"
      :value="administrativeAreaLevel2"
      placeholder="Province..."
      @input="$emit('update:administrativeAreaLevel2', $event.target.value)"
    />
  </div>
  <div class="row">
    <div class="col-6">
      <label class="d-flex align-items-center fs-5 fw-bold mb-2">
        <span class="required">State</span>
      </label>
      <input
        type="text"
        class="form-control form-control-lg form-control-solid"
        :value="locality"
        placeholder="State..."
        @input="$emit('update:locality', $event.target.value)"
      />
    </div>
    <div class="col-6">
      <label class="d-flex align-items-center fs-5 fw-bold mb-2">
        <span class="required">Postal Code</span>
      </label>
      <input
        type="text"
        class="form-control form-control-lg form-control-solid"
        :value="postcode"
        placeholder="Postal Code..."
        @input="$emit('update:postcode', $event.target.value)"
      />
      -
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';

declare let google: any;
export default defineComponent({
  name: 'PlacesInput',
  components: {},
  props: {
    street: {
      type: String,
      default: '',
    },
    streetNumber: {
      type: String,
      default: '',
    },
    postcode: {
      type: String,
      default: '',
    },
    administrativeAreaLevel2: {
      type: String,
      default: '',
    },
    locality: {
      type: String,
      default: '',
    },
  },
  emits: [
    'update:postcode',
    'update:locality',
    'update:administrativeAreaLevel2',
    'update:streetNumber',
    'update:street',
  ],
  setup(props, context) {
    const streetRef = ref();
    let autocomplete;
    onMounted(() => {
      autocomplete = new google.maps.places.Autocomplete(streetRef.value, {
        componentRestrictions: { country: 'be' },
        types: ['address'],
        fields: ['address_components'],
      });
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        console.log(autocomplete.getPlace());
        const mapping = {
          street_number: 'update:streetNumber',
          route: 'update:street',
          locality: 'update:locality',
          administrative_area_level_2: 'update:administrativeAreaLevel2',
          postal_code: 'update:postcode',
        };

        let place = {
          address_components: [],
          ...autocomplete.getPlace(),
        };
        autocomplete.getPlace().address_components.forEach((component) => {
          component.types.forEach((type) => {
            if (mapping.hasOwnProperty(type)) {
              context.emit(mapping[type], component.long_name);
            }
          });
        });
      });
    });
    onUnmounted(() => {
      if (autocomplete) {
        google.maps.event.clearInstanceListeners(autocomplete);
      }
    });
    return {
      streetRef,
    };
  },
});
</script>
