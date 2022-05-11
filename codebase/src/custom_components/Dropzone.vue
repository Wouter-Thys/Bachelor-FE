<template>
  <div>
    <div v-bind="getRootProps()" class="dropzone">
      <input v-bind="getInputProps()" />
      <p v-if="isDragActive">Drop the files here ...</p>
      <p v-else>Drag 'n' drop some files here, or click to select files</p>
      <button class="btn btn-primary" type="button" @click="open">open</button>
    </div>
    <div v-if="previewImages" class="mt-2">
      <div
        v-for="(image, index) of previewImages"
        :key="index"
        class="image-input image-input-outline bg-white m-2"
        data-kt-image-input="true"
      >
        <div
          class="image-input-wrapper w-125px h-125px"
          :style="{ 'background-image': 'url(' + image.url + ')' }"
        ></div>
        <span
          class="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow border border-danger"
          data-kt-image-input-action="change"
          data-bs-toggle="tooltip"
          data-bs-dismiss="click"
          title="Remove avatar"
          @click="deleteImage(image.id)"
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
  emits: ['update-images'],
  setup(props, context) {
    const previewImages = ref<String[]>([]);
    const saveFiles = async (files) => {
      const formData = new FormData();
      for await (const file of files) {
        formData.append('images[]', file);
      }
      apiService
        .post('landlord/terrain/temp-images', formData)
        .then((response) => {
          previewImages.value = response.data;
          context.emit('update-images', previewImages);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const deleteImage = (value) => {
      apiService
        .delete('landlord/terrain/temp-images', value)
        .then((response) => {
          previewImages.value = response.data;
          context.emit('update-images', previewImages);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    function onDrop(acceptFiles, rejectReasons) {
      saveFiles(acceptFiles); // saveFiles as callback
    }

    const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop });

    return {
      previewImages,
      getRootProps,
      getInputProps,
      ...rest,
      deleteImage,
    };
  },
});
</script>
