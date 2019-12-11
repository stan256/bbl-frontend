import {TravelMode} from '../shared/common.types';
import {Coordinates} from './Coordinates';

export interface Step {
  location: string;
  description?: string;
  date: Date;

  showRouteToNext: boolean;
  travelModeToNext: TravelMode;

  coordinates: Coordinates;
}
