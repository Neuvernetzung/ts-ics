import { schemaPackageNames } from "../src/schemas";

describe("Tests if all parsing functions are exported from schema package", () => {
  schemaPackageNames.forEach((name) => {
    it(name, async () => {
      const schemaPackage = await import(name);

      const requiredExports = [
        "parseIcsAlarm",
        "parseIcsAttachment",
        "parseIcsAttendee",
        "parseIcsCalendar",
        "parseIcsClassType",
        "parseIcsDate",
        "parseIcsDateTime",
        "parseIcsDuration",
        "parseIcsEvent",
        "parseIcsTodo",
        "parseIcsJournal",
        "parseIcsFreeBusy",
        "parseIcsExceptionDate",
        "parseIcsOrganizer",
        "parseIcsRecurrenceId",
        "parseIcsRecurrenceId",
        "parseIcsRecurrenceRule",
        "parseIcsEventStatus",
        "parseIcsTodoStatus",
        "parseIcsJournalStatus",
        "parseIcsTimeTransparent",
        "parseIcsTimezone",
        "parseIcsTimezoneProp",
        "parseIcsTrigger",
        "parseIcsWeekDay",
        "parseIcsWeekdayNumber",
      ];

      requiredExports.forEach((requiredExport) => {
        if (!schemaPackage[requiredExport])
          throw new Error(
            `The export "${requiredExport}" is missing from the schema package "${name}".`
          );
      });
    });
  });
});
