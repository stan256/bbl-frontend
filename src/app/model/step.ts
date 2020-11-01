import {TravelMode} from '../shared/common.types';
import {ImageSelection} from "./files";

export interface StepForm {
  location: string;
  description?: string;
  date: Date;
  showRouteToNext: boolean;
  travelModeToNext: TravelMode;
  locationLat: number;
  locationLng: number;
  images: Array<ImageSelection>;
}
