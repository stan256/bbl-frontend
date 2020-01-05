export type Opaque<K, T> = T & { _type: K };

export type Tag = Opaque<'Tag', string>;
export const wrapTag = (tag: string): Tag => tag as Tag;

export type Restriction = Opaque<'Restriction', string>;
export const wrapRestriction = (restriction: string): Restriction => restriction as Restriction;

export type TravelMode = "WALKING" | "DRIVING" | "BICYCLING";
