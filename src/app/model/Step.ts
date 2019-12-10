export interface Step {
  location: string;
  description?: string;
  date: Date;

  showRouteToNext: boolean;

  // todo opaque for lat & lng
  lat?: number;
  lng?: number;
}
