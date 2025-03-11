import {
  TimeTransparentTypeLineToObject,
  type TimeTransparentType,
} from "@/types";
import { standardValidate } from "./utils/standardValidate";

export const icsTimeTransparentStringToTimeTransparent: TimeTransparentTypeLineToObject =
  (line, schema) => standardValidate(schema, line.value as TimeTransparentType);
