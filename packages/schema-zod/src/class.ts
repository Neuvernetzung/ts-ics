import { classTypes } from "ts-ics";
import { z } from "zod";

export const zClassType = z.enum(classTypes);
