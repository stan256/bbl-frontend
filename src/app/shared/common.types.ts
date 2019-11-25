export type Opaque<K, T> = T & {_type: K};

export type Tag = Opaque<'Tag', string>;
export const wrapTag = (tag: string): Tag => tag as Tag;


