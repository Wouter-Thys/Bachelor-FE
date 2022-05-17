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
        name="street"
        placeholder="street..."
        @input="$emit('update:street', $event.target.value)"
      />
    </div>
    <div class="col-2">
      <label class="d-flex align-items-center fs-5 fw-bold mb-2">
        <span class="required">Number</span>
      </label>
      <input
        required
        class="form-control form-control-lg form-control-solid"
        type="text"
        :value="streetNumber"
        name="streetNumber"
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
      required
      type="text"
      class="form-control form-control-lg form-control-solid"
      :value="province"
      name="province"
      placeholder="Province..."
      @input="$emit('update:province', $event.target.value)"
    />
  </div>
  <div class="row">
    <div class="col-6">
      <label class="d-flex align-items-center fs-5 fw-bold mb-2">
        <span class="required">State</span>
      </label>
      <input
        required
        type="text"
        class="form-control form-control-lg form-control-solid"
        :value="locality"
        name="locality"
        placeholder="State..."
        @input="$emit('update:locality', $event.target.value)"
      />
    </div>
    <div class="col-6">
      <label class="d-flex align-items-center fs-5 fw-bold mb-2">
        <span class="required">Postal Code</span>
      </label>
      <input
        required
        type="text"
        class="form-control form-control-lg form-control-solid"
        :value="postcode"
        name="postcode"
        placeholder="Postal Code..."
        @input="$emit('update:postcode', $event.target.value)"
      />
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
    province: {
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
    'update:province',
    'update:streetNumber',
    'update:street',
  ],
  setup(props, context) {
    const streetRef = ref();
    let autocomplete;

    onMounted(async () => {
      autocomplete = new google.maps.places.Autocomplete(streetRef.value, {
        componentRestrictions: { country: 'be' },
        types: ['address'],
        fields: ['address_components'],
      });
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const mapping = {
          street_number: 'update:streetNumber',
          route: 'update:street',
          locality: 'update:locality',
          administrative_area_level_2: 'update:province',
          postal_code: 'update:postcode',
        };
        for (const type in mapping) {
          context.emit(mapping[type], '');
        }

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
