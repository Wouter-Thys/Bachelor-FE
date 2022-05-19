import { ref } from 'vue';
import apiService from '@/core/services/ApiService';
import { TApiResponse, TImages, TTerrain, TUser } from '@/core/helpers/types';
import ApiService from '@/core/services/ApiService';

export default function useTerrains() {
  const terrains = ref(<TTerrain[]>[]);
  const terrain = ref(<TTerrain>{});
  const errors = ref(<TApiResponse>{});

  const getTerrain = async (id) => {
    errors.value = { data: null, message: null };
    await ApiService.get('/terrain', id)
      .then((r) => {
        return (terrain.value = r.data.data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };
  const getTerrains = async () => {
    errors.value = { data: null, message: null };
    await ApiService.get('/terrain')
      .then((r) => {
        return (terrains.value = r.data.data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };
  const getLandlordTerrain = async (id) => {
    errors.value = { data: null, message: null };
    await ApiService.get('/landlord/terrain', id)
      .then((r) => {
        return (terrain.value = r.data.data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };
  const getLandlordTerrains = async () => {
    errors.value = { data: null, message: null };
    await ApiService.get('/landlord/terrain')
      .then((r) => {
        return (terrains.value = r.data.data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };

  return {
    terrain,
    errors,
    terrains,
    getTerrain,
    getTerrains,
    getLandlordTerrain,
    getLandlordTerrains,
  };
}