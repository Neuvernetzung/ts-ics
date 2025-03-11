import { type Attachment } from "./attachment";
import { type Attendee } from "./attendee";
import { type Duration } from "./duration";
import { type VEventTrigger } from "./trigger";

export type VAlarm = {
  action?: string;
  description?: string;
  trigger: VEventTrigger;
  attendees?: Attendee[];
  duration?: Duration;
  repeat?: number;
  summary?: string;
  attachments?: Attachment[];
};
