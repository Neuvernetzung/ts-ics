import type {
  TimeTransparentTypeLineToObject,
  TimeTransparentType,
} from "@/types";
import { standardValidate } from "./utils/standardValidate";

export const icsTimeTransparentStringToTimeTransparent: TimeTransparentTypeLineToObject =
  (schema, line) => standardValidate(schema, line.value as TimeTransparentType);
