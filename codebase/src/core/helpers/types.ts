export type TUser = {
  id: number;
  name: string;
  email: string;
  organization: string;
  roles: string[];
  landlordRequestImage?: string;
};

export type IApiErrorResponse = {
  errors: Error[] | null;
  message: string | null;
};
