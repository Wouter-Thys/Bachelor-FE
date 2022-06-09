import { ref } from 'vue';
import { TApiResponse, TCampVisa, TTerrainRent } from '@/core/helpers/types';
import ApiService from '@/core/services/ApiService';

export default function useCampVisa() {
  const campVisas = ref(<TCampVisa[]>[]);
  const campVisa = ref(<TCampVisa>{});
  const errors = ref(<TApiResponse>{});
  const rentTerrains = ref(<TTerrainRent[]>[]);
  const isLoading = ref(true);

  const getApprovedTerrains = async () => {
    isLoading.value = true;
    errors.value = { data: null, message: null };
    await ApiService.get('user/approved-rent')
      .then((r) => {
        isLoading.value = false;
        return (rentTerrains.value = r.data.data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };
  const getCampVisa = async (id) => {
    isLoading.value = true;
    errors.value = { data: null, message: null };
    await ApiService.get('user/camp-visa', id)
      .then((r) => {
        isLoading.value = false;
        return (campVisa.value = r.data.data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };
  const getCampVisas = async () => {
    isLoading.value = true;
    errors.value = { data: null, message: null };
    await ApiService.get('user/camp-visa')
      .then((r) => {
        isLoading.value = false;
        return (campVisas.value = r.data.data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };
  const updateCampVisa = async (id, params) => {
    isLoading.value = true;
    errors.value = { data: null, message: null };
    await ApiService.update('user/camp-visa', id, params)
      .then((r) => {
        isLoading.value = false;
        return (campVisa.value = r.data.data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };

  return {
    rentTerrains,
    campVisas,
    campVisa,
    isLoading,
    getApprovedTerrains,
    getCampVisa,
    getCampVisas,
    updateCampVisa,
  };
}
