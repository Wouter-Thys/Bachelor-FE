import { ref } from 'vue';
import apiService from '@/core/services/ApiService';
import { TApiResponse, TUser } from '@/core/helpers/types';
import ApiService from '@/core/services/ApiService';

export default function useUsers() {
  const users = ref(<TUser[]>[]);
  const usersLandlordRequest = ref(<TUser[]>[]);
  const user = ref(<TUser>{});
  const userLandlordRequest = ref(<TUser>{});
  const errors = ref(<TApiResponse>{});
  const isLoading = ref(true);

  const getUserLandlordRequest = async (id) => {
    errors.value = { data: null, message: null };
    await apiService
      .get('/admin/pending-landlords', id)
      .then((r) => {
        return (userLandlordRequest.value = r.data.data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };
  const putUserLandlordRequest = async (id: string | number, bool: boolean) => {
    errors.value = { data: null, message: null };
    await apiService
      .update('/admin/pending-landlords', id, { data: bool })
      .catch((e) => {
        console.log(e.response);
      });
  };
  const getUsersLandlordRequest = async () => {
    errors.value = { data: null, message: null };
    await ApiService.get('/admin/pending-landlords')
      .then((r) => {
        isLoading.value = false;
        return (usersLandlordRequest.value = r.data.data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };

  const getUsers = async () => {
    errors.value = { data: null, message: null };
    await ApiService.get('/admin/users')
      .then((r) => {
        isLoading.value = false;
        return (users.value = r.data.data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };

  const getMe = async () => {
    errors.value = { data: null, message: null };
    await ApiService.get('/me')
      .then((r) => {
        isLoading.value = false;
        return (user.value = r.data.data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };

  return {
    isLoading,
    errors,
    user,
    users,
    usersLandlordRequest,
    userLandlordRequest,
    getUserLandlordRequest,
    getUsersLandlordRequest,
    putUserLandlordRequest,
    getUsers,
    getMe,
  };
}
