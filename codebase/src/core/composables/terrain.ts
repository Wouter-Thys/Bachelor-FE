import { ref } from 'vue';
import { TApiResponse, TTerrain, TTerrainRent } from '@/core/helpers/types';
import ApiService from '@/core/services/ApiService';
import router from '@/router/router';

export default function useTerrains() {
  const terrains = ref(<TTerrain[]>[]);
  const terrain = ref(<TTerrain>{});
  const rentTerrains = ref(<TTerrainRent[]>[]);
  const errors = ref(<TApiResponse>{});
  const isLoading = ref(true);

  const getTerrain = async (id) => {
    isLoading.value = true;
    errors.value = { data: null, message: null };
    await ApiService.get('/terrain', id)
      .then((r) => {
        isLoading.value = false;
        return (terrain.value = r.data.data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };
  const getTerrains = async () => {
    isLoading.value = true;
    errors.value = { data: null, message: null };
    await ApiService.get('/terrain')
      .then((r) => {
        isLoading.value = false;
        return (terrains.value = r.data.data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };
  const getLandlordTerrain = async (id) => {
    isLoading.value = true;
    errors.value = { data: null, message: null };
    await ApiService.get('/landlord/terrain', id)
      .then((r) => {
        isLoading.value = false;
        return (terrain.value = r.data.data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
        router.push({ name: 'landlordDashboard' });
      });
  };
  const getLandlordTerrains = async () => {
    isLoading.value = true;
    errors.value = { data: null, message: null };
    await ApiService.get('/landlord/terrain')
      .then((r) => {
        isLoading.value = false;
        return (terrains.value = r.data.data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
        router.push({ name: 'landlordDashboard' });
      });
  };

  const getTerrainBySearch = async (value) => {
    isLoading.value = true;
    errors.value = { data: null, message: null };
    await ApiService.post('/terrain/search', value)
      .then((r) => {
        isLoading.value = false;
        return (terrains.value = r.data.data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
        router.push({ name: 'dashboard' });
      });
  };

  const getLandlordTerrainsRentRequest = async () => {
    isLoading.value = true;
    errors.value = { data: null, message: null };
    await ApiService.get('/landlord/rent-request')
      .then((r) => {
        isLoading.value = false;
        return (rentTerrains.value = r.data.data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };

  const getUserTerrainsRentRequest = async () => {
    isLoading.value = true;
    errors.value = { data: null, message: null };
    await ApiService.get('/user/terrain-rent')
      .then((r) => {
        isLoading.value = false;
        return (rentTerrains.value = r.data.data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };
  const getLandlordRentTerrains = async () => {
    isLoading.value = true;
    errors.value = { data: null, message: null };
    await ApiService.get('/landlord/my-calendar')
      .then((r) => {
        isLoading.value = false;
        return (rentTerrains.value = r.data.data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };
  const deleteUserTerrainsRentRequest = async (value) => {
    isLoading.value = true;
    errors.value = { data: null, message: null };
    await ApiService.delete('/user/terrain-rent', value)
      .then((r) => {
        isLoading.value = false;
        return (rentTerrains.value = r.data.data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };

  return {
    terrain,
    rentTerrains,
    errors,
    terrains,
    isLoading,
    getTerrain,
    getTerrains,
    getLandlordTerrain,
    getLandlordTerrains,
    getTerrainBySearch,
    getLandlordTerrainsRentRequest,
    getUserTerrainsRentRequest,
    deleteUserTerrainsRentRequest,
    getLandlordRentTerrains,
  };
}
