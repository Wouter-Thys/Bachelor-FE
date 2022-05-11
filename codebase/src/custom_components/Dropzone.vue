<template>
  <div>
    <div v-bind="getRootProps()" class="dropzone">
      <input v-bind="getInputProps()" />
      <p v-if="isDragActive">Drop the files here ...</p>
      <p v-else>Drag 'n' drop some files here, or click to select files</p>
      <button class="btn btn-primary" type="button" @click="open">open</button>
    </div>
    <div v-if="previewImages">
      <div
        v-for="(image, index) of previewImages"
        :key="index"
        class="image-input image-input-outline bg-white"
        data-kt-image-input="true"
      >
        <div
          class="image-input-wrapper w-125px h-125px"
          :style="{ 'background-image': 'url(' + image + ')' }"
        ></div>
        <span
          class="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
          data-kt-image-input-action="change"
          data-bs-toggle="tooltip"
          data-bs-dismiss="click"
          title="Remove avatar"
        >
          <i class="bi bi-x fs-2"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useDropzone } from 'vue3-dropzone';
import apiService from '@/core/services/ApiService';

export default defineComponent({
  name: 'UseDropzoneDemo',
  components: {},
  setup() {
    const previewImages = ref<String[]>([]);
    const saveFiles = async (files) => {
      const formData = new FormData();
      for await (const file of files) {
        previewImages.value.push(URL.createObjectURL(file));
        formData.append('images[]', file);
      }
      console.log(previewImages.value);
      apiService
        .post('landlord/terrain/temp-images', formData)
        .then((response) => {
          console.info(response);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    function onDrop(acceptFiles, rejectReasons) {
      saveFiles(acceptFiles); // saveFiles as callback
      console.log(rejectReasons);
    }

    const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop });

    return {
      previewImages,
      getRootProps,
      getInputProps,
      ...rest,
    };
  },
});
</script>
