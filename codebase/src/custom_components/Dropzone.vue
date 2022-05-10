<template>
  <div>
    <div v-bind="getRootProps()" class="dropzone">
      <input v-bind="getInputProps()" />
      <p v-if="isDragActive">Drop the files here ...</p>
      <p v-else>Drag 'n' drop some files here, or click to select files</p>
      <button class="btn btn-primary" type="button" @click="open">open</button>
    </div>
  </div>
</template>

<script>
import { useDropzone } from 'vue3-dropzone';
import apiService from '@/core/services/ApiService';

export default {
  name: 'UseDropzoneDemo',
  setup() {
    const saveFiles = (files) => {
      console.log(files);
      const formData = new FormData();
      for (const file of files) {
        formData.append('images[]', file);
      }
      apiService
        .post('landlord/terrain/temp-images', formData)
        .then((response) => {
          console.info(response.data);
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
      getRootProps,
      getInputProps,
      ...rest,
    };
  },
};
</script>
