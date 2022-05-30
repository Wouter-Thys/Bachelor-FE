import { date } from 'yup';

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
  croppedUrl: string;
};

export type TTerrainRent = {
  startDate: Date;
  endDate: Date;
  ApprovedStatus: string;
  user: TUser;
  terrain: TTerrain;
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
  latitude: Number;
  longitude: Number;
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
  bakery_rating: number;
  firstAid_rating: number;
  google_supermarket_rating: number;
  google_activities_rating: number;
  google_remote_rating: number;
  google_bakery_rating: number;
  google_firstAid_rating: number;
  images: TImages[];
  owner: TUser;
  rented_dates: TTerrainRent[];
};
export type TEditTerrain = TTerrain & {
  newImages: TImages[];
  deleteImages: String[];
};

export type TApiResponse = {
  message: string | null;
  data: null | TUser | TUser[] | {};
};

export type TSubmitDate = {
  startDate: Number;
  endDate: Number;
  terrain_id: Number;
};

export type TCenterGMap = {
  lat: Number;
  lng: Number;
};

export type TMarkersGMap = [
  {
    position: {
      lat: Number;
      lng: Number;
    };
    terrain: TTerrain | null;
  }
];
export type extraSettingsSearch = {
  water: number;
  electricity: number;
  threePhaseElectricity: number;
  sanitaryBlock: number;
  showers: number;
  toilets: number;
  sinks: number;
  max_people: number;
  hectare: number;
  search: string;
};
