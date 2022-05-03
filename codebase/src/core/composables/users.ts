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
    await apiService.get('/admin/user-pending-landlord', id).then((r) => {
      return (userLandlordRequest.value = r.data.data);
    });
  };
  const putUserLandlordRequest = async (id: string | number, bool: boolean) => {
    await apiService
      .update('/admin/user-pending-landlord', id, { data: bool })
      .then((r) => {
        // return (userLandlordRequest.value = r.data.data);
        // console.log(r);
      });
  };
  const getUsersLandlordRequest = async () => {
    await ApiService.get('/admin/users-pending-landlord').then((r) => {
      isLoading.value = false;
      return (usersLandlordRequest.value = r.data.data);
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
  };
}
