import {TravelMode} from '../shared/common.types';

export interface StepForm {
  id: number;
  location: string;
  description?: string;
  date: Date;
  showRouteToNext: boolean;
  travelModeToNext: TravelMode;
  locationLat: number;
  locationLng: number;
}
