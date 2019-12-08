export interface Step {
  location: string;
  description?: string;
  date: Date;

  // todo opaque for lat & lng
  lat?: number;
  lng?: number;
}
