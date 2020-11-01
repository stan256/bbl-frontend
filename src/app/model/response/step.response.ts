import {TravelMode} from "../../shared/common.types";
import {ImageResponse} from "./image.response";

export interface StepResponse {
  id: number;
  location: string;
  description?: string;
  date: Date;
  showRouteToNext: boolean;
  travelModeToNext: TravelMode;
  locationLat: number;
  locationLng: number;
  images: Array<ImageResponse>;
}
