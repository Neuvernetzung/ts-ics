import {
	convertIcsTimeTransparent,
	type ParseTimeTransparent,
	timeTransparentTypes,
} from "ts-ics";
import * as z from "zod";

export const zIcsTimeTransparentType = z.enum(timeTransparentTypes);

export const parseIcsTimeTransparent: ParseTimeTransparent = (...props) =>
	convertIcsTimeTransparent(zIcsTimeTransparentType, ...props);
