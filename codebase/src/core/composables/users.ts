import { ref } from 'vue';
import apiService from '@/core/services/ApiService';
import { IApiErrorResponse, TUser } from '@/core/helpers/types';
import ApiService from '@/core/services/ApiService';

export default function useUsers() {
  const users = ref(<TUser[]>[]);
  const usersLandlordRequest = ref(<TUser[]>[]);
  const user = ref(<TUser>{});
  const userLandlordRequest = ref(<TUser>{});
  const errors = ref(<IApiErrorResponse>{});
  const isLoading = ref(true);

  const getUserLandlordRequest = async (id) => {
    errors.value = { errors: null, message: null };
    await apiService
      .get('/admin/user-pending-landlord', id)
      .then((r) => {
        return (userLandlordRequest.value = r.data.data);
      })
      .catch((e) => {
        errors.value.errors = e.response.data.errors;
        errors.value.message = e.response.data.message;
      });
  };
  const putUserLandlordRequest = async (id: string | number, bool: boolean) => {
    errors.value = { errors: null, message: null };
    await apiService
      .update('/admin/user-pending-landlord', id, { data: bool })
      .catch((e) => {
        errors.value.errors = e.response.data.errors;
        errors.value.message = e.response.data.message;
      });
  };
  const getUsersLandlordRequest = async () => {
    errors.value = { errors: null, message: null };
    await ApiService.get('/admin/users-pending-landlord')
      .then((r) => {
        isLoading.value = false;
        return (usersLandlordRequest.value = r.data.data);
      })
      .catch((e) => {
        errors.value.errors = e.response.data.errors;
        errors.value.message = e.response.data.message;
      });
  };

  const getUsers = async () => {
    await ApiService.get('/admin/users')
      .then((r) => {
        isLoading.value = false;
        return (users.value = r.data.data);
      })
      .catch((e) => {
        errors.value.errors = e.response.data.errors;
        errors.value.message = e.response.data.message;
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
  };
}
