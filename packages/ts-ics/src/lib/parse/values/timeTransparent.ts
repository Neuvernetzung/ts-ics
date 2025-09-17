import type { ConvertTimeTransparent, IcsTimeTransparentType } from "@/types";
import { standardValidate } from "../utils/standardValidate";

export const convertIcsTimeTransparent: ConvertTimeTransparent = (
  schema,
  line
) => standardValidate(schema, line.value as IcsTimeTransparentType);
