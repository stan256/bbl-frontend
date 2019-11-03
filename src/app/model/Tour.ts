export class Tour {
  characters: Array<TourCharacter>;
  timing: TourTiming;
}

export enum TourCharacter {
  HIKING,
  CHILLING,
  OTHER
}

export enum TourPeriodicityMode {
  ONCE,
  REGULAR
}

export class TourTiming {
  periodicity: TourPeriodicityMode;
  tourTime: Array<Date>
}
