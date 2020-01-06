import {TravelMode} from '../shared/common.types';
import {Coordinates} from './Coordinates';

export interface StepDTO {
  id: number;
  location: string;
  description?: string;
  date: Date;
  showRouteToNext: boolean;
  travelModeToNext: TravelMode;
  coordinates: Coordinates;
}
