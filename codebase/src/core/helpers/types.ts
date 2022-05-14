import { array } from 'yup';

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

export type TImages = {
  id: string;
  url: string;
  thumbUrl: string;
  croppedUrl: string;
};
export type TTerrain = {
  id: number;
  name: string;
  description: string;
  street: string;
  streetNumber: string;
  postcode: string;
  province: string;
  locality: string;
  water: boolean;
  electricity: boolean;
  threePhaseElectricity: boolean;
  sanitaryBlock: boolean;
  showers: boolean;
  toilets: boolean;
  sinks: boolean;
  max_people: number;
  hectare: number;
  supermarket_rating: number;
  activities_rating: number;
  remote_rating: number;
  wood_rating: number;
  playground_rating: number;
  images: TImages[];
};

export type TApiResponse = {
  message: string | null;
  data: null | TUser | TUser[] | {};
};
