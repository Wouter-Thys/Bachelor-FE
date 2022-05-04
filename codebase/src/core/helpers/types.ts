export type TUser = {
  id: number;
  name: string;
  email: string;
  organization: string;
  roles: string[];
  landlordRequestImage?: string;
  phone_number?: string;
  phone_number_verified_at?: Date | null;
  email_verified_at?: Date | null;
};

export type TApiResponse = {
  status?: string;
  success?: boolean;
  message: string | null;
  data: null | TUser | TUser[] | {};
};
