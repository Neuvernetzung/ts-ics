export const getKeys = <TObject extends object>(object: TObject) =>
  Object.keys(object) as (keyof TObject)[];
