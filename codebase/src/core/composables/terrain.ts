import { ref } from 'vue';
import { TApiResponse, TTerrain } from '@/core/helpers/types';
import ApiService from '@/core/services/ApiService';
import router from '@/router/router';

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
        router.push({ name: 'landlordDashboard' });
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
        router.push({ name: 'landlordDashboard' });
      });
  };

  const getTerrainBySearch = async (value) => {
    errors.value = { data: null, message: null };
    await ApiService.post('/terrain/search', value)
      .then((r) => {
        return (terrains.value = r.data.data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
        router.push({ name: 'landlordDashboard' });
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
    getTerrainBySearch,
  };
}
