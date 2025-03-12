export const invertKeys = <TKey extends string, TUppercaseKey extends string>(
  keys: Record<TKey, TUppercaseKey>
): Record<TUppercaseKey, TKey> =>
  Object.fromEntries(
    Object.entries(keys).map(([key, uppercaseKey]) => [uppercaseKey, key])
  );

export const keysFromObject = <TKeyObject extends object>(
  keyObject: TKeyObject
) => Object.keys(keyObject) as (keyof TKeyObject)[];
