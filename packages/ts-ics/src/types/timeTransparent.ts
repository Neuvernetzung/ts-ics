import { z } from "zod";

export const timeTransparentTypes = ["TRANSPARENT", "OPAQUE"] as const;

export type TimeTransparentTypes = typeof timeTransparentTypes;
export type TimeTransparentType = TimeTransparentTypes[number];

export const zTimeTransparentType = z.enum(timeTransparentTypes);
