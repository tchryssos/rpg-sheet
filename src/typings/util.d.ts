// https://stackoverflow.com/a/49402091
export type KeysOfUnion<T> = T extends T ? keyof T : never;

export type ValuesOf<T extends Record<string, unknown>> = T[KeysOfUnion<T>];

// https://bobbyhadz.com/blog/typescript-array-element-type
export type ArrayElementType<ArrType> =
  ArrType extends readonly (infer ElementType)[] ? ElementType : never;

export type NonListFieldRecord<T extends Record<string, unknown>> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

export type ListFieldRecord<T extends Record<string, unknown>> = {
  [K in keyof T as T[K] extends unknown[] ? K : never]: T[K];
};

export type BooleanFieldsRecord<T extends Record<string, unknown>> = {
  [K in keyof T as T[K] extends boolean ? K : never]: T[K];
};

export type KeyOfListField<T extends Record<string, unknown>> = KeysOfUnion<
  ArrayElementType<ValuesOf<ListFieldRecord<T>>>
>;
